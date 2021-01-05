import React from "react";
import { useField } from "formik";
import { FormField, Label, Select } from "semantic-ui-react";

const CustomSelectInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);

  return (
    <FormField>
      <label>
        {label}
        <Select
          clearable
          value={field.value || null}
          onChange={(e, data) => helpers.setValue(data.value)}
          onBlur={() => helpers.setTouched(true)}
          {...props}
        />
      </label>
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </FormField>
  );
};

export default CustomSelectInput;
