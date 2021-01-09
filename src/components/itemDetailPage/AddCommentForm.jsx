import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { notification } from "../../utils/notification";
import { addComment } from "../../firebase/firebaseService";
import CustomTextArea from "../helpers/CustomTextArea";
import { Button, Loader } from "semantic-ui-react";

const AddCommentForm = ({ itemId, parentId, closeForm }) => {
  return (
    <Formik
      initialValues={{ comment: "" }}
      validationSchema={Yup.object().shape({
        comment: Yup.string().required("Required")
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await addComment(itemId, { ...values, parentId });
          if (closeForm) {
            closeForm();
          }
          resetForm();
          setSubmitting(false);
          notification("Comment added successfully!");
        } catch (error) {
          setSubmitting(false);
          notification(error.message, "error");
        }
      }}
    >
      {({ isSubmitting, handleSubmit, isValid }) => {
        return (
          <Form className="ui form">
            <Field name="comment">
              {({ field }) => {
                return (
                  <div style={{ position: "relative" }}>
                    <Loader active={isSubmitting} />
                    <textarea
                      rows="2"
                      {...field}
                      placeholder="Enter your comment"
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && e.shiftKey) {
                          return;
                        }

                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          isValid && handleSubmit();
                        }
                      }}
                    ></textarea>
                    <Button
                      content="Add Comment"
                      labelPosition="left"
                      icon="edit"
                      primary
                      type="button"
                      onClick={() => {
                        isValid && handleSubmit();
                      }}
                    />
                  </div>
                );
              }}
            </Field>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddCommentForm;
