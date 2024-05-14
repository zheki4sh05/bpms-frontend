import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({user, handleSubmitDialog,openDialog,handleCloseDialog}) {

  const handleClose = () => {
    handleCloseDialog();
  };

  return (
 
      <Dialog
        open={openDialog}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const message = formJson.message;
            handleSubmitDialog(user.email, message);
            handleCloseDialog()
            
          },
        }}
      >
        <DialogTitle>Приглашение нового пользователя</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Введите текст пригласительного письма для пользователя {user.email}:
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="message"
            name="message"
            label="Письмо"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Закрыть</Button>
          <Button type="submit" >Отправить</Button>
        </DialogActions>
      </Dialog>

  );
}