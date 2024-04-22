import { Box, Button, CircularProgress, Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DomainNames from "../../Store/DomainNames";
import CreateCompany from "./CreateCompany";
import CustomCreateAlert from './../CustomCreateAlert';
import statusTypes from "../../API/status";
import { userCompany } from "../../Store/slices/companySlice";
import { getToken } from "../../Store/slices/appUserSlice";
import { getErrorName } from "../../Util/ErrorTypes";
function AboutCompany() {
  const userInCompany = useSelector((state) => state[DomainNames.company].userCompany);
  const error = useSelector((state)=>state[DomainNames.company].error)
  const token = useSelector(getToken);
  const status = useSelector((state) => state[DomainNames.company].status);
  const dispatch = useDispatch();
  const [isWorked, setWorked] = useState(
    userInCompany.name == "" ? false : true
  );
  useEffect(() => {
    if (status === statusTypes.idle) {
      dispatch(userCompany({token}))
      setWorked(true)
    }
  }, [status, dispatch])

  const handleWork = () => {
    setWorked(true);
    setCreated(true)
  };
  let fetchingResult;
  if (status === statusTypes.loading) {
    fetchingResult = <CircularProgress />;
  } else if (status === statusTypes.failed) {
    fetchingResult  = <CustomCreateAlert
        messageText={`Ошибка загрузки данных ${getErrorName('any', error.code)}`}
        duration={6000}
        userSeverity="error"
      />
  }

  const [isCreared, setCreated] = useState(false);

  const handleRetireFromCompany=()=>{

  }
  const handleDeligateCompany=()=>{

  }
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={7}>
          <Typography variant="subtitle1" gutterBottom>
            Ваше место работы:
          </Typography>
          <Box sx={{ mb: 1 }}>
            {userInCompany.name == "" ? (
              <Typography>Вы ни где не работаете</Typography>
            ) : (
              <>
                {" "}
                <Typography variant="h4" gutterBottom>
                  {userInCompany.name}
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
                  {userInCompany.currentRole == "admin"
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
                }{
                  fetchingResult
                }

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  height: "100%",
                  alignItems: "flex-end",
                }}
              >
                

               
                {userInCompany.currentRole == "admin" ?
                    <Button variant="outlined" size="small" color="error" onClick={handleDeligateCompany}>
                    Передать компанию
                    </Button> :
                     <Button variant="outlined" size="small" color="error" onClicl={handleRetireFromCompany} >
                     Уволиться
                   </Button>
                }
               
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
