import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { increment } from "../../redux/actions/testAction";

const Playground = () => {
  const count = useSelector((state) => state.test.count);
  const dispatch = useDispatch();

  return (
    <>
      <h1>Test</h1>
      <p>{count}</p>
      <button onClick={() => dispatch(increment())}>CLICK</button>
    </>
  );
};

export default Playground;
