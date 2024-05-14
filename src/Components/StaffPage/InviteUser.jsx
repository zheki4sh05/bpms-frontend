import { AppBar, Box, Dialog, IconButton, Slide, Toolbar, Typography } from "@mui/material";

import { forwardRef, useContext } from "react";
import DialogContext from "../DialogContext";
import CloseIcon from '@mui/icons-material/Close';
import InviteControl from "./InviteControl";
import { useDispatch } from "react-redux";
import { resetInviteStatus, resetSearchStatus } from "../../Store/slices/companySlice";
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
function InviteUser() {

    const { openDialog, closeDialogHandler } = useContext(DialogContext);
    const dispatch = useDispatch();
    const handleClose = () => {
      dispatch(resetSearchStatus());
      dispatch(resetInviteStatus())
      closeDialogHandler();
    };

    return ( 

        <Dialog
        fullScreen
        open={openDialog}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
      
      <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Box>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                    Приглашение нового сотрудника
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
        <Box>
            <InviteControl/>
        </Box>
      </Dialog>
     );
}

export default InviteUser;