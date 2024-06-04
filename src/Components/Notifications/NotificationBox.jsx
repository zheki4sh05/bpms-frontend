import {Box, Button,Grid, Paper, Typography } from "@mui/material";
import NotifChip from "./NotifChip";
import { useState } from "react";

import { acceptInvitation, fetchNotification, rejInvitation } from "../../Store/slices/notificationSlice";
import DialogConfirmation from "./DialogConfirmation";
import { useDispatch } from "react-redux";
import DialogAcception from "./DialogAcception";
import { useSelector } from "react-redux";
import { getEmail, getToken } from "../../Store/slices/appUserSlice";

function NotificationBox({ notifData ,requestHandler}) {

  const [open, setOpen] = useState(false);

  const email = useSelector(getEmail)

  const [openAcception, setAcceptionOpen] = useState(false);

  const dispatch = useDispatch();

  const token = useSelector(getToken)

  const handleClose = (type) => {

    switch(type){
      case 'del':{
        dispatch(rejInvitation({data:{id:notifData.id},token}))
        requestHandler(email,token,"invitation")
        setOpen(false)
        break;
      }
      case 'accept':{

        
      dispatch(acceptInvitation(
  
        {
          data:{
            id:notifData.id,
            email:email
          },
          token
        }
      ));
      requestHandler(email,token,"invitation")
        setAcceptionOpen(false)
        break;
      }
      case 'reset':{
        setAcceptionOpen(false)
        setOpen(false)
        break;
      }
    }

  };
  const handleOpen = () => {
    
    setOpen(true);
  };

  const handleOpenAcception = () =>{
    setAcceptionOpen(true)
  }

  function getChip(type) {
    let color;
    let bgColor;
    let text;

    switch (type) {
      case "invite": {
        (bgColor = "#01972e"), (color = "white"), (text = "Приглашение");
        break;
      }
    }
    return <NotifChip bgColor={bgColor} text={text} color={color} />;
  }

  return (
    <>
      <Paper elevation={2}>
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "center",
            margin: "0 auto",
            height: "auto",
            mt:2
          }}
        >
          <Grid container spacing={0}>
            <Grid xs={8}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box>{getChip(notifData.type)}</Box>
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2" gutterBottom>
                    {notifData.message}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid xs={4}>
              <Box
                sx={{
                  display: "flex",
                  height: "100%",
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                <Typography variant="body2" gutterBottom>
                  {notifData.date}
                </Typography>
              </Box>
            </Grid>
            <Grid xs={6}>
              <Box
                sx={{ display: "flex", justifyContent: "flex-start", mt: 2 }}
              >
                <Button size="small" variant="outlined" onClick={handleOpenAcception}>
                  Принять
                </Button>
              </Box>
            </Grid>
            <Grid xs={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 2,
                }}
              >
                <Button size="small" variant="outlined" color="error"  onClick={handleOpen}>
                  Отклонить
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      
      {/* <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}
      <DialogConfirmation
        title="Вы уверены, что хотите отклонить уведомление?"
        body="Оно будет удалено навсегда"
        open={open}
        handleCloseDialog={handleClose}
      />
      <DialogAcception

        title="Вы уверены, что хотите принять уведомление?"
       
        handleCloseDialog={handleClose}
        open={openAcception}

      />
    </>
  );
}

export default NotificationBox;
