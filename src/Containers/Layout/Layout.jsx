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
import DomainNames from "../../Store/DomainNames";
import statusTypes from "../../API/status";
import { useSelector } from "react-redux";
import { fetchUserData, getToken } from "../../Store/slices/appUserSlice";
import { useDispatch } from "react-redux";
const theme = createTheme(
  ruRU,
);

function Layout() {
  const authStatus = useSelector((state)=>state[DomainNames.app.appUser].status)

  const [isAuth,setAuth] = useState(true);

  const handleLogIn=()=>{
   
    setTimeout(function () {
      setAuth(true);
    }, 1500);
  
  }

  if(authStatus===statusTypes.succeeded){
    handleLogIn();
   
  }

  const handleLogOut=()=>{
      
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.main}>
      {
        !isAuth ? 

        <AuthFormComponent 
            
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
