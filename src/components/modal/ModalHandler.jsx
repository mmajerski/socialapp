import React from "react";
import { useSelector } from "react-redux";

import LoginForm from "../../components/auth/LoginForm";

const ModalHandler = () => {
  const modalsAvailable = {
    LoginForm
  };
  const currentModal = useSelector((state) => state.modal);
  let modalToRender;
  if (currentModal) {
    const { modalType, otherProps } = currentModal;
    const ModalComponent = modalsAvailable[modalType];
    modalToRender = <ModalComponent {...otherProps} />;
  }

  return <span>{modalToRender}</span>;
};

export default ModalHandler;
