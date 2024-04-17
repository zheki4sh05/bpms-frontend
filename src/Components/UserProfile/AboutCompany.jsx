import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DomainNames from "../../Store/DomainNames";
import CreateCompany from "./CreateCompany";
import CustomCreateAlert from './../CustomCreateAlert';
function AboutCompany() {
  const userInCompany = useSelector((state) => state[DomainNames.app.company]);

  const [isWorked, setWorked] = useState(
    userInCompany[0].name == "" ? false : true
  );

  const handleWork = () => {
    setWorked(true);
    setCreated(true)
  };

  const [isCreared, setCreated] = useState(false);

  const dispatch = useDispatch();
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={7}>
          <Typography variant="subtitle1" gutterBottom>
            Ваше место работы:
          </Typography>
          <Box sx={{ mb: 1 }}>
            {userInCompany[0].name == "" ? (
              <Typography>Вы ни где не работаете</Typography>
            ) : (
              <>
                {" "}
                <Typography variant="h4" gutterBottom>
                  {userInCompany[0].name}
                </Typography>{" "}
                <Button size="small" sx={{ mr: 1 }} variant="outlined">
                  Подробнее
                </Button>
              </>
            )}
          </Box>

          <Divider textAlign="right"></Divider>
          {isWorked ? (
            <>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Ваша роль:
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {userInCompany[0].currentRole == "admin"
                    ? "Основатель компании"
                    : "Работник компании"}
                </Typography>
              </Box>
              <Divider textAlign="right"></Divider>

              {
                  isCreared ? 
                  <CustomCreateAlert
                
                  messageText="Вы успешно создали компанию!"
                  duration={6000}
                  userSeverity="success"

                  /> :
                  <></>
                }

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  height: "100%",
                  alignItems: "flex-end",
                }}
              >
                

               

                <Button variant="contained" color="error">
                  Уволиться
                </Button>
              </Box>
            </>
          ) : (
            <Box sx={{ mt: 1 }}>
              <CreateCompany handleCreate={handleWork} />
            </Box>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={4}></Grid>
      </Grid>
 
    </Box>
  );
}

export default AboutCompany;
