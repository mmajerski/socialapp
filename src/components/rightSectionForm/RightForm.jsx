import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  Header,
  Segment,
  Button,
  FormField,
  Label,
  Confirm
} from "semantic-ui-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
  clearSelectedItem,
  createItem,
  getItems,
  selectedItemListener,
  updateItem
} from "../../redux/actions/itemActions";
import CustomTextArea from "../helpers/CustomTextArea";
import CustomSelectInput from "../helpers/CustomSelectInput";

import { categories } from "../../utils/categoryOptions";
import AutocompleteInput from "../google/AutocompleteInput";
import { useFirebaseDocument } from "../../utils/useFirebaseDocument";
import {
  addItemToFirebase,
  cancelItem,
  getItemListener,
  updateItemInFirebase
} from "../../firebase/firebaseService";
import Loading from "../../layout/Loading";
import { notification } from "../../utils/notification";
import { RETAIN_STATE_CLEAR } from "../../redux/types";

const RightForm = ({ match, history, location }) => {
  const [toggleActive, setToggleActive] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [active, setActive] = useState(false);

  const { selectedItem } = useSelector((state) => state.item);
  const { loading } = useSelector((state) => state.loader);
  const { message: errorMessage } = useSelector((state) => state.error);
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname !== "/createItem") {
      return;
    }

    // dispatch({ type: RETAIN_STATE_CLEAR });
    dispatch(clearSelectedItem());
  }, [dispatch, location.pathname]);

  const emptyValues = {
    title: "",
    description: "",
    city: { address: "", latLng: null },
    street: { address: "", latLng: null },
    category: "",
    imageURL: "",
    date: ""
  };

  const initialFormState =
    location.pathname === "/createItem"
      ? emptyValues
      : selectedItem || emptyValues;

  const FormSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    city: Yup.object().shape({
      address: Yup.string().required("City is required")
    }),
    street: Yup.object().shape({
      address: Yup.string().required("Street is required")
    }),
    category: Yup.string().required("Category is required"),
    imageURL: Yup.string(),
    date: Yup.string().required("Date is required")
  });

  const handleActiveState = async (item) => {
    setConfirmOpen(false);
    setToggleActive(true);

    try {
      await cancelItem(item);
      setToggleActive(false);
      notification(
        `Item changed to ${
          selectedItem.isCancelled ? "active" : "inactive"
        } state! Just leave to apply changes!`
      );
    } catch (error) {
      setToggleActive(true);
      notification(error.message, "error");
    }
  };

  useFirebaseDocument({
    firestoreQuery: () => getItemListener(match.params.id),
    onDataReceived: (item) => dispatch(selectedItemListener(item)),
    dependencies: [match.params.id],
    shouldExecute:
      match.params.id === selectedItem?.id &&
      location.pathname !== "/createItem"
  });

  if (loading) {
    return <Loading />;
  }

  if (!currentUser) {
    return <Loading content="You are signed out!" />;
  }

  if (match.params.id && currentUser.uid !== selectedItem?.ownerUid) {
    return <Loading content="forbidden" />;
  }

  if (errorMessage) {
    return <Redirect to="/error" />;
  }

  return (
    <Segment clearing>
      <Header>Add Yours!</Header>
      <Formik
        initialValues={initialFormState}
        validationSchema={FormSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            if (selectedItem) {
              await updateItemInFirebase({
                ...values,
                isCancelled: selectedItem.isCancelled
              });
              dispatch(updateItem(values));
              setSubmitting(false);
              notification("Updated successfully!");
              // history.push("/items");
              resetForm();
              return;
            }

            await addItemToFirebase(values);
            setSubmitting(false);
            notification("Created successfully!");
            // history.push("/items");
            resetForm();
          } catch (error) {
            notification(error.message, "error");
            setSubmitting(false);
          }
        }}
      >
        {({ isValid, dirty, isSubmitting, values, resetForm }) => {
          return (
            <Form className="ui form">
              <FormField>
                <Field name="title" placeholder="Title" />
                <ErrorMessage
                  name="title"
                  render={(error) => (
                    <Label basic color="red">
                      {error}
                    </Label>
                  )}
                />
              </FormField>
              <CustomTextArea placeholder="Description" name="description" />
              <AutocompleteInput placeholder="City" name="city" />
              <AutocompleteInput placeholder="Street" name="street" />
              <CustomSelectInput
                placeholder="Category"
                name="category"
                options={categories}
              />
              <FormField>
                <Field placeholder="Image URL" name="imageURL" />
                <ErrorMessage
                  name="imageURL"
                  render={(error) => (
                    <Label basic color="red">
                      {error}
                    </Label>
                  )}
                />
              </FormField>
              <FormField>
                <Field placeholder="Date" name="date" type="date" />
                <ErrorMessage
                  name="date"
                  render={(error) => (
                    <Label basic color="red">
                      {error}
                    </Label>
                  )}
                />
              </FormField>
              <Button
                type="submit"
                floated="right"
                as={Link}
                to="/items"
                disabled={isSubmitting}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                floated="left"
                color="blue"
                disabled={!isValid || !dirty || isSubmitting}
                loading={isSubmitting}
              >
                Send
              </Button>
            </Form>
          );
        }}
      </Formik>
      {selectedItem && (
        <Button
          loading={toggleActive}
          type="button"
          floated="right"
          color={selectedItem.isCancelled ? "green" : "red"}
          onClick={() => setConfirmOpen(true)}
        >
          {selectedItem.isCancelled ? "Reactivate" : "Deactivate"}
        </Button>
      )}
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => handleActiveState(selectedItem)}
      />
    </Segment>
  );
};

export default RightForm;
