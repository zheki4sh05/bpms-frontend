import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { DialogContentText } from '@mui/material';

function DialogConfirmation({title="", body="", handleCloseDialog, open}) {
  
    const handleClose = () => {
      handleCloseDialog("del")
    };
    const handleReset = () => {
      handleCloseDialog("reset")
    };

    return ( 

  
      <Dialog
        open={open}
   
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           {body}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReset}>Отмена</Button>
          <Button onClick={handleClose} color="error">
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
  

     );
}

export default DialogConfirmation;