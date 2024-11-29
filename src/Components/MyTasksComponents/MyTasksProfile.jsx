import { Box, CircularProgress, Typography } from "@mui/material";
import statusTypes from "../../API/status";
import CustomTabPanel from "../CustomTabPanel/CustomTabPanel";
import MyTaskProgress from "./MyTaskProgress";
import MyTaskWork from "./MyTaskWork";
import MyTaskBreaf from "./MyTaskBreaf";
import { getAddedAssignmentStatus, getAllUserAssignmentsStatuses, getAssignmentsStatuses } from "../../Store/slices/assignmentSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getToken } from "../../Store/slices/appUserSlice";
import { getProjects } from "../../Store/slices/projectSlice";
import { useEffect } from "react";

function MyTasksProfile({task}) {

    const dispatch = useDispatch();
    const token = useSelector(getToken);
    const assignmentStatus = useSelector(getAssignmentsStatuses);
    const status = useSelector(getAddedAssignmentStatus);
  
    const project = useSelector(getProjects).find(
      (item) => item.id == task.projectId
    ).name;
  
    function makeRequest() {
      dispatch(
        getAllUserAssignmentsStatuses({
          data: {
            assignmentId: task.id,
          },
          token,
        })
      );
    }

  
    useEffect(() => {
      makeRequest();
    }, []);


    return ( 
        <Box sx={{ backgroundColor: "white", borderRadius: "3px", p: 1 }}>
        {status == statusTypes.succeeded ? (
          <>
            <Typography>Проект: {project}</Typography>
  
            <CustomTabPanel
              content={{
                tabNames: ["Постановка задачи", "Выполнение", "Результат выполнения"],
              }}
            >
                <MyTaskBreaf task={task} assignmentStatus={assignmentStatus}/>
                <MyTaskWork task={task} assignmentStatus={assignmentStatus} />
                <MyTaskProgress task={task} assignmentStatus={assignmentStatus}/>

         
  
            </CustomTabPanel>
          </>
        ) : (
          <CircularProgress />
        )}
      </Box>
    
);
}

export default MyTasksProfile;