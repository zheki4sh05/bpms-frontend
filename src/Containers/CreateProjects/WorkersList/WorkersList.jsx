import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import { Box, Button, Divider } from "@mui/material";
import { useState } from "react";
import ProjectWorkers from './ProjectWorkers';
import { useContext } from "react";
import DialogContext from "../../../Components/DialogContext";


export default function WorkersList({ dataMembers }) {
  const { data, setDataHandler } = useContext(DialogContext);
  const [checked, setChecked] = useState([]);

  const [lead, setLead] = useState([]);

  const [workers, setWorkers] = useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    console.log(checked)
  };

  const handleAddWorkers = () => {
    setWorkers(checked);
 
    setChecked([]);
  };

  const handleAddAdmin = () => {
    setLead(checked);
   
    setChecked([]);
  };

  const handleSave=()=>{
    setDataHandler({
      ...data, members:{
        leader:lead,
        workers
      }
    })
  }

  return (
    <Box sx={{display:"flex",flexDirection:"column"}}>
      <List
        dense
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      >
        {dataMembers.map((value, index) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <ListItem
              key={index}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleToggle(value)}
                  checked={checked.indexOf(value) !== -1}
                  inputProps={{ "aria-labelledby": labelId }}
                />
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
                    id={labelId}
                    primary={value.firstname + " " + value.lastname}
                  />
                  <ListItemText id={labelId} primary={value.email} />
                </Box>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box>
      <Divider/>
        <ProjectWorkers data={lead} title={"Руководитель"} text={"Руководитель не выбран"} />

        {lead.length == 0? (
          <Button size="small" onClick={handleAddAdmin}>Добавить</Button>
        ) : (
          <></>
        )}




      </Box>
   
      <Box sx={{mt:1}}>
        <ProjectWorkers data={workers} title={"Сотрудники"} text={"Сотрудники не выбраны"} />

    
        <Button size="small" onClick={handleAddWorkers}>Добавить</Button>
      </Box>
      {
        lead.length!=0 ?
        <Button sx={{mt:2}} fullWidth variant="contained" size="medium" onClick={handleSave}>
        Сохранить
      </Button>
      :
      null
      }
  
    </Box>
  );
}
