import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { TwitterPicker } from "react-color";

function ProjectInfo({project}) {
console.log(project)
const [color,setColor] = useState();
const [startDate,setStartDate] = useState(project.createdAt);
const [finishDate,setFinishDate] = useState(project.deadline);

const handleChangeColor=(value)=>{
  setColor(value.hex);
}

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);


  };
  const handleStartDate=(event)=>{

    setStartDate(event.target.value)

  }
  const handleFinishDate=(event)=>{
    
    setFinishDate(event.target.value)

  }
  const defaultTheme = createTheme();
  return (
    <ThemeProvider   theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box component="form" onSubmit={handleSubmit} sx={{display: "flex", flexDirection: "column" , mt: 1 }}>

            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Название проекта"
              name="name"
              defaultValue={project.name}
            />
            <TextField
              margin="normal"
              fullWidth
              name="desc"
              label="Описание проекта"
              id="desc"
              multiline
              rows={4}
              defaultValue ={project.description}
            />
       
          <Box sx={{mt:2}}>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Начало проекта
              </Typography>
              <TextField
                id="start_time"
                type="datetime-local"
                required
               // onChange={handleStartDate}
               onChange={handleStartDate} 
               value={startDate}
    
              />
            </Box>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Конец проекта
              </Typography>
              <TextField
                id="finish_time"
                type="datetime-local"
                required
                onChange={handleFinishDate}
                value={finishDate}
              />
            </Box>
          </Box>
          <Box>
            <Box sx={{ maxWidth: "200px",mt:3 }}>

              <TwitterPicker id="color" onChangeComplete={handleChangeColor} />
            </Box>
          </Box>
          <Box>
            <Button
              type="submit"
              // disabled={!edited}
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              Сохранить
            </Button>
           
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default ProjectInfo;
