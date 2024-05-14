import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import Stack from "@mui/material/Stack";

import SearchBar from "../../Components/SearchBar/SearchBar";
import { Settings } from "@mui/icons-material";
import Clock from "../../Components/Clock";
import { useSelector } from "react-redux";
import DomainNames from "../../Store/DomainNames";
import UserProfile from "./../../Components/UserProfile/UserProfile";


export default function Header() {

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleToggleDrawer = () => {
    onToggle(false);
  };

  const name = useSelector((state) => state[DomainNames.app.appUser].user.name);
  const email = useSelector((state) => state[DomainNames.app.appUser].user.email);
  const lastname = useSelector((state) => state[DomainNames.app.appUser].user.lastname);



  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ position: "relative", width: "100%", bgcolor: "#6495ED" }}>
        <Toolbar>
          <Stack direction="row" spacing={2}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              TaskWise
            </Typography>

            <SearchBar />
          </Stack>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: { lg: "row", xs: "column" },
            }}
          >
            <Clock />

            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, ml: 2, display: "inline-block" }}
            >
              {new Date().toLocaleDateString()}
            </Typography>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, ml: 2 }}
            >
              <Settings />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <UserProfile />
            <Box sx={{ display: "flex", flexDirection: "column", ml: 1 }}>
              <Typography variant="subtitle1">
                {lastname} {name}
              </Typography>
              <Typography variant="subtitle2">{email}</Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
