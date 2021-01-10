import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import Loading from "./Loading";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authenticated } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Loading content="forbidden" {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
