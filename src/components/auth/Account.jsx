import React from "react";
import {
  FormField,
  Header,
  Segment,
  Label,
  Button,
  Divider
} from "semantic-ui-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import Loading from "../../layout/Loading";
import { updatePassword } from "../../firebase/authService";
import { notification } from "../../utils/notification";

const Account = () => {
  const { currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Loading />;
  }
  return (
    <Segment>
      <h1 style={{ textAlign: "center" }}>Account</h1>
      <Divider />
      {currentUser.providerId === "password" && (
        <>
          <Header content="Change password" />
          <p>Here you can change your password</p>
          <div>
            <Formik
              initialValues={{ password: "", confirmPassword: "" }}
              validationSchema={Yup.object({
                password: Yup.string().required("Password is required"),
                confirmPassword: Yup.string().oneOf(
                  [Yup.ref("password"), null],
                  "Passwords do not match"
                )
              })}
              onSubmit={async (values, { setSubmitting, setErrors }) => {
                try {
                  await updatePassword(values);
                  setSubmitting(false);
                  notification("Password updated successfully!");
                } catch (error) {
                  setErrors({ error: error.message });
                  setSubmitting(false);
                  notification(error.message, "error");
                }
              }}
            >
              {({ errors, isSubmitting, isValid, dirty }) => {
                return (
                  <Form className="ui form">
                    <FormField>
                      <Field
                        type="password"
                        name="password"
                        placeholder="Password"
                      />
                      <ErrorMessage
                        name="password"
                        render={(error) => (
                          <Label basic color="red">
                            {error}
                          </Label>
                        )}
                      />
                    </FormField>
                    <FormField>
                      <Field
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                      />
                      <ErrorMessage
                        name="confirmPassword"
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
                      size="large"
                    >
                      Send
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </>
      )}

      {currentUser.providerId === "google.com" && (
        <>
          <h1>Your account was created with Google.</h1>
          <p>Please visit Google to update your password.</p>
          <Button
            icon="google"
            color="google plus"
            as="a"
            href="https://google.com"
            target="_blank"
            content="Google"
          />
        </>
      )}

      {currentUser.providerId === "facebook.com" && (
        <>
          <h1>Your account was created with Facebook.</h1>
          <p>Please visit Facebook to update your password.</p>
          <Button
            icon="facebook"
            color="facebook"
            as="a"
            href="https://facebook.com"
            target="_blank"
            content="Facebook"
          />
        </>
      )}
    </Segment>
  );
};

export default Account;
