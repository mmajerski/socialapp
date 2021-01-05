import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Header, Segment, Form, Button } from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";
import { createItem, updateItem } from "../../redux/actions/itemActions";

const RightForm = ({ match, history }) => {
  const selectedItem = useSelector((state) =>
    state.item.items.find((item) => item.id === match.params.id)
  );
  const dispatch = useDispatch();

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
      dispatch(updateItem({ ...selectedItem, ...form }));
      history.push("/items");
      return;
    }

    dispatch(
      createItem({
        ...form,
        id: uuidv4(),
        owner: "Mike",
        members: [],
        ownerPhoto: "https://randomuser.me/api/portraits/women/11.jpg"
      })
    );

    setForm({
      title: "",
      description: "",
      city: "",
      street: "",
      category: "",
      date: ""
    });

    history.push("/items");
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
        <Button type="submit" floated="right" as={Link} to="/items">
          Cancel
        </Button>
        <Button type="submit" floated="left" color="blue">
          Send
        </Button>
      </Form>
    </Segment>
  );
};

export default RightForm;
