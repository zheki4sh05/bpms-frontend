import { CheckBox } from "@mui/icons-material";
import { Box, Button, Divider, FormControlLabel } from "@mui/material";
import { useState } from "react";
import ToDoList from "./ToDoList";
import { useContext } from "react";
import DialogContext from "../DialogContext";

function AssignmnetTasks() {

const { data, setDataHandler } = useContext(DialogContext);
const [show,setShow] = useState(true)

const dataHandler=(todos)=>{
    setDataHandler({...data, tasks:
        todos
      });
      if(todos.length>0){setShow((prevState) => (prevState === false ? true : false));}
}


  return (
    <Box>
      <ToDoList handleTodos={dataHandler} initialList={data.tasks}/>
      <Divider />

      {show ? <Button
        
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={()=>{dataHandler([])}}
        >
        Разбить потом
    </Button>
    :
    null
}

    

    
    </Box>
  );
}

export default AssignmnetTasks;
