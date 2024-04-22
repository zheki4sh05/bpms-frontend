import { CircularProgress, Grid, TextField } from "@mui/material";
import { useState } from "react";
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { getToken, updateUserData, userUpdate} from '../../Store/slices/appUserSlice'


import Box from '@mui/material/Box';

import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux'
import DomainNames from "../../Store/DomainNames";
import { useDispatch } from "react-redux";
import statusTypes from "../../API/status";
import CustomCreateAlert from "../CustomCreateAlert";
import { getErrorName } from "../../Util/ErrorTypes";
function AboutUser() {
  const [data,setData] = useState({});
  const user = useSelector(state => state[DomainNames.app.appUser].user)
  const statusUpdated = useSelector(state=>state[DomainNames.app.appUser].updated)
  const error = useSelector(state=>state[DomainNames.app.appUser].error)
  const token = useSelector(getToken)
const defaultTheme = createTheme();
const dispatch = useDispatch()

//   const inputTypes = [
//     {
//         type:"name",
//         value:"Имя"
//     },
//     {
//         type:"surname",
//         value:"Отчество"
//     },
//     {
//         type:"secondname",
//         value:"Фамилия"
//     },
//     {
//         type:"email",
//         value:"email"
//     },
//     {
//         type:"phone",
//         value:"Номер телефона"
//     },
//     {
//         type:"birth",
//         value:"День рождения"
//     }
  
    
//   ];
 
  const [edited, setEdited] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
   
    const userData = {
      name:formData.get('firstname'),
      lastname:formData.get('lastname'),
      surname:formData.get('surname'),
      email:formData.get('email'),
      phone:formData.get('phone'),
      bDay:formData.get('birth'),
    }
    setData(userData);
    dispatch(updateUserData({
      user:{...userData},
      token
    }     
      
  ))
    
  };

  let updatedResultContent;

  if(statusUpdated===statusTypes.failed){
    updatedResultContent = <CustomCreateAlert
      messageText={`Ошибка обновления. ${getErrorName('any',error.code)}`}
      duration={2000}
      userSeverity={statusTypes.error}

    />
  }else if(statusUpdated===statusTypes.succeeded){
    updatedResultContent = <CustomCreateAlert
    messageText={'Данные успешно обновлены'}
    duration={1500}
    userSeverity={"success"}

  />

    setEdited(false);
    dispatch(
      userUpdate({
     ...data
    }))
  }else if(statusUpdated===statusTypes.loading){
    updatedResultContent = <CircularProgress />
  }


const handleFormChange =()=>{
   setEdited(true);

}

  return (
    <>


<ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
       
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }} onChange={handleFormChange}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                 
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label="Имя"
                  defaultValue={user.name}
                  
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  id="surname"
                  label="Отчество"
                  name="surname"
                  defaultValue={user.surname}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Фамилия"
                  name="lastname"
                  defaultValue={user.lastname}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="email"
                  name="email"
                  defaultValue={user.email}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="Телефон"
                  type="phone"
                  id="phone" 
                  defaultValue={user.phone}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
              <TextField
              id="outlined-basic"
              variant="outlined"
              type="datetime-local"
              name="birth"
              defaultValue={user.bDay}
            />
              </Grid>
              
            </Grid>
            <Box>
            <Button
              type="submit"
            disabled={!edited}
              variant="contained"
              sx={{ mt: 3, mb: 2,display:"flex",flexDirection:"column" }}

            >
              Сохранить 
            </Button>
            {updatedResultContent}
            </Box>
            
       
          </Box>
        </Box>
      
      </Container>
    </ThemeProvider>

    </>
  );
}

export default AboutUser;
