import { Modal } from "@mui/material";

const SimplePopupAction = ({ open, onClose, ...other }) => {
  return (
    <Modal open={open} onClose={onClose}>
      some text aroud here
    </Modal>
  );
};

export default SimplePopupAction