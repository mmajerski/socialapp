import { combineReducers } from "redux";

import testReducer from "./testReducer";
import itemReducer from "./itemReducer";
import modalReducer from "./modalReducer";
import authReducer from "./authReducer";
import categoryReducer from "./categoryReducer";

const rootReducer = combineReducers({
  test: testReducer,
  item: itemReducer,
  modal: modalReducer,
  auth: authReducer,
  category: categoryReducer
});

export default rootReducer;
