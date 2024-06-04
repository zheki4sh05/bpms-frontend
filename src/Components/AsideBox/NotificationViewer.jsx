import { Box, Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import {
  fetchNotification,
  getNotifCount,
  getNotificationAcceptedStatus,
  getNotifications,
} from "../../Store/slices/notificationSlice";
import NotificationBox from "../Notifications/NotificationBox";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getEmail } from "../../Store/slices/appUserSlice";

function NotificationViewer() {
  const [alignment, setAlignment] = useState("all");

  const count = useSelector(getNotifCount);

  const list = useSelector(getNotifications);


  // const companyStatus = useSelector(getC)

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  // if(status==statusTypes.succeeded){
  //   dispatch(userCompany(
  //       {token}
  //   ))
  // }

  const dispatch = useDispatch();

  function requestHandler(email,token,type){

    if(type=="invitation"){
      location.reload();
    }
    dispatch(fetchNotification(
  
      {
        data:{
          email:email
        },
        token
      }
    ));
  }

  function getNotificationsByType(type){

    if(list.length>0){

      switch(type){
        case "all":{
          return list;
        }
        case "assignments":{
          return list.filter(item=>item.type===type)
        }
        case "invite":{
          return list.filter(item=>item.type===type)
        }
      }
    }else{
      return []
    }

  }

  return (
    <Box sx={{ m: 2, maxWidth: "600px" }}>
      <Typography variant="h6" gutterBottom>
        Уведомления: {count}
      </Typography>

      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        sx={{mb:2}}
      >
        <ToggleButton value="all">Все</ToggleButton>
        <ToggleButton value="assignments">Поручения</ToggleButton>
        <ToggleButton value="invite">Приглашения</ToggleButton>
      </ToggleButtonGroup>

      <Divider />
      <Box sx={{ mt: 3 }}></Box>
      {getNotificationsByType(alignment).map((item, index) => (
        <NotificationBox notifData={item} key={index} requestHandler={requestHandler}/>
      ))}
    </Box>
  );
}

export default NotificationViewer;
