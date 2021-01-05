import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormField, Label, Button } from "semantic-ui-react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import ModalContainer from "../modal/ModalContainer";
import { signIn } from "../../redux/actions/authActions";
import { closeModal } from "../../redux/actions/modalActions";

const LoginFrom = () => {
  const dispatch = useDispatch();

  return (
    <ModalContainer size="mini" header="Sign in">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(signIn(values));
          setSubmitting(false);
          dispatch(closeModal());
        }}
        validationSchema={Yup.object({
          email: Yup.string().required().email(),
          password: Yup.string().required()
        })}
      >
        {({ isValid, dirty, isSubmitting }) => {
          return (
            <Form className="ui form">
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
              <Button
                disabled={!isValid || !dirty || isSubmitting}
                loading={isSubmitting}
                type="submit"
                fluid
                size="large"
              >
                Login
              </Button>
            </Form>
          );
        }}
      </Formik>
    </ModalContainer>
  );
};

export default LoginFrom;
