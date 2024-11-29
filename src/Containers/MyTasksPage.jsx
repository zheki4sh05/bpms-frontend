import { Stack, Typography } from "@mui/material";
import SearchBox from "../Components/SearchBox/SearchBox";
import CustomTabPanel from "../Components/CustomTabPanel/CustomTabPanel";
import CustomTable from "../Components/CustomTable";
import { useSelector } from "react-redux";
import MyTaskTable from "../Components/MyTasksComponents/MyTaskTable";
import { useEffect, useMemo } from "react";
import { getAllUserAssignmnets, getAssignmentsList } from "../Store/slices/assignmentSlice";
import { getEmail, getId, getToken } from "../Store/slices/appUserSlice";
import PageInfo from "../Components/PageInfo";
import { getRoleInCompany } from "../Store/slices/companySlice";
import { useDispatch } from "react-redux";

function MyTasksPage() {

  const userId = useSelector(getId)

  const useremail = useSelector(getEmail)

  const token = useSelector(getToken)
  const role  = useSelector(getRoleInCompany)
    const tasksResult = useSelector(getAssignmentsList) || []
    
  const myTasks = useMemo(() => tasksResult.filter(item=>item.worker == userId), [tasksResult]);

    const assignCount = useMemo(()=>{return myTasks.filter(item=>item.status=="create").length},[myTasks])
    const acceptedCount = useMemo(()=>{return myTasks.filter(item=>item.status=="accepted").length},[myTasks])
    const rejectedCount = useMemo(()=>{return myTasks.filter(item=>item.status=="reject").length},[myTasks])
    const stopCount = useMemo(()=>{return myTasks.filter(item=>item.status=="stop").length},[myTasks])
    const doneCount = useMemo(()=>{return myTasks.filter(item=>item.status=="done").length},[myTasks])


    function makeRequest(){
      dispatch(
        getAllUserAssignmnets({
          data: {
            userEmail:useremail,
            role:role,
            size:""
          },
          token,
        })
      );
      // dispatch(
      //   getAllUserAssignmentsStatuses({
      //     data: {
      //       useremail,
      //     },
      //     token,
      //   })
      // );
    }
  
    const dispatch = useDispatch();
    useEffect(() => {
      makeRequest(); 
    }, []);
  


    return ( 
        <div>
         
        <SearchBox />

        {myTasks.length>0 ? <>
        
          <PageInfo
          name="Мои задачи"
          data={[
            {
              name: "Назначено",
              count: `${assignCount}`,
            },
            {
              name: "Принято",
              count: `${acceptedCount}`,
            },
            {
              name: "Отклонено",
              count: `${rejectedCount}`,
            },
            {
              name: "Остановлено",
              count: `${stopCount}`,
            },
            {
              name: "Остановлено",
              count: `${doneCount}`,
            },
          ]}
        />
        
     

          <MyTaskTable/>
  
        
        </>: <Typography sx={{mt:2}}>У Вас нет задач</Typography>}
      
      </div>
     );
}

export default MyTasksPage;