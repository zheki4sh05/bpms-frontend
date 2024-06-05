import { Box, Container, Divider, MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";

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
            default : {
                return "Приостановлено";
            }


        }

    }

    const statuses = assignmentStatus.statusNames.map(item=>getStatusName(item));

    console.log(assignmentStatus.statusNames)

    function getIndex(){
        for(let i=0; i < assignmentStatus.statusNames.length;i++){
      
            if(assignmentStatus.statusNames[i]==assignment.status){

                    return i

                }
        }
    }

    const [status,setStatus] = useState(getIndex());

    console.log(assignment.status)

    const handleStatusChange=()=>{


        console.log(event.target.value)
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

        <Typography sx={{mt:2}}>Прикреплено файлов</Typography>
        <Divider />




      </Container>
    </Box>
  );
}

export default AssignmentWorkResult;
