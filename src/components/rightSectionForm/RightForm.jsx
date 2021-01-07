import React, { useState } from "react";
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

import { getItems } from "../../redux/actions/itemActions";
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

const RightForm = ({ match, history }) => {
  const [toggleActive, setToggleActive] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const selectedItem = useSelector((state) =>
    state.item.items.find((item) => item.id === match.params.id)
  );
  const { loading } = useSelector((state) => state.loader);
  const { message: errorMessage } = useSelector((state) => state.error);
  const dispatch = useDispatch();

  const initialFormState = selectedItem || {
    title: "",
    description: "",
    city: { address: "", latLng: null },
    street: { address: "", latLng: null },
    category: "",
    date: ""
  };

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
        } state!`
      );
    } catch (error) {
      setToggleActive(true);
      notification(error.message, "error");
    }
  };

  useFirebaseDocument({
    firestoreQuery: () => getItemListener(match.params.id),
    onDataReceived: (item) => dispatch(getItems([item])),
    dependencies: [match.params.id],
    shouldExecute: !!match.params.id
  });

  if (loading) {
    return <Loading />;
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
        onSubmit={async (values, { setSubmitting }) => {
          try {
            if (selectedItem) {
              await updateItemInFirebase(values);
              setSubmitting(false);
              notification("Updated successfully!");
              history.push("/items");
              return;
            }

            await addItemToFirebase(values);
            setSubmitting(false);
            notification("Created successfully!");
            history.push("/items");
          } catch (error) {
            notification(error.message, "error");
            setSubmitting(false);
          }
        }}
      >
        {({ isValid, dirty, isSubmitting, values }) => {
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
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => handleActiveState(selectedItem)}
      />
    </Segment>
  );
};

export default RightForm;
