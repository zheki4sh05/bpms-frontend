import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import AlertDialog from "./AlertDialog";
import { useState } from "react";
import AlertDialogContent from "./AlertDialogContent";
import FormDialog from "./FormDialog";
import { getCompanyName, getInviteError, getInviteStatus, inviteUserToCompany } from "../../Store/slices/companySlice";
import { useSelector } from "react-redux";
import { getToken } from "../../Store/slices/appUserSlice";
import { useDispatch } from "react-redux";
import StatusContent from "../../Util/statusContent";

function SearchResult({ user }) {

  const dispatch = useDispatch()

  const status = useSelector(getInviteStatus)
  const error = useSelector(getInviteError)

  console.log(status)

  const token = useSelector(getToken)
  const company = useSelector(getCompanyName)

  const [openAlert,setOpenAlert] = useState(false)
  const [openForm,setOpenForm] = useState(false)

  const openAlertHandler=()=>{
    setOpenAlert(true)
  }
  const closeAlertHandler=()=>{
    setOpenAlert(false)
  }
  const openFormHandler=()=>{
    setOpenForm(true)
  }
  const closeFormHandler=()=>{
    setOpenForm(false)
  }
  function submitForm(email,text){
      dispatch(inviteUserToCompany({
        data:{
          email:email,
          message:text,
          companyName:company
        },
        token
  }))
  }

  return (
    <>
      <Divider />
      <Paper elevation={2} sx={{maxWidth:"300px", mt:1}}>
      <Box sx={{ display: "flex", p: 1, justifyContent: "flex-start" }}>
        <Box>
          <img src="" alt="avatar" />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography variant="body1" gutterBottom>
              {user.firstname} {user.lastname}
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Button size={"small"} variant="text" onClick={openAlertHandler} >Подробнее</Button>
            <Button size={"small"} variant="text" onClick={openFormHandler}>Пригласить</Button>
          </Box>
        </Box>
      </Box>
      </Paper>
      <AlertDialog
      
        title={user.email}
        content={<AlertDialogContent user={user} />}
        openResult={openAlert}
        handleCloseAlert={closeAlertHandler}
      />
      <FormDialog

        user={user}
        openDialog={openForm}
        handleSubmitDialog={submitForm}
        handleCloseDialog={closeFormHandler}
      />
      <StatusContent
          result={status}
          errorDomain={"invite"}
          errorCode={error ? error.code : ""}
          loadingType={"default"}
          successType={"alert"}
          errorType={"alert"}
          failedText={"Приглашение уже отправлено!"}
      />
    </>
  );
}

export default SearchResult;
