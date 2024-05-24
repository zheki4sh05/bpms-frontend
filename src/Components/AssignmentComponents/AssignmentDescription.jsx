import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import ToDoList from "./ToDoList";
import { useContext, useEffect, useState } from "react";
import Counter from "./Counter";
import DialogContext from "../DialogContext";
function AssignmentDescription() {

  const [checked,setChecked] = useState(false);

  const [isSubmited, setSubmited] = useState(false)

  const handleClickChecked=()=>{
    console.log(checked)
    setChecked((prevState) => (prevState === false ? true : false));
  }


  const { data, setDataHandler } = useContext(DialogContext);

  const [inputValueName, setInputValueName] = useState(''); 
  const [inputValueDesc, setInputValueDesc] = useState(''); 

  const handleInputChangeName = (e) => {
    setInputValueName(e.target.value);
  };

  const handleInputChangeDesc = (e) => {
    setInputValueDesc(e.target.value);
  };

  useEffect(() => {
    setInputValueName(typeof data.assignDesc!=="undefined" ? data.assignDesc.name : "");
    setInputValueDesc(typeof data.assignDesc!=="undefined" ? data.assignDesc.desc : ""); 
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setDataHandler({...data, assignDesc:{
          ...data.assignDesc,
          name: formData.get("name"),
          desc: formData.get("desc"),
    }});
    setSubmited(true)
  };

  return (
    <Container maxWidth="sm">
     
        <Stack direction="column" spacing={2} sx={{ mt: 5, mr:2 }}>
          {/* <TextField
            id="outlined-basic"
            label="Название поручения"
            variant="outlined"
          />
          <TextField
            id="outlined-multiline-static"
            label="Описание"
            multiline
            rows={4}
          /> */}

<Box component="form" onSubmit={handleSubmit} onChange ={()=>setSubmited(false)}  sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            autoFocus
            id="outlined-basic"
            label="Название поручения"
            variant="outlined"
            sx={{ mb: 2 }}
            value={inputValueName} 
            onChange={handleInputChangeName}
          />
          <TextField
            margin="normal"
            fullWidth
            name="desc"
            id="outlined-multiline-static"
            label="Описание"
            multiline
            rows={4}
            variant="outlined"
            sx={{ mb: 2 }}
            value={inputValueDesc} 
            onChange={handleInputChangeDesc}
          />

          <Button

            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}

            disabled={isSubmited}
          >
            Сохранить
          </Button>
        </Box>


            <FormControlLabel sx={{mt:2}}  control={ <Checkbox checked={!!checked} onChange={handleClickChecked}/>} label="Необходимо прикрепить файлы" />

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
