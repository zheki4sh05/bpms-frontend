import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import HelpIcon from "@mui/icons-material/Help";
import {
  Box,
  Divider,
  Drawer,
  IconButton,

  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import NotificationViewer from "./NotificationViewer";
import { useSelector } from "react-redux";
import { fetchNotification, getNotifCount, getNotificationStatus } from "../../Store/slices/notificationSlice";
import { getEmail, getToken, getUserDataStatus } from "../../Store/slices/appUserSlice";
import { useDispatch } from "react-redux";
import statusTypes from "../../API/status";

function AsideBox() {

  const [contentType,setContentType] = useState("")

  const notifCount = useSelector(getNotifCount);

  const userDataStatus = useSelector(getUserDataStatus) 
  const notifStatus = useSelector(getNotificationStatus)

  const userEmail = useSelector(getEmail)
  const token =useSelector(getToken)

  const dispatch = useDispatch()


  useEffect(() => {
    if(notifStatus===statusTypes.idle && userDataStatus===statusTypes.succeeded){
   
      dispatch(fetchNotification(
  
        {
          data:{
            email:userEmail
          },
          token
        }
      ));
      }
     
     
    }, [userDataStatus, dispatch])

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  function getContent(type){
    switch(type){
      case "chat":{return <></>}
      case "notification":{return <NotificationViewer/>}
    }
  }

  const toggleDrawer = (anchor, open, type) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setContentType(type)
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: "90vw" }}
      role="presentation"

    >
      <Stack direction="row">
        <IconButton onClick={toggleDrawer(anchor, false)}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <Box>
        {
          getContent(contentType)
        }
      </Box>
    </Box>
  );

  return (
    <>
      <Box sx={{ pt: 2,mr:1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: "10px",
            bgcolor: "#6495ED",
            p: "10px",
            boxSizing: "border-box",
            height: "auto",
            boxShadow: 2,
          }}
        >
          <IconButton onClick={toggleDrawer("right", true, "chat")}>
            <Badge badgeContent={1} color="primary">
              <MailIcon color="action" />
            </Badge>
          </IconButton>
          <IconButton onClick={toggleDrawer("right", true, "notification")}>
            <Badge badgeContent={notifCount} color="primary" >
              <NotificationsIcon color="action" />
            </Badge>
          </IconButton>
    
          <IconButton sx={{ mt: "40px" }}>
            <Badge badgeContent={0} color="primary">
              <HelpIcon color="action" />
            </Badge>
          </IconButton>
        </Box>
      </Box>
      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
    </>
  );
}

export default AsideBox;
