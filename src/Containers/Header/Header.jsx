import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import Stack from "@mui/material/Stack";

import SearchBar from "../../Components/SearchBar/SearchBar";
import { Settings } from "@mui/icons-material";
import Clock from "../../Components/Clock";
import { useSelector } from "react-redux";
import DomainNames from "../../Store/DomainNames";
import UserProfile from "./../../Components/UserProfile/UserProfile";
import Grid from '@mui/material/Grid2';



export default function Header() {
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleToggleDrawer = () => {
    onToggle(false);
  };

  const name = useSelector((state) => state[DomainNames.app.appUser].user.name);
  const email = useSelector(
    (state) => state[DomainNames.app.appUser].user.email
  );
  const lastname = useSelector(
    (state) => state[DomainNames.app.appUser].user.lastname
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          position: "relative",
          width: "100%",
          bgcolor: "#6495ED",
          height: "90px",
          display: "flex",
          justifyContent: "center",
         
        }}
      >
        <Grid container spacing={2} > 
          <Grid size={3}>
         
             
                <Box sx={{
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"center",
                 
                  height:"100%"
                }} >

                
                <Typography variant="h5" component="div" >
                  TaskWise
                </Typography>
                </Box>
           
          </Grid>
          <Grid size={3}>
 
              <Box sx={{   height:"100%", display:"flex", alignItems:"center" }}>
                <Box sx={{boxShadow: 3, borderRadius: "10px",width:"100%"}}>
                <SearchBar
                  elevation={0}
                  placeHolder={"Поиск"}
                  handleSearch={() => {
                    console.log("search");
                  }}
                />
                </Box>
               
              </Box>
             
           
          </Grid>
          <Grid size={3} >
          <Box sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>

          
             
              <Box sx={{height:"auto"}}>
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
              </Box>
           
          </Grid>

          <Grid size={3}>
           
              <Box sx={{ display: "flex", flexDirection: "row", justifyContent:"center" }}>
                <UserProfile />
                <Box sx={{ display: "flex", flexDirection: "column", ml: 1 }}>
                  <Typography variant="subtitle1">
                    {lastname} {name}
                  </Typography>
                  <Typography variant="subtitle2">{email}</Typography>
                </Box>
              </Box>
            
          </Grid>
        </Grid>
      </AppBar>
    </Box>
  );
}
