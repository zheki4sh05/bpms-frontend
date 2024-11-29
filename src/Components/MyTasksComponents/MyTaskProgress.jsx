import {
  Box,
  Button,
  Divider,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getProjects } from "../../Store/slices/projectSlice";
import { getToken } from "../../Store/slices/appUserSlice";
import { changeAssignmentStatus } from "../../Store/slices/assignmentSlice";
import { useDispatch } from "react-redux";
import { getStages } from './../../Store/slices/appUserSlice';

function MyTaskProgress({ task, assignmentStatus }) {
  console.log(assignmentStatus)
  const token = useSelector(getToken)

  const dispatch = useDispatch()

  function getStatusName(status) {
    switch (status) {
      case "create": {
        return "Назначено";
      }
      case "stop": {
        return "Приостановлено";
      }
      case "reject": {
        return "Отклонено";
      }
      case "done": {
        return "Выполнено";
      }
      case "accepted": {
        return "Принято";
      }
      default: {
        return "Приостановлено";
      }
    }
  }

  const statuses = assignmentStatus.statusNames.map((item) =>
    getStatusName(item)
  );

  const projectStages = useSelector(getStages)





  function getIndex() {
    for (let i = 0; i < assignmentStatus.statusNames.length; i++) {
      if (assignmentStatus.statusNames[i] == task.status) {
        return i;
      }
    }
  }

  const [status, setStatus] = useState(getIndex());
  console.log(status)
  const [stageId, setStageId] = useState(projectStages[0].id);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleAccept=()=>{
    dispatch(changeAssignmentStatus({data:{
      assignmentId:task.id,
      curStatus:task.status,
      newStatus:"accepted"
    },
    token
  
  }))
  }

  const [isDone,setIsDone] = useState(false)

  const handleStageChange = (event) => {
    setStageId(event.target.value);
  };

  const handleDoneTask=()=>{

      // if()

      setIsDone(true)
  }

  useEffect(()=>{

    if(isDone){
      console.log("save")
      dispatch(changeAssignmentStatus({data:{
        assignmentId:task.id,
        curStatus:task.status,
        newStatus:"done"
      },
      token
    
    }))
    }

  },[isDone])


  function getStatusContent() {
    if (assignmentStatus.statusNames[status] == "create") {
      return (
        <Box sx={{ mt: 1, mb: 2 }}>
          <Button
            variant="contained"
            color="success"
            sx={{ mr: 2 }}
            size="small"
            onClick={handleAccept}
          >
            Принять поручение
          </Button>
          <Button variant="outlined" color="error" size="small">
            Отклонить
          </Button>
        </Box>
      );
    } else if (assignmentStatus.statusNames[status] == "accepted") {
      return <Box>
        <Typography variant="h6" gutterBottom>
          {getStatusName(assignmentStatus.statusNames[status])}
        </Typography>

        {}

        <Button variant="contained" color="success" disabled={isDone} onClick={handleDoneTask}>
          Выполнить поручение
        </Button>
      </Box>;
    } else if (assignmentStatus.statusNames[status] == "done") {
      return <Typography variant="h6" gutterBottom>
        Задача выполнена!
      </Typography>;
    }
  }

  function getStages2() {

    if (assignmentStatus.statusNames[status] == "create") {
      return (
        <Box sx={{ mt: 1, mb: 2 }}>
          <Typography>
             №{projectStages.find((item) => item.id == stageId).order} - {projectStages.find((item) => item.id == stageId).name}
            
          </Typography>
        </Box>
      );
    } else if (assignmentStatus.statusNames[status] == "accepted") {
      return (
      <Box>
       <Typography>
        
            {projectStages.find((item) => item.id == stageId).name}
        </Typography>
        
      </Box>
        );
    } else if (assignmentStatus.statusNames[status] == "done") {
      <Box>
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
      </Box>;
    }
  }

  return (
    <Box>
      <Typography>Текущий статус</Typography>
      <Divider />
      {getStatusContent()}

      {/* <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={statuses.indexOf(
          getStatusName(assignmentStatus.statusNames[status])
        )}
        label="Age"
        onChange={handleStatusChange}
      >
        {statuses.map((item, index) => (
          <MenuItem key={index} value={index}>
            {item}
          </MenuItem>
        ))}
      </Select> */}

      <Typography sx={{ mt: 2 }}>Стадия выполнения</Typography>
      <Divider />
      {getStages2()}

      {/* <Select
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
      </Select> */}
    </Box>
  );
}

export default MyTaskProgress;
