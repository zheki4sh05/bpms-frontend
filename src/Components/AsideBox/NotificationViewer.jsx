import { Box, Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import {
  getNotifCount,
  getNotificationAcceptedStatus,
  getNotifications,
} from "../../Store/slices/notificationSlice";
import NotificationBox from "../Notifications/NotificationBox";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";

function NotificationViewer() {
  const [alignment, setAlignment] = useState("all");

  const count = useSelector(getNotifCount);

  const list = useSelector(getNotifications);

  const status = useSelector(getNotificationAcceptedStatus)

 

  // const companyStatus = useSelector(getC)

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  // if(status==statusTypes.succeeded){
  //   dispatch(userCompany(
  //       {token}
  //   ))
  // }

  function getNotificationsByType(type){
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
        <NotificationBox data={item} key={index} />
      ))}
    </Box>
  );
}

export default NotificationViewer;
