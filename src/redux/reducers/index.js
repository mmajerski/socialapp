import { combineReducers } from "redux";

import testReducer from "./testReducer";
import itemReducer from "./itemReducer";

const rootReducer = combineReducers({
  test: testReducer,
  item: itemReducer
});

export default rootReducer;
