
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

export default function AlertDialog({title,content, openResult,handleCloseAlert}) {
 

  const handleClose = () => {
    handleCloseAlert()
  };

  return (

          <Dialog
        open={openResult}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
            {content}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
  
  );
}