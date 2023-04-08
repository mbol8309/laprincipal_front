import { Dialog, DialogContent, DialogTitle, Modal, Typography } from "@mui/material";
import { useRecordContext, useResourceContext } from "react-admin";

const BannAuthorAction = ({ open, onClose,record, ...other }) => {
  const resource = useResourceContext();
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Some fucking action, this is for testing capabilities</DialogTitle>
      <DialogContent>
        <Typography>You are on resource '{resource}'</Typography>
        <Typography>{JSON.stringify(record)}</Typography>
      </DialogContent>
    </Dialog>
  );
};

export default BannAuthorAction