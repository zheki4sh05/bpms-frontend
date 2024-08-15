import { Stack, Typography } from "@mui/material";
import SearchBox from "../Components/SearchBox/SearchBox";
import CustomTabPanel from "../Components/CustomTabPanel/CustomTabPanel";
import CustomTable from "../Components/CustomTable";
import { useSelector } from "react-redux";
import MyTaskTable from "../Components/MyTasksComponents/MyTaskTable";
import { useMemo } from "react";
import { getAssignmentsList } from "../Store/slices/assignmentSlice";
import { getId } from "../Store/slices/appUserSlice";
import PageInfo from "../Components/PageInfo";

function MyTasksPage() {

  const userId = useSelector(getId)

  

    const tasksResult = useSelector(getAssignmentsList) || []
    
  const myTasks = useMemo(() => tasksResult.filter(item=>item.worker == userId), [tasksResult]);

    const assignCount = useMemo(()=>{return myTasks.filter(item=>item.status=="create").length},[myTasks])
    const acceptedCount = useMemo(()=>{return myTasks.filter(item=>item.status=="accepted").length},[myTasks])
    const rejectedCount = useMemo(()=>{return myTasks.filter(item=>item.status=="reject").length},[myTasks])
    const stopCount = useMemo(()=>{return myTasks.filter(item=>item.status=="stop").length},[myTasks])
    const doneCount = useMemo(()=>{return myTasks.filter(item=>item.status=="done").length},[myTasks])



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
        
        <CustomTabPanel
          content={{
            tabNames: ["Список", "Календарь", "Канбан"],
          }}
        >
       
          <MyTaskTable/>
          <Typography variant="h5" gutterBottom>
           контент 1
          </Typography>
          <Typography variant="h5" gutterBottom>
           контент 2
          </Typography>
         
              
       
          
        </CustomTabPanel>
        
        </>: <Typography sx={{mt:2}}>У Вас нет задач</Typography>}
      
      </div>
     );
}

export default MyTasksPage;