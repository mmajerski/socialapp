import React from "react";
import { useField } from "formik";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { FormField, List, Segment, Label } from "semantic-ui-react";

const AutocompleteInput = ({ options, label, ...props }) => {
  const [field, meta, helpers] = useField(props);

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => helpers.setValue({ address, latLng }))
      .catch((error) => helpers.setError(error));
  };

  const handleBlur = (e) => {
    field.onBlur(e);
    if (!field.value.latLng) {
      helpers.setValue({ address: "", latLng: null });
    }
  };

  return (
    <PlacesAutocomplete
      value={field.value.address}
      onChange={(value) => helpers.setValue({ address: value })}
      onSelect={(value) => handleSelect(value)}
      searchOptions={options}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <FormField>
          <label>
            <input
              {...getInputProps({
                name: field.name,
                onBlur: (e) => handleBlur(e),
                ...props
              })}
            />
          </label>
          {meta.touched && meta.error ? (
            <Label basic color="red">
              {meta.error.address}
            </Label>
          ) : null}
          {suggestions && suggestions.length > 0 && (
            <Segment loading={loading}>
              <List selection>
                {suggestions.map((sug) => {
                  return (
                    <List.Item {...getSuggestionItemProps(sug)} key={sug.index}>
                      <List.Header>
                        {sug.formattedSuggestion.mainText}
                      </List.Header>
                      <List.Description>{sug.description}</List.Description>
                    </List.Item>
                  );
                })}
              </List>
            </Segment>
          )}
        </FormField>
      )}
    </PlacesAutocomplete>
  );
};

export default AutocompleteInput;
