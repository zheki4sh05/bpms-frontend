import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import BusinessIcon from "@mui/icons-material/Business";
import { useDispatch, useSelector } from "react-redux";
import DomainNames from "../../Store/DomainNames";
import { companyCreate } from "../../Store/slices/companySlice";
const defaultTheme = createTheme();
function CreateCompany({handleCreate}) {
    const userInCompany = useSelector((state) => state[DomainNames.app.company]);
  const [isDesideToCreate, setDesicion] = useState(false);
  const dispatch = useDispatch();
  const handleClick = () => {
    setDesicion(true);
  };

  const handleClickDisable = () => {
    setDesicion(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    dispatch(
        companyCreate({
            name:formData.get('name'),
            desc:formData.get('desc'),
            currentRole:"admin",
        })
    )
    handleCreate();
   
  };
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
