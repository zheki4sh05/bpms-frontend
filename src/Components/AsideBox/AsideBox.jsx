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
import { useState } from "react";

function AsideBox() {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: "90vw" }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Stack direction="row">
        <IconButton onClick={toggleDrawer(anchor, false)}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <Box>
        контент
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
          <IconButton onClick={toggleDrawer("right", true)}>
            <Badge badgeContent={1} color="primary">
              <MailIcon color="action" />
            </Badge>
          </IconButton>
          <IconButton>
            <Badge badgeContent={0} color="primary">
              <NotificationsIcon color="action" />
            </Badge>
          </IconButton>
          <IconButton>
            <Badge badgeContent={0} color="primary">
              <PersonIcon color="action" />
            </Badge>
          </IconButton>
          <IconButton>
            <Badge badgeContent={0} color="primary">
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
