import React from "react";
import { useField } from "formik";
import { FormField, Label } from "semantic-ui-react";

const CustomTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormField>
      <label>
        {label}
        <textarea {...field} {...props}></textarea>
      </label>
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </FormField>
  );
};

export default CustomTextArea;
