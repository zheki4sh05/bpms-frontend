import classes from "./Layout.module.scss";
import Header from "./../Header/Header";
import MainBody from "./../MainBody/MainBody";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import UserDrawer from "../../Components/UserDrawer/UserDrawer";
import WidgetsToolBar from "../WidgetsToolBar/WidgetsToolBar";
import AsideBox from "../../Components/AsideBox/AsideBox";
import { useState } from "react";
import SignUp from "../SignUp";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ruRU } from '@mui/material/locale';
import AuthFormComponent from "../../Components/AuthFormComponent";

const theme = createTheme(
  ruRU,
);

function Layout() {

  const [isAuth,setAuth] = useState(false);

  const handleLogIn=()=>{
    setAuth(true);
  }
  const handleLogOut=()=>{
      
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.main}>
      {
        !isAuth ? 

        <AuthFormComponent 
            toggleState = {handleLogIn}
        />
        :
        <Box
        sx={{
          display: "flex",
          flexDirection: "column",
    
        }}
      >
 
        <Header />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <UserDrawer />

          <MainBody>
            <Outlet/>
          </MainBody>

            <WidgetsToolBar/>
            <AsideBox/>
        </Box>
      </Box>
      }

      

     
    </div>
      </ThemeProvider>
    
  );
}

export default Layout;
