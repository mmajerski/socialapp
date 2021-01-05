import React from "react";
import { useDispatch } from "react-redux";
import { Modal } from "semantic-ui-react";

import { closeModal } from "../../redux/actions/modalActions";

const ModalContainer = ({ header, size, children }) => {
  const dispatch = useDispatch();

  return (
    <Modal
      dimmer="blurring"
      open={true}
      onClose={() => dispatch(closeModal())}
      size={size}
    >
      {header && <Modal.Header>{header}</Modal.Header>}
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
};

export default ModalContainer;
