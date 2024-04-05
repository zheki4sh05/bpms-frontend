import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from '@mui/material/Divider';
function AboutAssignment({ projects }) {
  const [age, setAge] = useState("");
  const [show, setShow] = useState(true);

  const handleChange = (event) => {
    setAge(event.target.value);
    setShow(false);
  };
  return (
    <Box sx={{ mt: 5 }}>
      <Container maxWidth="sm">
      <Stack direction="column" spacing={2}>
        
      
        <Stack spacing={2} direction="row">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Выбрать проект
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Выбрать проект"
              onChange={handleChange}
            >
              {projects.map((item, index) => (
                <MenuItem value={index}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ mt: 2, display:"flex",alignItems:"center" }}>
            <Button disabled={show} size="small" variant="contained">Подробнее</Button>
          </Box>
          
        </Stack>
        <Divider orientation="horizontal" flexItem />
        
        <Stack spacing={2} direction="row">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Выбрать специализацию
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Выбрать специализацию"
              onChange={handleChange}

              disabled={show}
            >
              {projects.map((item, index) => (
                <MenuItem value={index}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ mt: 2, display:"flex",alignItems:"center" }}>
            <Button disabled={show} size="small" variant="contained">Подробнее</Button>
          </Box>
          
        </Stack>
              
        </Stack>
      </Container>
    </Box>
  );
}

export default AboutAssignment;
