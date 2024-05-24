import { Box } from "@mui/material";

import CustomTabPanel from "../CustomTabPanel/CustomTabPanel";
import ProjectInfo from "./ProjectTabs/ProjectInfo";
import KanbanProject from './ProjectTabs/KanbanProject';



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
          tabNames: ["О проекте","Статистика", "Канбан"],
        }}
      >

        <ProjectInfo
          project={project}
        />
        
        <ProjectInfo
          project={project}
        />
        <KanbanProject/>

      </CustomTabPanel>
    </Box>
  );
}

export default ProjectOverview;
