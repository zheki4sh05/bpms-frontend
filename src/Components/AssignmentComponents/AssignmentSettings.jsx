import { Box, Button, Container, Divider, FormControlLabel, IconButton, List, ListItem, Stack, TextField, Typography } from "@mui/material";
import AssignmentDescription from "./AssignmentDescription";
import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getReports } from "../../Store/slices/documentsSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from "react-redux";
import DomainNames from "../../Store/DomainNames";
import { getToken } from "../../Store/slices/appUserSlice";
import { getSpecializations } from "../../Store/slices/companySlice";
import { getAddedStatus } from "../../Store/slices/projectSlice";
import statusTypes from "../../API/status";
import { delDocFromAssignment, getDelDocStatus, updateAssignment } from "../../Store/slices/assignmentSlice";
const AssignmentSettings = ({ assignment,assignmentStatus, requestHandler })=> {
    const dispatch = useDispatch();

    const status = useSelector(getAddedStatus)
    const docDelStatus = useSelector(getDelDocStatus)

    const specList = useSelector(getSpecializations)

    const [specName, setName] = useState();

    // let specName = 

    useEffect(()=>{
        setName(specList.find(item=>item.id == assignmentStatus.viewUserAsWorker.spec).name)
    },[status])
    

  const [isSubmited, setSubmited] = useState(false);

  const [inputValueName, setInputValueName] = useState("");
  const [inputValueDesc, setInputValueDesc] = useState("");

  const handleInputChangeName = (e) => {
    setInputValueName(e.target.value);
  };

  const handleInputChangeDesc = (e) => {
    setInputValueDesc(e.target.value);
  };

  useEffect(() => {
    setInputValueName(assignment.name);
    setInputValueDesc(assignment.description);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

      dispatch(
        updateAssignment({
            data:{
                id:assignment.id,
                name: formData.get("name"),
                desc: formData.get("desc"),
                deadline:assignment.deadline,
                startAt: assignment.startAt,
                status:assignment.status,
                newStage:assignment.stageId
            },
            token
        })
      )
    setSubmited(true);
  };


  const company = useSelector(
    (state) => state[DomainNames.company].userCompany.id
  );
  const [reports,setReports] = useState(assignmentStatus.reports || []) ;
  const [documents,setDocuments] = useState(assignmentStatus.documents || []);
 
  const token = useSelector(getToken)


  // const handleItemSelectionToggle = (event, itemId, isSelected) => {
  //   if (isSelected) {
  //     let currentState = [...lastSelectedItem];

  //     currentState.push(itemId);

  //     setLastSelectedItem(currentState);
  //   }
  // };

 function handleDelReport(id){


    
    dispatch(delDocFromAssignment({
        data:{
            docId:id
        },
        token
    }))
    if(docDelStatus==statusTypes.succeeded){
        requestHandler()
    }
       
 }
 function handleDelDoc(id){
    dispatch(delDocFromAssignment({
        data:{
            docId:id
        },
        token
    }))
 }


 

// useEffect(()=>{
//     console.log("111111111111")
    
// },[docDelStatus])
console.log("settings")
  return (
    <Box>
      <Container maxWidth="sm">
        <Typography>Специализация</Typography>
        <Divider/>
       <Typography variant="subtitle1" sx={{mb:2,mt:1}}>{specName}</Typography>


        <Typography>Редактирование описания</Typography>
        <Divider/>
        <Stack direction="column" spacing={2} sx={{ mr: 2 }}>
     
         <Box
            component="form"
            onSubmit={handleSubmit}
            onChange={() => setSubmited(false)}
            sx={{ mt: 1 }}
          >
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
        </Stack>
        <Typography>Прикрепленные шаблоны отчетов. Прикреплено {reports.length}</Typography>
        <Divider/>
        <Stack spacing={2}>
                  <List
                    dense
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                  >
                    {reports.map((value,index) => {
                     
                      return (
                        <ListItem
                          key={index}
                        
                          
                        >
                        <FormControlLabel
                          
                            control={<IconButton onClick={()=>handleDelReport(value.id)} ><DeleteIcon/><Typography>&nbsp;Открепить</Typography></IconButton>}
                            label={value.name + "."+value.format}
                          
                          />
                        </ListItem>
                      );
                    })}
                  </List>     
                
                

          </Stack>
          <Typography>Прикрепленные документы. Прикреплено {documents.length}</Typography>
          <Stack spacing={2}>
                  <List
                    dense
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                  >
                    {documents.map((value,index) => {
                     
                      return (
                        <ListItem
                          key={index}
                        
                          
                        >
                        <FormControlLabel
                          
                            control={<IconButton onClick={()=>handleDelDoc(value.id)}><DeleteIcon/><Typography>&nbsp;Открепить</Typography></IconButton>}
                            label={value.name + "."+value.format}
                          
                          />
                        </ListItem>
                      );
                    })}
                  </List>     
                
                

          </Stack>
        <Divider/>
      </Container>
    </Box>
  );
}

export default AssignmentSettings;
