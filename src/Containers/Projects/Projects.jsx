import {Stack, Typography } from "@mui/material";
import SearchBox from "../../Components/SearchBox/SearchBox";
import CustomTabPanel from "../../Components/CustomTabPanel/CustomTabPanel";
import CustomTable from "../../Components/CustomTable";
import CreateProject from "../../Components/CreateProject";
import DialogEntityProvider from "../../Components/DialogEntityProvider";
import { getAllUserProjects } from "../../Store/slices/projectSlice";
import { useSelector } from "react-redux";
import { getCompanyName } from "../../Store/slices/companySlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getToken } from "../../Store/slices/appUserSlice";
import ProjectsPageHeader from "../../Components/ProjectsPage/ProjectsPageHeader";

function Projects() {

  const token = useSelector(getToken)

  const companyName = useSelector(getCompanyName)
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
  }, []);

  return (
    <div>
      <DialogEntityProvider>
        <>
          <SearchBox />
         <ProjectsPageHeader/>
          <CustomTabPanel
            content={{
              tabNames: ["Список", "Гант", "Сроки", "Календарь", "Канбан"],
            }}
          >
            <CustomTable />
            <Typography variant="h5" gutterBottom>
              контент 1
            </Typography>
            <Typography variant="h5" gutterBottom>
              контент 2
            </Typography>
            <Typography variant="h5" gutterBottom>
              контент 3
            </Typography>
            <Typography variant="h5" gutterBottom>
              контент 4
            </Typography>
          </CustomTabPanel>
          <CreateProject />
        </>
      </DialogEntityProvider>
    </div>
  );
}

export default Projects;
