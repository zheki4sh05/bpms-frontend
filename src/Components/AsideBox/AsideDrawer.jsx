import { useContext } from "react";
import DialogContext from "../DialogContext";
import { useState } from "react";
import { Drawer, Stack,Box } from "@mui/material";

import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function AsideDrawer({anchorProp,content}) {
  

  const {openDialogHandler, closeDialogHandler, openDialog} = useContext(DialogContext)

    const [state, setState] = useState(openDialog);
    
      // // const toggleDrawer = () => (event) => {
      // //   if (
      // //     event.type === "keydown" &&
      // //     (event.key === "Tab" || event.key === "Shift")
      // //   ) {
      // //     return;
      // //   }
      // //   setState((prevState) => (prevState === false ? true : false));
   

      // //   if(state){
      // //     openDialogHandler();
      // //   }else{
      // //     closeDialogHandler();
      // //   }

       
      // };
      const onCloseByKey= () => (event) => {
          if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
          ) {
            return;
          }
         
     
          closeDialogHandler();
        
  
         
        };
    
      const list = (anchor) => (
        <Box
          sx={{ width: "90vw" }}
          role="presentation"
         
          onKeyDown={onCloseByKey}
        >
          <Stack direction="row">
            <IconButton onClick={closeDialogHandler}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Box>
           {content}
          </Box>
        </Box>
      );

    return ( 

        <Drawer
        anchor={anchorProp}
        open={openDialog}
        onClose={closeDialogHandler}
      >
        {list(anchorProp)}
      </Drawer>
     );
}

export default AsideDrawer;