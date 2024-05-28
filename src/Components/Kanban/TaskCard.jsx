import * as React from "react";
import {
  Box,
  Card,
  CardHeader,
  Grid,
  Chip,
  Badge,
  IconButton,
  Typography,
  CardContent,
  CardActions,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  Button,

} from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { styled } from "@mui/system";
import { useState } from "react";
import ChangeStatusDialog from "./ChangeStatusDialog";
import { memo } from "react";
import SettingsIcon from '@mui/icons-material/Settings';
const Title = styled("div")(() => ({
  marginBottom: "1.5px",
  color: "#666666",
}));

const SubTitle = styled("span")(() => ({
  marginBottom: "1.5px",
  color: "#333333",
  fontWeight: "bold",
}));
const Heading = styled("div")(() => ({
  color: "#333333",
  fontWeight: "bold",
  fontSize: "16px",
}));

const rightIconAction = (
  <>
  
    <IconButton>
      <MoreVertIcon />
    </IconButton>
  </>
);



const TaskCard = memo(({ task,handleOpenOverview, stage="",handleOpenDialog,showDialog })=> {

  console.log(task)

  const [status,setStatus] = useState(stage);
  function handleChange(event){
    setStatus(event.target.value)
  }
  
  
  

  return (
    <>
      <Card sx={{ minWidth: 275, m: "8px 1px" }}>
      
      <CardContent sx={{ p: "18px 16px" }}>
        <Box sx={{display:"flex",justifyContent:"space-between"}}>
        <Heading>{task.name}</Heading>

        <Box>

       <Button sx={{mr:1}} onClick={()=>handleOpenOverview(task.id, task.name)}>
          Открыть
       </Button>


        {showDialog ? <IconButton onClick={()=>handleOpenDialog()}>
          <SettingsIcon/>
        </IconButton>
        :
        null  
      }

</Box>


        </Box>
      
       
        <Box sx={{ flexGrow: 1, color: "#333333", m: "20px 0 0" }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={2} sm={4} md={4} >
              <Title>Назначил</Title>
              <SubTitle>{task.assignee}</SubTitle>
            </Grid>
            <Grid item xs={2} sm={4} md={4} >
              <Title>Назначено</Title>
              <SubTitle>{task.assigned_To}</SubTitle>
            </Grid>
            <Grid item xs={2} sm={4} md={4} >
              <Title>Дэдлайн</Title>
              <SubTitle>{task.due_Date}</SubTitle>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
      <CardActions>
      {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Статус</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={status}
        label="Статус"
        onChange={handleChange}
      >
      

        {stages.map((stage,index)=>(
          <Menutask key={index} value={stage.name}>{stage.name}</Menutask>
        ))}

       
     
      </Select>
    </FormControl> */}
      </CardActions>
    </Card>

       <ChangeStatusDialog selectedValue={stage} /> 

    </>

  );
});
export default TaskCard;
