import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Header, Segment, Button, FormField, Label } from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { createItem, updateItem } from "../../redux/actions/itemActions";
import CustomTextArea from "../helpers/CustomTextArea";
import CustomSelectInput from "../helpers/CustomSelectInput";

import { categories } from "../../utils/categoryOptions";
import AutocompleteInput from "../google/AutocompleteInput";

const RightForm = ({ match, history }) => {
  const selectedItem = useSelector((state) =>
    state.item.items.find((item) => item.id === match.params.id)
  );
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

  return (
    <Segment clearing>
      <Header>Add Yours!</Header>
      <Formik
        initialValues={initialFormState}
        validationSchema={FormSchema}
        onSubmit={(values) => {
          if (selectedItem) {
            dispatch(updateItem({ ...selectedItem, ...values }));
            history.push("/items");
            return;
          }

          dispatch(
            createItem({
              ...values,
              id: uuidv4(),
              owner: "Mike",
              members: [],
              ownerPhoto: "https://randomuser.me/api/portraits/women/11.jpg"
            })
          );

          history.push("/items");
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
    </Segment>
  );
};

export default RightForm;
