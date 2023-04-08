import { Modal } from "@mui/material";

const SetTopAuthorAction = ({ open, onClose, ...other }) => {
  return (
    <Modal open={open} onClose={onClose}>
      some text aroud here
    </Modal>
  );
};

export default SetTopAuthorAction