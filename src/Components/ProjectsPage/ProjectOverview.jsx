import { Box } from "@mui/material";

import CustomTabPanel from "../CustomTabPanel/CustomTabPanel";
import ProjectInfo from "./ProjectTabs/ProjectInfo";



function ProjectOverview({ project }) {
  return (
    <Box>
      {/* <CustomTabPanel
        content={{
          tabNames: ["Инфо", "Статистика", "Участники","Новости"],
        }}
      > */}
       <CustomTabPanel
        content={{
          tabNames: ["О проекте","Статистика"],
        }}
      >

        <ProjectInfo
          project={project}
        />
        
        <ProjectInfo
          project={project}
        />

      </CustomTabPanel>
    </Box>
  );
}

export default ProjectOverview;
