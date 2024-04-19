import { Grid, TextField } from "@mui/material";
import { useState } from "react";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { userUpdate} from '../../Store/slices/appUserSlice'


import Box from '@mui/material/Box';

import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux'
import DomainNames from "../../Store/DomainNames";
import { useDispatch } from "react-redux";
function AboutUser() {
    const user = useSelector(state => state[DomainNames.app.appUser].user)
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
    dispatch(
        userUpdate({
        name:formData.get('firstname'),
        lastname:formData.get('lastname'),
        surname:formData.get('surname'),
        email:formData.get('email'),
        phone:formData.get('phone'),
        bDay:formData.get('birth'),
      }))

      
    setEdited(false)
  };

//   const [name,setName] = useState('');
//   const [surname,setSurname] = useState('');
//   const [secondname,setSecondname] = useState('');
//   const [email,setEmail] = useState('');
//   const [phone,setPhone] = useState('');
//   const [birthDay,setBirthDay] = useState('');

//   function dispatherEditor(type){
//     switchEdited(true);
//     let value = event.target.value;
//     switch(type){
//         case "name" :{
//             setName(value);
//             break;
//         }
//         case "surname" :{
//             setSurname(value);
//             break;
//         }
//         case "secondname" :{
//             setSecondname(value);
//             break;
//         }
//         case "email" :{
//             setEmail(value);
//             break;
//         }
//         case "phone" :{
//             setPhone(value);
//             break;
//         }
//         case "birth" :{
//             setBirthDay(value);
//             break;
//         }
//     }
    
       
  
//   }

//   const switchEdited = (value) => {
//     setEdited(value);
//   };
const handleFormChange =()=>{
   setEdited(true);

}

  return (
    <>
      {/* <Grid container spacing={1}>

        <Grid item xs={3} >
        <TextField id="outlined-basic" label={inputTypes[0].value} variant="outlined" value={name} onChange={dispatherEditor("name")}/>
        </Grid>


        <Grid item xs={3}>
          <TextField id="outlined-basic" label={inputTypes[1].value} value={surname}  onChange={dispatherEditor("surname")} variant="outlined" />
        </Grid>
        <Grid item xs={3}>
          <TextField id="outlined-basic" label={inputTypes[2].value}  value={secondname}  onChange={dispatherEditor("secondname")} variant="outlined" />
        </Grid>
      </Grid>
      <Grid sx={{ mt: 1 }} container spacing={1}>
        <Grid item xs={3}>
          <TextField id="outlined-basic" label={inputTypes[3].value} value={email} variant="outlined" onChange={dispatherEditor("email")}/>
        </Grid>
        <Grid item xs={3}>
          <TextField id="outlined-basic" label={inputTypes[4].value}  value={phone} variant="outlined" onChange={dispatherEditor("phone")}/>
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="datetime-local"
            value={birthDay}
            onChange={dispatherEditor("birth")}
          />
        </Grid>
      </Grid> */}

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
              sx={{ mt: 3, mb: 2 }}

            >
              Сохранить 
            </Button>
            </Box>
            
       
          </Box>
        </Box>
      
      </Container>
    </ThemeProvider>

    </>
  );
}

export default AboutUser;
