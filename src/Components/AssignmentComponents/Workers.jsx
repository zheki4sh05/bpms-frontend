import Container from "@mui/material/Container";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";

import { useContext, useEffect, useState } from "react";
import { Divider, TextField, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import { ListItemButton } from "@mui/material";

import { useSelector } from "react-redux";
import DialogContext from "../DialogContext";
import { getToken } from "../../Store/slices/appUserSlice";
import {
  fetchRelevantWorkers,
  getAllProjectMembers,
  getRelevantStatus,
  getRelevantWorkers,
} from "../../Store/slices/workersSlice";
import { useDispatch } from "react-redux";
import { getProjectsResults } from "../../Store/slices/projectSlice";
import statusTypes from "../../API/status";

function Workers() {
  const [save, setSave] = useState(false);

  const [showAll, setState] = useState(false);

  

  const { data, setDataHandler } = useContext(DialogContext);

  const relevantWorkers = useSelector(getRelevantWorkers);
  const [selectedWorkers, setWorker] = useState( data.hasOwnProperty("workers") ? data.workers : {id:0});

  const relevStatus = useSelector(getRelevantStatus);

  const allWorkers = useSelector(getWorkers) | [];

  const projectsStatuses = useSelector(getProjectsResults);

  const token = useSelector(getToken);

  const dispatch = useDispatch();

  function makeRequest() {
    console.log(data)
    dispatch(
      fetchRelevantWorkers(
      
        {
          data: {
            projectId: data.aboutAssign.projectId,
            deadline: data.deadline.finishDate,
            specialization: data.aboutAssign.specialization,
            start: data.deadline.startDate },
                token,
        }


    )
    );
  }

  useEffect(() => {
    if (relevStatus == statusTypes.succeeded) {
      setWorker(relevantWorkers);
    }
  }, [relevStatus]);

  useEffect(() => {
    if (data.hasOwnProperty("aboutAssign") && data.hasOwnProperty("deadline")) {
      makeRequest();
    }
  }, []);
  function getWorkers(status) {

    return status ? relevantWorkers.concat([]) : relevantWorkers;
  }

  const handleShowAll = () => {
    setState((prevState) => (prevState === false ? true : false));
  };

  const setHandler = () => {
    setSave(true);
    setDataHandler({ ...data, workers: selectedWorkers });
  };
  console.log("selectedWorkers")
  console.log(selectedWorkers)

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
      {data.hasOwnProperty("aboutAssign") && data.hasOwnProperty("deadline")? (
        <>
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
                        setWorker(value);
                        setSave(false);
                      }}
                    >
                      {selectedWorkers.id == value.id ? "Убрать" : "Выбрать"}
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
        </>
      ) : (
        <Typography>Не выбраны предыдущие параметры</Typography>
      )}

      <Divider />
      <Button
        disabled={save}
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
