import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import BusinessIcon from "@mui/icons-material/Business";
import { useDispatch, useSelector } from "react-redux";
import DomainNames from "../../Store/DomainNames";
import { createCompany, saveCompany } from "../../Store/slices/companySlice";
import statusTypes from "../../API/status";
import CustomCreateAlert from "../CustomCreateAlert";
import { CircularProgress } from '@mui/material';
import { getErrorName } from "../../Util/ErrorTypes";
import { getToken } from "../../Store/slices/appUserSlice";
const defaultTheme = createTheme();
function CreateCompany({handleCreate}) {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const status = useSelector((state)=>state[DomainNames.company].status)
  const error = useSelector((state)=>state[DomainNames.company].error)
  const [data,setData] = useState({});
  const [isDesideToCreate, setDesicion] = useState(false);
 
  const handleClick = () => {
    setDesicion(true);
  };

  const handleClickDisable = () => {
    setDesicion(false);
  };

  let authResultContent;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setData(formData);
    dispatch(createCompany({
      name:formData.get('name'),
      desc:formData.get('desc'),
      currentRole:"admin",
      token
    }))

  };

if(status===statusTypes.loading){

      authResultContent = <CircularProgress />;

    }else if(status===statusTypes.succeeded && isDesideToCreate){

      authResultContent = <CustomCreateAlert
      messageText={"Данные успешно сохранены"}
       duration={1500}
       userSeverity={"success"}
      />

      dispatch(
        saveCompany({
          name:data.get('name'),
          desc:data.get('desc'),
          currentRole:"admin",
        })
    )
    handleCreate();

    }else if(status===statusTypes.failed){

      authResultContent=<CustomCreateAlert
      messageText={"Не удалось создать компанию. ".concat(getErrorName('company', error.code))}
       duration={4000}
       userSeverity={"error"}
      />

    }

  return (
    <Box>
      {!isDesideToCreate ? (
        <Button
          size="small"
          sx={{ mr: 1 }}
          variant="outlined"
          onClick={handleClick}
        >
          Создать компанию
        </Button>
      ) : (
        <></>
      )}

      {isDesideToCreate ? (
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <BusinessIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Создание компании
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Название"
                  name="name"
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="desc"
                  label="Описание"
                  multiline
                  maxRows={6}
                  id="desc"
                />
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    onClick={handleClickDisable}
                    size="small"
                    variant="outlined"
                    sx={{ mt: 3, mb: 2, mr: 3 }}
                  >
                    Отменить
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Создать
                  </Button>
                </Box>
              </Box>
              <Box>
                {authResultContent}
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      ) : (
        <></>
      )}
    </Box>
  );
}

export default CreateCompany;
