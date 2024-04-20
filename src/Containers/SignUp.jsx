import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux'
import {userCreate} from '../Store/slices/appUserSlice'
import DomainNames from '../Store/DomainNames';
import { CircularProgress } from '@mui/material';
import CustomCreateAlert from '../Components/CustomCreateAlert';
import { useSelector } from 'react-redux';
import {addNewUser} from '../Store/slices/appUserSlice'
import { useState } from 'react';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const defaultTheme = createTheme();

export default function SignUp({onTogglePage,toggleState}) {


  const [data,setData] = useState({})

  const dispatch = useDispatch();



   function makeRequest(formData){

    dispatch(addNewUser({
      firstname:formData.get('firstname'),
      lastname:formData.get('lastname'),
      email:formData.get('email'),
      password:formData.get('password')
    }))
  
  }

//   if(userStatus ==='loading'){
//     authResultContent =  <CircularProgress />
  
//   }else if (userStatus === 'succeeded') {

//     authResultContent = <CustomCreateAlert        
//         messageText="Регистрация прошла успешно"
//         duration={alertDuration}
//         userSeverity="success"
//     />

//     dispatch(
//       userCreate({
//       name:data.get('firstname'),
//       lastname:data.get('lastname'),
//       surname:'',
//       email:data.get('email'),
//       phone:'',
//       bDay:'',
//     })
//   );
    
//     setTimeout(function() {
//       toggleState();
//   }, alertDuration);

//   }else if (userStatus === 'failed') {
//     authResultContent = <CustomCreateAlert        
//     messageText={"Ошибка регистрации. ".concat(error)}
//     duration={6000}
//     userSeverity="error"
// />
//   }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setData(data);
    makeRequest(data)
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Регистрация
          </Typography>
          <Box component="form"  onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  required={true}
                  fullWidth
                  id="firstname"
                  label="Имя"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                   required={true}
                  fullWidth
                  id="lastname"
                  label="Фамилия"
                  name="lastname"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                   required={true}
                  fullWidth
                  id="email"
                  label="e-mail"
                  name="email"
                  autoComplete="email"
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required={true}
                  fullWidth
                  name="password"
                  label="Пароль"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Запомнить меня"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
             
            >
              Зарегистрироваться
            </Button>
            
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={onTogglePage} size="small">"У Вас уже есть аккаунт? Войти"</Button>
              </Grid>
            </Grid>
          
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}