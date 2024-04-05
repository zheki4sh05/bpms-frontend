import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import ToDoList from "./ToDoList";
function AssignmentDescription() {
  return (
    <Container maxWidth="md">
      <Stack direction="row">
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
        </Stack>
        <Stack direction="column" spacing={2} sx={{ mt: 5}}>
          <ToDoList/>
        </Stack>
      </Stack>

      <Box></Box>
    </Container>
  );
}

export default AssignmentDescription;
