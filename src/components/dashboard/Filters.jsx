import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Menu, Select, Segment } from "semantic-ui-react";

import { categories } from "../../utils/categoryOptions";
import { setCategoryRedux } from "../../redux/actions/categoryActions";

const newCategories = [
  {
    key: "reset",
    value: "",
    text: "Reset"
  },
  ...JSON.parse(JSON.stringify(categories))
];

const Filters = ({ setCategory, category }) => {
  return (
    <>
      <Segment textAlign="center">
        <h1>Filters</h1>
      </Segment>
      <Menu vertical size="large">
        <Menu.Item>
          <h3>Category</h3>
          <Select
            placeholder="Select category"
            options={newCategories}
            value={category}
            onChange={(e, data) => {
              setCategory(data.value);
            }}
          />
        </Menu.Item>
      </Menu>
    </>
  );
};

export default Filters;
