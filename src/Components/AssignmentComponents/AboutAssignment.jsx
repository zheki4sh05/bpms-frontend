import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useContext, useState } from "react";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from '@mui/material/Divider';
import DialogContext from "../DialogContext";

function AboutAssignment({ assignments,projects=[], specizalizations=[] }) {

  const { data, setDataHandler } = useContext(DialogContext);
  

  const [project, setProject] = useState(null);
  const [specizalization, setSpecizalization] = useState("");
  const [show, setShow] = useState(true);

  const handleProjectChange = (event) => {
    setProject(event.target.value);
    setShow(false);
  };
  const handleSpecializationChange = (event) => {
    setSpecizalization(event.target.value);
    
  };

  // useEffect(() => {
  //   setInputValueName(typeof data.aboutProject!=="undefined" ? data.aboutProject.name : " ");
  //   setInputValueDesc(typeof data.aboutProject!=="undefined" ? data.aboutProject.desc : " "); 
  // }, [data]);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);
  //   setDataHandler({...data, aboutProject:{
  //         ...data.aboutProject,
  //         name: formData.get("name"),
  //         desc: formData.get("desc"),
  //   }});
  // }

  const handleSubmit = ()=>{

    setDataHandler({...data, aboutAssign:{
      projectId: project.id,
      specizalization
    }});

  }



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
              value={projects.length>0 ? projects[0].name : ""}
              label="Выбрать проект"
              onChange={handleProjectChange}
            >
              {projects.map((item, index) => (
                <MenuItem value={index}>{item.name}</MenuItem>
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
              value={specizalizations[0]}
              label="Выбрать специализацию"
              onChange={handleSpecializationChange}

              disabled={show}
            >
              {projects.map((item, index) => (
                <MenuItem value={index.name} key={index}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ mt: 2, display:"flex",alignItems:"center" }}>
            <Button disabled={show} size="small" variant="contained">Подробнее</Button>
          </Box>
          
        </Stack>
              <Box>
              <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}

              disabled={project==null && specizalization===""}

          >
            Сохранить
          </Button>
              </Box>
        </Stack>
      </Container>
    </Box>
  );
}


export default AboutAssignment;
