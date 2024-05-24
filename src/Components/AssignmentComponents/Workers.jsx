import Container from "@mui/material/Container";


import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";

import { useContext, useEffect, useState } from "react";
import { Divider, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import { ListItemButton } from "@mui/material";

import { useSelector } from "react-redux";
import DialogContext from "../DialogContext";
import { getToken } from "../../Store/slices/appUserSlice";
import { fetchRelevantWorkers, getAllProjectMembers, getRelevantWorkers } from "../../Store/slices/workersSlice";
import { useDispatch } from "react-redux";

function Workers() {

  const [save,setSave] = useState(false);

  const [showAll,setState] = useState(false);

  const [selectedWorkers,setWorker] = useState(new Set());

  const {data,setDataHandler} = useContext(DialogContext);

  const relevantWorkers = useSelector(getRelevantWorkers);

  const allWorkers = useSelector(state => getAllProjectMembers(state, data.aboutAssign ? data.aboutAssign.project.id : 0)) | [];

  const token = useSelector(getToken)

  const dispatch = useDispatch()

  useEffect(() => {

  if(data.aboutAssign){
    dispatch(fetchRelevantWorkers({data:{
      projectId: data.aboutAssign.project
   },
   token}));
  }


  }, []);
 

  function getWorkers(status){
      return status ? relevantWorkers.concat(allWorkers) : relevantWorkers
  }

  const handleShowAll =()=>{
    setState((prevState) => (prevState === false ? true : false));
  }

  const setHandler=()=>{
    setSave(true)
    setDataHandler({...data, workers:selectedWorkers})
  }

  return (
    <Container maxWidth={"sm"} sx={{ mt: 5 }}>
      {/* <Stack direction={"row"}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField id="outlined-basic" label="Поиск" variant="outlined" />

          <Box sx={{display:"flex", flexDirection:"row", alignItems:"center"}}>
            <ListItemButton component="a" sx={{ mt: 2 }}>
              <Tooltip title="Нажмит, чтобы добавить">
                <ListItemText primary="Spam" />
              </Tooltip>
            </ListItemButton>
            <Box>
              <IconButton children={<MoreVertIcon/>} />
            </Box>
            
          </Box>
        </Box>
        <Stack direction={"column"} sx={{ ml: 5 }}>
          <Typography variant="subtitle2" gutterBottom>
            Исполнители:
          </Typography>
          <List>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Single-line item"
                secondary={secondary ? "Secondary text" : null}
              />
            </ListItem>
          </List>
        </Stack>
      </Stack> */}


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

                <Button  edge="end" onClick={()=>{setWorker(prevState=>[...prevState, value]);  setSave(false)}}>
                      Выбрать

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
        <Button onClick={handleShowAll}>Показать всех</Button>
  
      <Divider/>
      <Button
            disabled={!save}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={setHandler}
          >
            Сохранить
          </Button>
    </Container>
  );
}

export default Workers;
