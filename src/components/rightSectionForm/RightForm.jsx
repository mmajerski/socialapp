import React from "react";
import { Header, Segment, Form, Button } from "semantic-ui-react";

const RightForm = ({ setFormState }) => {
  return (
    <Segment clearing>
      <Header>Add Yours!</Header>
      <Form>
        <Form.Field>
          <input type="text" placeholder="Title" />
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder="Description" />
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder="City" />
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder="Street" />
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder="Category" />
        </Form.Field>
        <Form.Field>
          <input type="date" placeholder="Date" />
        </Form.Field>
        <Button
          type="submit"
          floated="right"
          content="Cancel"
          onClick={() => setFormState(false)}
        />
        <Button type="submit" floated="right" content="Submit" color="blue" />
      </Form>
    </Segment>
  );
};

export default RightForm;
