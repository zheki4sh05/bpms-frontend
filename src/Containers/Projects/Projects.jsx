import { Typography } from "@mui/material";
import SearchBox from "../../Components/SearchBox/SearchBox";
import CustomTabPanel from "../../Components/CustomTabPanel/CustomTabPanel";
import CreateProject from "../../Components/CreateProject";
import DialogEntityProvider from "../../Components/DialogEntityProvider";
import {
  getAddedStatus,
  getAllProjectsStatuses,
  getAllUserProjects,
  getProjects,
  getProjectsCount,
  getProjectsResults,
} from "../../Store/slices/projectSlice";
import { useSelector } from "react-redux";
import {
  getCompanyName,
  getCreatedStatus,
} from "../../Store/slices/companySlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getToken } from "../../Store/slices/appUserSlice";
import ProjectsPageHeader from "../../Components/ProjectsPage/ProjectsPageHeader";
import ProjectsTable from "../../Components/ProjectsPage/ProjectsTable";
import AllProjectsTable from "../../Components/ProjectsPage/AllProjectTable";
import ActiveProjectsTable from "../../Components/ProjectsPage/ActiveProjectsTable";
import statusTypes from "../../API/status";
import OverdueProjects from "./../../Components/ProjectsPage/OverdueProjects";
import { getProjectsLoadedStatus } from "./../../Store/slices/projectSlice";
import StatusContent from "../../Util/statusContent";
import { checkAll } from "../../Util/checkStatuses";

function Projects() {
  const token = useSelector(getToken);

  const companyName = useSelector(getCompanyName);

  // const projectCount = useSelector(getProjectsCount);

  // const projectsStatus = useSelector(getProjectsLoadedStatus);

  // const addedStatus = useSelector(getAddedStatus);

  const projectCount = useSelector(getProjects).length

  const statusesCount = useSelector(getProjectsResults).length

  const projectsStatus = statusTypes.succeeded;

  const addedStatus = statusTypes.succeeded;


 
  function makeRequest() {
    dispatch(
      getAllUserProjects({
        data: {
          companyName,
        },
        token,
      })
    );
    dispatch(
      getAllProjectsStatuses({
        data: {
          companyName,
        },
        token,
      })
    );
  }

  const dispatch = useDispatch();
  useEffect(() => {
    makeRequest();
  }, []);

  return (
    <div>
      <DialogEntityProvider>
        <>
          <SearchBox buttonText="Создать" />
          <ProjectsPageHeader />
          {checkAll([projectsStatus, addedStatus]) !== statusTypes.succeeded ? (
            <StatusContent
              result={checkAll([projectsStatus, addedStatus])}
              errorDomain={""}
              errorCode={""}
              loadingType={""}
              successType={"none"}
              errorType={"primary"}
            />
          ) : (projectCount > 0 && statusesCount>0 && addedStatus !== statusTypes.failed) ? (
            <CustomTabPanel
              content={{
                tabNames: ["Все", "Активные", "Просроченные"],
              }}
            >
              <AllProjectsTable />

              <ActiveProjectsTable />

              <OverdueProjects />
            </CustomTabPanel>
          ) : (
            <Typography variant="subtitle1" gutterBottom>
              У Вас нет проектов
            </Typography>
          )}

          <CreateProject reloadHandler={makeRequest} />
        </>
      </DialogEntityProvider>
    </div>
  );
}

export default Projects;
