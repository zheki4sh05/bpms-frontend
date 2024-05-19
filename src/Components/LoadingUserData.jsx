import { useSelector } from "react-redux";
import { fetchUserData, getEmail, getToken, getUserDataStatus } from "../Store/slices/appUserSlice";
import StatusContent from "../Util/statusContent";
import { useDispatch } from "react-redux";
import statusTypes from "../API/status";
import { useEffect } from "react";
import { Box } from "@mui/material";
import { getCompanyDataStatus, userCompany } from "../Store/slices/companySlice";
import { checkAll } from "../Util/checkStatuses";


function LoadingUserData() {


    const token = useSelector(getToken);
    const userDataStatus = useSelector(getUserDataStatus) 
    const companyDataStatus = useSelector(getCompanyDataStatus)

    
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
    
  //     function checkAll(list){
  //        const loading = list.filter(item=>item===statusTypes.loading).lentgh
  //        const failed = list.filter(item=>item===statusTypes.failed).length
  //   if(failed!=0){
  //     return statusTypes.failed
  //   }else if (loading!=0){
  //     return statusTypes.loading
  //   }else {
  //     return statusTypes.succeeded
  //   }
  // }

    return ( 
    <Box>
        <StatusContent
          result={checkAll([userDataStatus, companyDataStatus])}
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