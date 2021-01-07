import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";
import { loginWithProvider } from "../../firebase/authService";

import { closeModal } from "../../redux/actions/modalActions";

const CustomLogin = () => {
  const dispatch = useDispatch();

  const handleLoginWithProvider = (provider) => {
    dispatch(closeModal());
    loginWithProvider(provider);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <Button
        icon="facebook"
        color="facebook"
        onClick={() => handleLoginWithProvider("facebook")}
        content="Facebook"
      />
      <Button
        icon="google"
        color="google plus"
        onClick={() => handleLoginWithProvider("google")}
        content="Google"
      />
    </div>
  );
};

export default CustomLogin;
