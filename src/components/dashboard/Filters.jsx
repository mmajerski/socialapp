import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Menu, Select, Segment } from "semantic-ui-react";

import { categories } from "../../utils/categoryOptions";
import { setCategoryRedux } from "../../redux/actions/categoryActions";

const Filters = () => {
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();

  return (
    <Segment textAlign="center">
      <h1>Filters</h1>
      <Menu vertical size="large" style={{ width: "100%" }}>
        <Menu.Item
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <h3>Category</h3>
          <Select
            placeholder="Select your country"
            options={categories}
            value={category}
            onChange={(e, data) => {
              setCategory(data.value);
              dispatch(setCategoryRedux(data.value));
            }}
          />
        </Menu.Item>
      </Menu>
    </Segment>
  );
};

export default Filters;
