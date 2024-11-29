import { Box, Button, Container, Divider, MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getProjects } from "../../Store/slices/projectSlice";
import { getStages } from "../../Store/slices/appUserSlice";

function AssignmentWorkResult({assignment, assignmentStatus}) {

    function getStatusName(status){
        switch (status) {
            case "create" : {
                return "Назначено";
            }
            case "stop" : {
                return "Приостановлено";
            }
            case "reject" : {
                return "Отклонено";
            }
            case "done" : {
                return "Выполнено";
            }
            case "accepted" : {
              return "Принято";
          }
            default : {
                return "Приостановлено";
            }


        }

    }

    const statuses = assignmentStatus.statusNames.map(item=>getStatusName(item));

    const projectStages = useSelector(getStages)



    function getIndex(){
        for(let i=0; i < assignmentStatus.statusNames.length;i++){
      
            if(assignmentStatus.statusNames[i]==assignment.status){

                    return i

                }
        }
    }

    const [status,setStatus] = useState(getIndex());

    const[stageId,setStageId] = useState(projectStages[0].id);



    const handleStatusChange=(event)=>{


       

        setStatus(event.target.value)
    }

    const handleStageChange=(event)=>{
      setStageId(event.target.value)
    }

 
  return (
    <Box>
      <Container maxWidth="sm">
        <Typography>Текущий статус</Typography>
        <Divider />

        <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={statuses.indexOf(getStatusName(assignmentStatus.statusNames[status]))}
                label="Age"
                onChange={handleStatusChange}
              >
                {statuses.map((item, index) => (
                  <MenuItem key={index} value={index}>
                    {item}
                  </MenuItem>
                ))}
              </Select>

            


         
        <Typography sx={{mt:2}}>Стадия выполнения</Typography>
        <Divider /> 
        
        <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={stageId}
                label="Age"
                onChange={handleStageChange}
              >
                {projectStages.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    №{item.order} - {item.name} 
                  </MenuItem>
                ))}
            </Select>

        




        <Typography sx={{mt:2}}>Прикреплено файлов</Typography>
        <Divider />
       




      </Container>
    </Box>
  );
}

export default AssignmentWorkResult;
