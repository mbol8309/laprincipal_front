import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import React from "react";
import { Button } from "react-admin";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UIDialog = ({
  open,
  title = "",
  primaryButton = null,
  onPrimaryClick,
  secondaryButton = "Close",
  onSecondaryClick,
  onClose,
  children,
}) => {
  const handlePrimaryClick = () => {
    onPrimaryClick && onPrimaryClick();
  };

  const handleSecondaryClick = () => {
    onSecondaryClick ? onSecondaryClick() : handleClose();
  };

  const handleClose = () => {
    onClose && onClose()
  }

  return (
    <Dialog open={open} TransitionComponent={Transition} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {primaryButton && (
          <Button onClick={handlePrimaryClick}>{primaryButton}</Button>
        )}
        {secondaryButton && (
          <Button onClick={handleSecondaryClick}>{secondaryButton}</Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default UIDialog;
