import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import DialogContext from "../DialogContext";
import { useSelector } from "react-redux";
import { getProjects } from "../../Store/slices/projectSlice";

import { useContext, useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CustomTabPanel from "../CustomTabPanel/CustomTabPanel";
import ProjectInfo from "./ProjectTabs/ProjectInfo";
import KanbanProject from "./ProjectTabs/KanbanProject";


function ProjectOverviewWindow() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const { data } = useContext(DialogContext);

  const projects = useSelector(getProjects);
  const mass = [];
  if (projects.length > 0) {
    for (const item of data.list) {
      mass.push(projects.find((project) => project.id == item));
    }
  }
  return (
    <Box sx={{ mt: 2, maxWidth: "90%", pl: 2 }}>
      <Typography>Выбранные проекты: {mass.length}</Typography>
      <div>
        {mass.map((item, index) => (
          <Accordion
            key={index}
            expanded={expanded === "panel".concat(index)}
            onChange={handleChange("panel".concat(index))}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}bh-content`}
              id={`panel${index}bh-header`}
              key={index}
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                {item.name}
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                {item.description}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* <ProjectOverview
                        project = {item}
                    /> */}

              <CustomTabPanel
                content={{
                  tabNames: ["Канбан", "Статистика", "О проекте"],
                }}
              >
                {/* <KanbanProject project={item} /> */}
                <ProjectInfo project={item} />

                <ProjectInfo project={item} />
              </CustomTabPanel>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </Box>
  );
}

export default ProjectOverviewWindow;
