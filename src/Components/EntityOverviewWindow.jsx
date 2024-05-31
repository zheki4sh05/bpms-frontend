import { Box } from "@mui/material";


import { useContext, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DialogContext from "./DialogContext";
function EntityOverviewWindow({title, accordionBody }) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const { data } = useContext(DialogContext);

//   const mass = [];
//   if (projects.length > 0) {
//     for (const item of data.list) {
//       mass.push(resultSet.find((result) => result.id == item));
//     }
//   }


  return (
    <Box sx={{ mt: 2, maxWidth: "90%", pl: 2 }}>
      <Typography>
        Выбранные {title}: {data.listData.length}
      </Typography>
      
      <div>
        {data.listData.map((item, index) => (
          
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
            <AccordionDetails>{accordionBody}</AccordionDetails>
          </Accordion>
        ))}
      </div>
    </Box>
  );
}

export default EntityOverviewWindow;
