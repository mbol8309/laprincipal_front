import React from 'react';
import { styled } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: '#fff',
}));

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  position: 'absolute',
  color: '#FFF',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}));

function CustomBackdrop(props) {
  const { open } = props;

  return (
    <StyledBackdrop open={true}>
      <StyledCircularProgress />
    </StyledBackdrop>
  );
}

export default CustomBackdrop;
