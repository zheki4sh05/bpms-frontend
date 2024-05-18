import { useSelector } from "react-redux";
import { fetchUserData, getEmail, getToken, getUserDataStatus } from "../Store/slices/appUserSlice";
import StatusContent from "../Util/statusContent";
import { useDispatch } from "react-redux";
import statusTypes from "../API/status";
import { useEffect } from "react";
import { Box } from "@mui/material";
import { getCompanyDataStatus, userCompany } from "../Store/slices/companySlice";
import { fetchNotification, getNotificationStatus } from "../Store/slices/notificationSlice";

function LoadingUserData() {


    const token = useSelector(getToken);
    const userDataStatus = useSelector(getUserDataStatus) 
    const companyDataStatus = useSelector(getCompanyDataStatus)
    const notifStatus = useSelector(getNotificationStatus)
  
    const email = useSelector(getEmail)
    
    const dispatch  = useDispatch();
    useEffect(() => {
      if(userDataStatus===statusTypes.idle){
        dispatch(fetchUserData({ token }));
    }
       
        if (companyDataStatus === statusTypes.idle) {
            dispatch(userCompany({token})) 
          }
         
        //   if(notifStatus===statusTypes.idle && userDataStatus===statusTypes.succeeded){
        //     console.log(email)
        //     dispatch(fetchNotification(

        //       {
        //         data:{
        //           email
        //         },
        //         token
        //       }
        //     ));
        // }
       
       
      }, [userDataStatus, companyDataStatus, dispatch])
    

    return ( 
    <Box>
        <StatusContent
          result={userDataStatus}
          errorDomain="any"
          errorCode={"any"}
          successText="Операция выполнена успешно!"
          failedText="Что-то пошло не так..."
          loadingType={"linear"}
          successType={"none"}
          errorType={"primary"}
        />
    </Box> 
    
);
}

export default LoadingUserData;