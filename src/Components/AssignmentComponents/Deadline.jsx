import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import WorkersList from "../../Containers/CreateProjects/WorkersList";
import Checkbox from '@mui/material/Checkbox';
import  FormControlLabel  from '@mui/material/FormControlLabel';

function Deadline() {
  return (
    <Container maxWidth="sm">
      <Box sx={{mt:5}}>
        <Stack direction="row" spacing={2}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Начать задачу с 
            </Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="datetime-local"
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>
             Закончить
            </Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="datetime-local"
            />
            <FormControlLabel sx={{ml:2}} control={ <Checkbox  />} label="Это важная задача" />
          </Box>
        </Stack>
      </Box>
      
    </Container>
  );
}

export default Deadline;
