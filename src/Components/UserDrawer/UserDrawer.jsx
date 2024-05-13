import * as React from "react";
import { useState } from "react";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";

import List from "@mui/material/List";

import Divider from "@mui/material/Divider";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import IconButton from "@mui/material/IconButton";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
import PathConstants from "../../assets/pathConstants";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TimelineIcon from '@mui/icons-material/Timeline';
import DescriptionIcon from '@mui/icons-material/Description';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Diversity3Icon from '@mui/icons-material/Diversity3';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  position: "relative",

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const menu_items = [
  {
    path:PathConstants.HOME,
    name:"Новости",
    icon: <MailIcon />
  },
  {
    path:PathConstants.PROJECTS,
    name:"Мои проекты",
    icon: <InboxIcon />
  },
  {
    path:PathConstants.TASKS,
    name:"Мои задачи",
    icon: <AssignmentReturnedIcon />
  },
  {
    path:PathConstants.CALENDAR,
    name:"Календарь",
    icon: <CalendarMonthIcon/>
  },
  {
    path:PathConstants.PROCESSES,
    name:"Процессы",
    icon: <TimelineIcon />
  },
  {
    path:PathConstants.DOCUMENTS,
    name:"Документы",
    icon: <DescriptionIcon />
  },
  {
    path:PathConstants.ASSIGNMENTS,
    name:"Поручения",
    icon: <AssignmentIndIcon />
  },
  {
    path:PathConstants.STAFF,
    name:"Персонал",
    icon: <Diversity3Icon />
  },
]

export default function UserDrawer() {
  const theme = useTheme();
 
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  
  };

  const handleDrawerClose = () => {
    setOpen(false);

  };

  return (
    <Box sx={{
      height:"100%",
     
    }}>
      <Drawer
        variant="permanent"
        open={open}
        sx={{ position: "relative", mt: 2, height:"100%",marginLeft:"10px",borderRadius:"10px" }}
        PaperProps={{ sx: { position: "relative", height:"100%", bgcolor:"#6495ED" } }}
      >
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          {!open ? (
            <IconButton onClick={handleDrawerOpen} >
              <ChevronLeftIcon sx={{ color: "white" }}/>
            </IconButton>
          ) : (
            <IconButton onClick={handleDrawerClose}>
              <ChevronRightIcon  sx={{ color: "white" }} />
            </IconButton>
          )}
        </Box>

        <Divider />

        <List>
          {menu_items.map(
            (item, index) => (
              <ListItem key={index} disablePadding sx={{ display: "block" }}>
                <Link to={item.path} >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color: "white" 
                      }}
                    >
               
                    {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      
                      primary={item.name}
                      sx={{ opacity: open ? 1 : 0, color:"white" }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            )
          )}
        </List>
      </Drawer>
    </Box>
  );
}
