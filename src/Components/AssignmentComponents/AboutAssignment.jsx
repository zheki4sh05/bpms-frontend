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
import { getSpecializations } from "../../Store/slices/companySlice";
import { useSelector } from "react-redux";

function AboutAssignment({ assignments,projects=[], specizalizations=[] }) {

  const { data, setDataHandler } = useContext(DialogContext);
  

  const [project, setProject] = useState( data.hasOwnProperty("aboutAssign") ? data.aboutAssign.projectId : 0);
  const specList = useSelector(getSpecializations)
  const [specialization, setSpecizalization] = useState(data.hasOwnProperty("aboutAssign") ? data.aboutAssign.specialization : 0);
  const [show, setShow] = useState(true);
  const [change,setChange] = useState(false);

  const handleProjectChange = (event) => {
    setProject(event.target.value);
    setShow(false);
    setChange(true)
  };
  const handleSpecializationChange = (event) => {
    setSpecizalization(event.target.value);
    setChange(true)
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
      projectId: project,
      specialization
    }});
    setChange(false)

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
            {/* <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              disabled={projects.length<1}
              value={project || ""}
              label="Выбрать проект"
              onChange={handleProjectChange}
              
            >
              {projects.map((item, index) => (
                <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
              ))}
            </Select> */}
            <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={project || ""}
                label="Age"
                onChange={handleProjectChange}
              >
                {projects.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
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
            {/* <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              disabled={show && !specList>0}
              value={specizalization  || ""}
              label="Выбрать специализацию"
              onChange={handleSpecializationChange}

             
            >
              {specList.map((item, index) => (
                <MenuItem value={index.id} key={index}>{item.name}</MenuItem>
              ))}
            </Select> */}
            <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={specialization || ""}
                label="Age"
                onChange={handleSpecializationChange}
              >
                {specList.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
          </FormControl>
          <Box sx={{ mt: 2, display:"flex",alignItems:"center" }}>
            <Button disabled={show} size="small" variant="contained">Подробнее</Button>
          </Box>
          
        </Stack>
              <Box>

                {

                  !(!change || project==0 ||  specialization==0) ? 
                  <Button
                  onClick={handleSubmit}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
      
                    disabled={!change || project==0 ||  specialization==0}
      
                >
                   Сохранить
                </Button>
                :
                null

                }
             
              </Box>
        </Stack>
      </Container>
    </Box>
  );
}


export default AboutAssignment;
