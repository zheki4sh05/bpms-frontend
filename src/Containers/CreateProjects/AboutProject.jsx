import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import ColorInput from "./ColorInput";
import FileImageInput from "./FileImageInput";
import { useContext, useEffect, useState } from "react";
import DialogContext from "./../../Components/DialogContext";
const defaultTheme = createTheme();
function AboutProject() {
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
    setInputValueName(typeof data.aboutProject!=="undefined" ? data.aboutProject.name : " ");
    setInputValueDesc(typeof data.aboutProject!=="undefined" ? data.aboutProject.desc : " "); 
  }, [data]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setDataHandler({...data, aboutProject:{
          ...data.aboutProject,
          name: formData.get("name"),
          desc: formData.get("desc"),
    }});
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            autoFocus
            id="outlined-basic"
            label="Название проекта"
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
          {/* <ColorInput /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Сохранить
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default AboutProject;
