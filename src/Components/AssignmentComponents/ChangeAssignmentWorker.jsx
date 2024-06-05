import { Avatar, Box, Button, Container, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchRelevantWorkers, getRelevantStatus, getRelevantWorkers } from "../../Store/slices/workersSlice";
import { useDispatch } from "react-redux";
import { getToken } from "../../Store/slices/appUserSlice";
import { setSelectedTask, updateAssignmentWorker } from "../../Store/slices/assignmentSlice";

function ChangeAssignmentWorker({assignment,assignmentStatus}) {

    const [save, setSave] = useState(true);

    const [showAll, setState] = useState(false);
         
    const relevantWorkers = useSelector(getRelevantWorkers).filter(item=>item.id!=assignmentStatus.viewUserAsWorker.id);

    const [selectedWorkers, setWorker] = useState([assignmentStatus.viewUserAsWorker]);
  
    
    const token = useSelector(getToken);
  
    const dispatch = useDispatch();
  
    function makeRequest() {

      dispatch(
        fetchRelevantWorkers(
        
          {
            data: {
              projectId: assignment.projectId,
              deadline: assignment.deadline,
              specialization: assignmentStatus.viewUserAsWorker.spec,
              start: assignment.createdAt },
                  token,
          }
  
  
      )
      );
    }


        
    function getWorkers(status) {
  
      return status ? [...relevantWorkers, ...selectedWorkers] : selectedWorkers;
    }
  
    const handleShowAll = () => {
      setState((prevState) => (prevState === false ? true : false));
    };

    useEffect(()=>{
        if(showAll){
            makeRequest()
        }
    },[showAll])
  
    const setHandler = () => {
      setSave(true);
      
      dispatch(updateAssignmentWorker({data:{
            newWorker:selectedWorkers,
            spec:selectedWorkers.spec,
            role:selectedWorkers.role,
            assignmentId:assignment.id
      },
    token
    }))

    };


     function handleReset(){
        setSave(true)
        setWorker([assignmentStatus.viewUserAsWorker])
    }



    return ( <Container maxWidth={"sm"} sx={{ mt: 5 }}>
   
 
        <List
          dense
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {getWorkers(showAll).map((value, index) => {
            return (
              <ListItem
                key={index}
                secondaryAction={
                  // <Checkbox
                  //   edge="end"
                  //   onChange={handleToggle(value)}
                  //   checked={checked.indexOf(value) !== -1}
                  //   inputProps={{ "aria-labelledby": labelId }}
                  // />

                  <Button
                    edge="end"
                    onClick={() => {
                    
                      if(selectedWorkers[0].id == value.id ){
                        setWorker([]);
                      }else{
                        setWorker([value])
                      }  

                    
                      setSave(false);
                    }}
                  >
                    {selectedWorkers[0].id == value.id ? "Назначено" : "Выбрать"}
                  </Button>
                }
                disablePadding
              >
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar n°${value + 1}`}
                      src={`/static/images/avatar/${value + 1}.jpg`}
                    />
                  </ListItemAvatar>
                  <Box>
                    <ListItemText
                      id={index}
                      primary={value.firstname + " " + value.lastname}
                    />
                    <ListItemText id={index} primary={value.email} />
                  </Box>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        {
            relevantWorkers.length<1 && showAll? 
            <Typography>Более подходящих сотрудников под эту специализацию нет</Typography>
        : null
        }
        <Box sx={{display:"flex",justifyContent:"space-between"}}>
            <Box>
                <Button size={"small"} onClick={handleShowAll}>{showAll ? "Скрыть" : "Показать еще "}</Button>

                {!save ? 

                  <Button size={"small"} onClick={handleReset}>Отмена</Button>
                  : 
                null
                }
              
            </Box>
       
        <Button
      disabled={save}
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      onClick={setHandler}
    >
      Сохранить
    </Button>
        </Box>
       

   
  </Container> );
}

export default ChangeAssignmentWorker;