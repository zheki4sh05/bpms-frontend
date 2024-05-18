import { Button, Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { DialogActions } from '@mui/material';

function DialogAcception({title="", body="", open, handleCloseDialog}) {


    const handleClose = () => {
        handleCloseDialog("accept")
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
            <Button onClick={handleClose} color="success">
              Принять
            </Button>
          </DialogActions>
        </Dialog>
    
  
       );
}

export default DialogAcception;