import { Box, Container, TextField } from "@mui/material";
import ColorInput from "./ColorInput";
import FileImageInput from "./FileImageInput";

function AboutProject() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt:3
        }}
        
      >
        <TextField
          id="outlined-basic"
          label="Название проекта"
          variant="outlined"
          required={true}
          sx={{mb:2}}
        />
        <TextField
          id="outlined-multiline-static"
          label="Описание"
          multiline
          rows={4}
          variant="outlined"
          sx={{mb:2}}
        />
        <ColorInput />
        {/* <FileImageInput /> */}
      </Box>{" "}
      
    </Container>
  );
}

export default AboutProject;
