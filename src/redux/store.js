import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";
import logger from "redux-logger";

import rootReducer from "./reducers";
import { checkAuth } from "./actions/authActions";

const middleware = [ReduxThunk, logger];

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(...middleware)
    // other store enhancers if any
  )
);

store.dispatch(checkAuth());

export default store;
