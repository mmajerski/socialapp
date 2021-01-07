import React from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { FormField, Label, Segment, Button } from "semantic-ui-react";
import * as Yup from "yup";

import CustomTextArea from "../helpers/CustomTextArea";
import { updateUserProfile } from "../../firebase/firebaseService";
import { notification } from "../../utils/notification";

const ProfileForm = ({ profile }) => {
  return (
    <Formik
      initialValues={{
        displayName: profile.displayName,
        description: profile.description || ""
      }}
      validationSchema={Yup.object({
        displayName: Yup.string().required("Required field"),
        description: Yup.string().required("Required field")
      })}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          await updateUserProfile(values);
          notification("Profile updated successfully!");
          setSubmitting(false);
        } catch (error) {
          notification(error.message, "error");
          setSubmitting(false);
        }
      }}
    >
      {({ errors, isSubmitting, isValid, dirty }) => {
        return (
          <Form className="ui form">
            <FormField>
              <Field name="displayName" placeholder="Display Name" />
              <ErrorMessage
                name="displayName"
                render={(error) => (
                  <Label basic color="red">
                    {error}
                  </Label>
                )}
              />
            </FormField>
            <CustomTextArea name="description" placeholder="Description" />
            {errors.error ? (
              <Segment textAlign="center" inverted>
                <Label basic color="red">
                  {errors.error}
                </Label>
              </Segment>
            ) : null}
            <Button
              disabled={!isValid || !dirty || isSubmitting}
              loading={isSubmitting}
              type="submit"
              size="large"
            >
              Send
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ProfileForm;
