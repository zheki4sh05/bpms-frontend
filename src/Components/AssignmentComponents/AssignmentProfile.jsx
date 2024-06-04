import { Box, CircularProgress } from "@mui/material";
import CustomTabPanel from "../CustomTabPanel/CustomTabPanel";
import { memo, useEffect } from "react";
import AssignmentSettings from "./AssignmentSettings";
import AssignmentControl from "./AssignmentControl";
import { useDispatch } from "react-redux";
import { getAddedAssignmentStatus, getAllUserAssignmentsStatuses, getAssignmentsStatuses } from "../../Store/slices/assignmentSlice";
import { useSelector } from "react-redux";
import { getToken } from "../../Store/slices/appUserSlice";
import { getAddedStatus } from "../../Store/slices/projectSlice";
import statusTypes from "../../API/status";
import { checkAll } from "../../Util/checkStatuses";

const AssignmentProfile = memo(({assignment}) =>{

    const dispatch = useDispatch()
    const token = useSelector(getToken)
    const assignmentStatus = useSelector(getAssignmentsStatuses)
    const status = useSelector(getAddedAssignmentStatus)

    function makeRequest(){
      console.log("lskmvlsm")
            dispatch(
                getAllUserAssignmentsStatuses({
                    data:{
                        assignmentId:assignment.id,
                        
                    },
                    token
        
                })
            )
      
    }
    
    useEffect(()=>{
   
        makeRequest()
    },[])

 console.log(status)
    return (
        
    <Box sx={{backgroundColor:"white", borderRadius:"3px", p:1}}>

        {status == statusTypes.succeeded ? 

        <CustomTabPanel
          content={{
            tabNames: ["Настройки", "Управление"],
          }}
        >
            <AssignmentSettings
            
            assignment ={assignment}
            assignmentStatus={assignmentStatus}
            requestHandler={makeRequest}
             
             />

             <AssignmentControl
             
             assignment ={assignment}
             assignmentStatus={assignmentStatus}

             />
          
        </CustomTabPanel>
        : <CircularProgress />}

     

    </Box> 
    
);
})

export default AssignmentProfile;