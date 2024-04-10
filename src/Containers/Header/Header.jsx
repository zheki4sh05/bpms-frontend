import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Stack from "@mui/material/Stack";
import AccountCircle from "@mui/icons-material/AccountCircle";

import SearchBar from "../../Components/SearchBar/SearchBar";
import { Settings } from "@mui/icons-material";
import Clock from "../../Components/Clock";
import { useSelector } from 'react-redux'
import DomainNames from "../../Store/DomainNames";
export default function Header() {
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleToggleDrawer = () => {
    onToggle(false);
  };

  const user = useSelector(state => state[DomainNames.app.appUser])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ position: "relative", width: "100%", bgcolor: "#6495ED" }}>
        <Toolbar>
          <Stack direction="row" spacing={2}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Логотип
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
              9 февраля
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
          <Box sx={{display:"flex",flexDirection:"row"}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              
            >
              <AccountCircle />
            </IconButton>
            <Box sx={{ display: "flex", flexDirection: "column", ml:1 }}>
              <Typography variant="subtitle1" >
                {user[0].lastname} {user[0].name}
              </Typography>
              <Typography variant="subtitle2">
              {user[0].email}
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
