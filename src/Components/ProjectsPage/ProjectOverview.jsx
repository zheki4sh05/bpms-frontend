import { Box } from "@mui/material";

import CustomTabPanel from "../CustomTabPanel/CustomTabPanel";
import ProjectInfo from "./ProjectTabs/ProjectInfo";
import KanbanProject from "./ProjectTabs/KanbanProject";
import { memo } from "react";

const ProjectOverview = memo(({ project })=> {
  return (
    <Box>
      {/* <CustomTabPanel
        content={{
          tabNames: ["Инфо", "Статистика", "Участники","Новости"],
        }}
      > */}
      <CustomTabPanel
        content={{
          tabNames: ["Канбан", "Статистика", "О проекте"],
        }}
      >
        <KanbanProject project={project} />
        <ProjectInfo project={project} />

        <ProjectInfo project={project} />
      </CustomTabPanel>
    </Box>
  );
})

export default ProjectOverview;
