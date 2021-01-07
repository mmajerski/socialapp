import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormField, Label, Button, Segment, Divider } from "semantic-ui-react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import ModalContainer from "../modal/ModalContainer";
import { closeModal } from "../../redux/actions/modalActions";
import { signUpUser } from "../../firebase/authService";
import { notification } from "../../utils/notification";
import CustomLogin from "../helpers/CustomLogin";

const SignUpForm = () => {
  const dispatch = useDispatch();

  return (
    <ModalContainer size="mini" header="Sign up">
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          setSubmitting(true);
          try {
            await signUpUser(values);
            setSubmitting(false);
            dispatch(closeModal());
            notification("Sign up successfully!");
          } catch (error) {
            setSubmitting(false);
            setErrors({ error: error.message });
          }
        }}
        validationSchema={Yup.object({
          username: Yup.string().required(),
          email: Yup.string().required().email(),
          password: Yup.string().required()
        })}
      >
        {({ isValid, dirty, isSubmitting, errors }) => {
          return (
            <Form className="ui form">
              <FormField>
                <Field name="username" placeholder="Username" />
                <ErrorMessage
                  name="username"
                  render={(error) => (
                    <Label basic color="red">
                      {error}
                    </Label>
                  )}
                />
              </FormField>
              <FormField>
                <Field name="email" placeholder="Email" />
                <ErrorMessage
                  name="email"
                  render={(error) => (
                    <Label basic color="red">
                      {error}
                    </Label>
                  )}
                />
              </FormField>
              <FormField>
                <Field name="password" placeholder="Password" type="password" />
                <ErrorMessage
                  name="password"
                  render={(error) => (
                    <Label basic color="red">
                      {error}
                    </Label>
                  )}
                />
              </FormField>
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
                fluid
                size="large"
              >
                Sign Up
              </Button>
              <Divider horizontal>Or</Divider>
              <CustomLogin />
            </Form>
          );
        }}
      </Formik>
    </ModalContainer>
  );
};

export default SignUpForm;
