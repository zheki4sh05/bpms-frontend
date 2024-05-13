import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import DialogContext from "../DialogContext";
import { useSelector } from "react-redux";
import { getProjects } from "../../Store/slices/projectSlice";
import ProjectOverview from "./ProjectOverview";
import { useContext, useState } from "react";


import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function ProjectOverviewWindow() {

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


    const {data} = useContext(DialogContext);
    console.log("result")
    console.log(data.list)
    const projects = useSelector(getProjects);
    console.log("projects")
    console.log(projects)
    //onst mass=[{id:1,name:"Проект 1",description:"sdcsdc"},{id:2,name:"Проект 2",description:"sdcsdc"}];
    const mass=[];
    if(projects.length>0){

      for(const item of data.list){
          
          mass.push(projects.find(project=>project.id == item))
      }
    }
    console.log(mass)
    return (
         <Box sx={{mt:4, maxWidth:"90%",pl:2}}>

          <div>
            {
              mass.map((item,index)=>(
                <Accordion expanded={expanded === "panel".concat(index)} onChange={handleChange("panel".concat(index))}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}bh-content`}
                  id={`panel${index}bh-header`}
                  key={index}
                >
                  <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    {item.name}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{item.description}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <ProjectOverview
                        project = {item}
                    />
                </AccordionDetails>
              </Accordion>
              ))

            }

     
 
    </div>


        </Box> 
    );
}

export default ProjectOverviewWindow;