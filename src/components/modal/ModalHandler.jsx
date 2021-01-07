import React from "react";
import { useSelector } from "react-redux";

import LoginForm from "../../components/auth/LoginForm";
import SignUpForm from "../../components/auth/SignUpForm";

const ModalHandler = () => {
  const modalsAvailable = {
    LoginForm,
    SignUpForm
  };
  const currentModal = useSelector((state) => state.modal);
  let modalToRender;
  if (currentModal) {
    const { modalType, otherProps } = currentModal;
    const ModalComponent = modalsAvailable[modalType];
    modalToRender = <ModalComponent {...otherProps} />;
  }

  return <>{modalToRender}</>;
};

export default ModalHandler;
