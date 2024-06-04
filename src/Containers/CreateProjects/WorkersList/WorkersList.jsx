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
import { useEffect } from "react";


export default function WorkersList({ dataMembers=[],addAdmin=true}) {
  const { data, setDataHandler } = useContext(DialogContext);

  const [membersList,setMembers] = useState(dataMembers)

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

  function saveWorkers(){
            setDataHandler({
        ...data, members:{
          ...data.members,
          workers
        }
      })
    }
  

  useEffect(() => {
    if(!addAdmin){
      saveWorkers()
    }
  }, [checked]);

  const handleAddWorkers = () => {
   
 

    // if(workers.length!=0){
    //   setWorkers([...workers, ...checked]);
    // }else{
     
    // } 
    

    setWorkers([...workers, ...checked]);

    let mass=[];

    membersList.forEach(w=>{
      checked.forEach(c=>{
        if(w.id!==c.id){
          mass.push(w)
        }
      })
    })
    console.log("mass")
    console.log(mass)
   
    setMembers([...mass])
 
    setChecked([]);
  };

  const handleAddAdmin = () => {

    if(typeof workers.find(item=>item.id==checked[0].id) == "undefined"){
      setLead([checked[0]]);
    }

   setMembers([...membersList.filter(item=>item.id!=checked[0].id)])
   
    setChecked([]);
  };

  const handleSave=()=>{

    if(addAdmin){
      setDataHandler({
        ...data, members:{
          leader:lead,
          workers
        }
      })
    }

    
  }

  const handleDeleteWorker=(worker)=>{
  
        let mass = workers.filter(item=>item.id!==worker.id)
    
        setMembers([...membersList, worker])

        setWorkers([...mass])
      
  }
  const handleDeleteLeader=(leader)=>{
  
      let mass = lead.filter(item=>item.id!=leader.id)
      setLead([...mass])
      setMembers([...membersList, leader])
  }

  return (
    <Box sx={{display:"flex",flexDirection:"column"}}>
      <List
        dense
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      >
        {membersList.map((value, index) => {
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
        {addAdmin ? <Box>
      <Divider/>
        <ProjectWorkers data={lead} title={"Руководитель"} text={"Руководитель не выбран"} handleDeleteUser={handleDeleteLeader}/>

        {lead.length == 0? (
          <Button size="small" onClick={handleAddAdmin}>Добавить</Button>
        ) : (
          <></>
        )}




      </Box>
      : null}
      
   
      <Box sx={{mt:1}}>
        <ProjectWorkers data={workers} title={"Сотрудники"} text={"Сотрудники не выбраны"} handleDeleteUser={handleDeleteWorker}/>

    
        <Button size="small" onClick={handleAddWorkers}>Добавить</Button>
      </Box>
      {
        (lead.length!=0 && addAdmin) ?
        <Button sx={{mt:2}} fullWidth variant="contained" size="medium" onClick={handleSave}>
        Сохранить
      </Button>
      :
      null
      }
  
    </Box>
  );
}
