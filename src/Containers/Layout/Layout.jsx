import classes from "./Layout.module.scss";
import Header from "./../Header/Header";
import MainBody from "./../MainBody/MainBody";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import UserDrawer from "../../Components/UserDrawer/UserDrawer";
import WidgetsToolBar from "../WidgetsToolBar/WidgetsToolBar";
import AsideBox from "../../Components/AsideBox/AsideBox";
function Layout() {
  return (
    <div className={classes.main}>
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
    </div>
  );
}

export default Layout;
