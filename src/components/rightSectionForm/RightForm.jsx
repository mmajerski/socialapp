import React, { useState } from "react";
import { Header, Segment, Form, Button } from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";

const RightForm = ({
  setFormState,
  addItem,
  selectedItem,
  clearForm,
  updateItem
}) => {
  const initialFormState = selectedItem || {
    title: "",
    description: "",
    city: "",
    street: "",
    category: "",
    date: ""
  };

  const [form, setForm] = useState(initialFormState);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedItem) {
      updateItem({ ...selectedItem, ...form });
      return;
    }

    addItem({
      ...form,
      id: uuidv4(),
      owner: "Mike",
      members: [],
      ownerPhoto: "https://randomuser.me/api/portraits/women/11.jpg"
    });
    setForm({
      title: "",
      description: "",
      city: "",
      street: "",
      category: "",
      date: ""
    });
  };

  return (
    <Segment clearing>
      <Header>Add Yours!</Header>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder="City"
            name="city"
            value={form.city}
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder="Street"
            name="street"
            value={form.street}
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder="Category"
            name="category"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
          />
        </Form.Field>
        <Form.Field>
          <input
            type="date"
            placeholder="Date"
            name="date"
            value={form.date}
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
          />
        </Form.Field>
        <Button
          type="submit"
          floated="right"
          onClick={() => {
            setFormState(false);
            clearForm();
          }}
        >
          Cancel
        </Button>
        <Button type="submit" floated="left" color="blue">
          Add
        </Button>
      </Form>
    </Segment>
  );
};

export default RightForm;
