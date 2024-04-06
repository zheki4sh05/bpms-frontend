import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import ToDoList from "./ToDoList";
import { useState } from "react";
import Counter from "./Counter";
function AssignmentDescription() {

  const [checked,setChecked] = useState(false);

  const handleClickChecked=()=>{
    console.log(checked)
    setChecked((prevState) => (prevState === false ? true : false));
  }

  return (
    <Container maxWidth="sm">
     
        <Stack direction="column" spacing={2} sx={{ mt: 5, mr:2 }}>
          <TextField
            id="outlined-basic"
            label="Название поручения"
            variant="outlined"
          />
          <TextField
            id="outlined-multiline-static"
            label="Описание"
            multiline
            rows={4}
          />

            <FormControlLabel sx={{mt:2}}  control={ <Checkbox chechecked={checked} onChange={handleClickChecked}/>} label="Необходимо прикрепить файлы" />

            {
              checked ?
              <Counter/>
              :
              null

            }
        </Stack>
       

    </Container>
  );
}

export default AssignmentDescription;
