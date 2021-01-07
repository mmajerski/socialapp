import { combineReducers } from "redux";

import testReducer from "./testReducer";
import itemReducer from "./itemReducer";
import modalReducer from "./modalReducer";
import authReducer from "./authReducer";
import categoryReducer from "./categoryReducer";
import errorReducer from "./errorReducer";
import loaderReducer from "./loaderReducer";
import initAppReducer from "./initAppReducer";

const rootReducer = combineReducers({
  test: testReducer,
  item: itemReducer,
  modal: modalReducer,
  auth: authReducer,
  category: categoryReducer,
  error: errorReducer,
  loader: loaderReducer,
  initApp: initAppReducer
});

export default rootReducer;
