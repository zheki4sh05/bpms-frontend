import classes from "./Layout.module.scss";
import Header from "./../Header/Header";
import MainBody from "./../MainBody/MainBody";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import UserDrawer from "../../Components/UserDrawer/UserDrawer";
import WidgetsToolBar from "../WidgetsToolBar/WidgetsToolBar";
import AsideBox from "../../Components/AsideBox/AsideBox";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ruRU } from "@mui/material/locale";
import AuthFormComponent from "../../Components/AuthFormComponent";
import DomainNames from "../../Store/DomainNames";
import statusTypes from "../../API/status";
import { useSelector } from "react-redux";
import {
  getAppStatus,
  getAuthStatus,
 
} from "../../Store/slices/appUserSlice";

import LoadingUserData from "../../Components/LoadingUserData";
import Grid from '@mui/material/Grid2';

const theme = createTheme(ruRU);

function Layout() {
  const authStatus = useSelector(
    getAuthStatus
  );

  const appStatus = useSelector(getAppStatus);



   const handleLogOut = () => {};

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.main}>
        {
          //(authStatus===statusTypes.succeeded && userDataStatus===statusTypes.succeeded && companyDataStatus===statusTypes.succeeded) ?
          // !(checkAll([authStatus,userDataStatus,companyDataStatus])===statusTypes.succeeded) ?
         !(authStatus === statusTypes.succeeded) ? 
            <AuthFormComponent />
           : !(appStatus === statusTypes.succeeded) ? 
            <LoadingUserData  />
           : 
          <>
              <Header />
              
              <Box sx={{width:"100%", p:1}} ></Box>

              
               <Box sx={{display:"flex", flex:"row nowrap", height:"100%", paddingBottom:"10px"}} >
                 <Box sx={{paddingLeft:"30px", paddingRight:"54px"}} >
                  <UserDrawer />
                 </Box>
                
               
                
                <MainBody>
                  <Outlet />
                </MainBody>
               
                {/* <Grid size={0} >
                  <WidgetsToolBar />
                </Grid> */}
                <Box sx={{marginLeft:"52px", paddingRight:"28px"}}>
                <AsideBox />

                </Box>
              
                
                

             

                        </Box>
                        
                        </>
          
        }
      </div>
    </ThemeProvider>
  );
}

export default Layout;
