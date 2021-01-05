import { combineReducers } from "redux";

import testReducer from "./testReducer";
import itemReducer from "./itemReducer";
import modalReducer from "./modalReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  test: testReducer,
  item: itemReducer,
  modal: modalReducer,
  auth: authReducer
});

export default rootReducer;
