import { Box, Button, Container, Divider, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useContext, useState } from "react";
import DialogContext from "../../Components/DialogContext";
function UserDatePicker() {

  const {setDataHandler,data} = useContext(DialogContext);

  const [isEditedStart, setEditedStart] = useState(false)
  const [isEditedFinish, setEditedFinish] = useState(false)
  const [startDate,setStartDate] = useState(data.deadline ? data.deadline.startDate : "");
  const [finishDate,setFinishDate] = useState(data.deadline ? data.deadline.finishDate : "");

  const handleStartDate=(event)=>{
    setEditedStart(true)

    setStartDate(event.target.value)

  }
  const handleFinishDate=(event)=>{
    setEditedFinish(true)
    
    setFinishDate(event.target.value)

  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent:"space-between",
            mt: 2,
          }}
        >
          <Box>
            <Typography variant="subtitle2" gutterBottom >
             Начало проекта
            </Typography>
            <TextField  type="datetime-local" onChange={handleStartDate} value={startDate}/>
          </Box>
          <Box>
            <Typography variant="subtitle2" gutterBottom >
             Конец проекта
            </Typography>
            <TextField  type="datetime-local" onChange={handleFinishDate}  value={finishDate}/>
          </Box>
        </Box>
        <Box sx={{display:"flex",justifyContent:"flex-end"}}>
        <Button
            disabled={!(isEditedStart && isEditedFinish) }
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={()=>setDataHandler({...data,deadline:{...data.deadline, startDate, finishDate}})}
          >
            Сохранить
          </Button>
        </Box>
      </Container>
    </LocalizationProvider>
  );
}

export default UserDatePicker;
