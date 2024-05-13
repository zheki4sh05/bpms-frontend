import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import { getStaff } from "../../Store/slices/companySlice";
import WorkerProfile from "./WorkerProfile";
import { useContext, useState } from "react";
import DialogContext from "../DialogContext";
import { useSelector } from "react-redux";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function WorkerOverviewPage() {

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
  
  
      const {data} = useContext(DialogContext);
  
      const staff = useSelector(getStaff) || [];
      const mass=[];
      if(staff.length>0){
  
        for(const item of data.list){
            
            mass.push(staff.find(staff=>staff.id == item))
        }
      }

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
                <Typography sx={{ color: 'text.secondary' }}>{item.lastname}</Typography>
              </AccordionSummary>
              <AccordionDetails>
              <WorkerProfile
                      worker = {item}
                  />
              </AccordionDetails>
            </Accordion>
            ))

          }

   

  </div>


      </Box> 
     );
}

export default WorkerOverviewPage;