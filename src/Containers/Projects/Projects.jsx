import { Typography } from "@mui/material";
import SearchBox from "../../Components/SearchBox/SearchBox";
import CustomTabPanel from "../../Components/CustomTabPanel/CustomTabPanel";
import CreateProject from "../../Components/CreateProject";
import DialogEntityProvider from "../../Components/DialogEntityProvider";
import { getAddedStatus, getAllProjectsStatuses, getAllUserProjects, getProjectsCount } from "../../Store/slices/projectSlice";
import { useSelector } from "react-redux";
import { getCompanyName } from "../../Store/slices/companySlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getToken } from "../../Store/slices/appUserSlice";
import ProjectsPageHeader from "../../Components/ProjectsPage/ProjectsPageHeader";
import ProjectsTable from "../../Components/ProjectsPage/ProjectsTable";
import AllProjectsTable from "../../Components/ProjectsPage/AllProjectTable";
import ActiveProjectsTable from "../../Components/ProjectsPage/ActiveProjectsTable";
import statusTypes from "../../API/status";
import OverdueProjects from './../../Components/ProjectsPage/OverdueProjects';

function Projects() {

  const token = useSelector(getToken)

  const companyName = useSelector(getCompanyName)

  const projectCount = useSelector(getProjectsCount)

  const addedStatus = useSelector(getAddedStatus)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      getAllUserProjects({
        data:{
          companyName
        },
        token,
      })
    );
    dispatch(
      getAllProjectsStatuses({
        data:{
          companyName
        },
        token,
  })
    )
  }, []);

  return (
    <div>
      <DialogEntityProvider>
        <>
          <SearchBox />
         <ProjectsPageHeader/>
         {
              (projectCount>0 && addedStatus===statusTypes.succeeded) ? 
          
          <CustomTabPanel
            content={{
              tabNames: ["Все", "Активные", "Просроченные"],
            }}
          >
            
            <AllProjectsTable/>

            <ActiveProjectsTable/>
            
            <OverdueProjects/>
           
          </CustomTabPanel>
            :
            <Typography variant="subtitle1" gutterBottom>
           У Вас нет проектов
          </Typography>

          }
          <CreateProject />
        </>
      </DialogEntityProvider>
    </div>
  );
}

export default Projects;
