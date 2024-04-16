import { useState } from "react";

import { Drawer, IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, Typography } from "@mui/material";
import CustomTabPanel from "./CustomTabPanel/CustomTabPanel";
function UserProfile() {
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
      sx={{ width: "90vw"}}
      role="presentation"
      
      onKeyDown={toggleDrawer(anchor, false)}

    >
      <Box sx={{ml:2}}>
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <Stack direction="row">
              <IconButton sx={{mt:1.5, ml:1}}  onClick={toggleDrawer(anchor, false)}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </Grid>
          <Grid item xs={4}>
          
            <Typography sx={{mt:2}} variant="h6" gutterBottom>
              Профиль пользователя
            </Typography>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
        <Grid container spacing={1}>
            <Grid item xs={8}>
               
            <CustomTabPanel
               
                 content={{
                    tabNames: ["Мои личные данные", "Моё место работы", "Моя производительность"],
                  }}
            >
                <Box>
                    1
                </Box>
                <Box>
                    2
                </Box>
                <Box>
                    3
                </Box>

            </CustomTabPanel>
            </Grid>
        </Grid>

      </Box>
    </Box>
  );

  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={toggleDrawer("right", true)}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>

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

export default UserProfile;
