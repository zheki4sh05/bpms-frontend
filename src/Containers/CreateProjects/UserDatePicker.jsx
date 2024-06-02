import {
  Box,
  Button,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useContext, useState } from "react";
import DialogContext from "../../Components/DialogContext";
import CustomCreateAlert from "../../Components/CustomCreateAlert";
import statusTypes from "../../API/status";
function UserDatePicker({ titleFrom = "", titleTo = "" }) {
  const { setDataHandler, data } = useContext(DialogContext);

  const [isEditedStart, setEditedStart] = useState(false);
  const [isEditedFinish, setEditedFinish] = useState(false);
  const [startDate, setStartDate] = useState(
    data.deadline ? data.deadline.startDate : ""
  );
  const [finishDate, setFinishDate] = useState(
    data.deadline ? data.deadline.finishDate : ""
  );

  const handleStartDate = (event) => {
    setEditedStart(true);

    setStartDate(event.target.value);
  };
  const handleFinishDate = (event) => {
    setEditedFinish(true);

    setFinishDate(event.target.value);
  };

  const setHandler = () => {
    setEditedFinish(false);
    setEditedStart(false);
    setDataHandler({
      ...data,
      deadline: { ...data.deadline, startDate, finishDate },
    });
  };

  const check = () => {
    // Преобразуем значения в объекты Date
    const date1 = new Date(startDate);
    const date2 = new Date(finishDate);

    // Сравниваем даты
    if (date1.getTime() > date2.getTime() || date1.getTime() < new Date().getTime()) {

        return <Box sx={{mt:2}}> <CustomCreateAlert
        
        messageText = {"Неверно задана дата"}
        duration={2000}
        userSeverity={statusTypes.error}
        /></Box>

    } else if (
      date1.getTime() < date2.getTime() ||
      date1.getTime() == date2.getTime()
    ) {

      return <Button
      disabled={!(isEditedStart && isEditedFinish)}
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      onClick={setHandler}
    >
      Сохранить
    </Button>

    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              {titleFrom}
            </Typography>
            <TextField
              type="datetime-local"
              onChange={handleStartDate}
              value={startDate}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              {titleTo}
            </Typography>
            <TextField
              type="datetime-local"
              onChange={handleFinishDate}
              value={finishDate}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {isEditedStart && isEditedFinish ? check() : null}

          
        </Box>
      </Container>
    </LocalizationProvider>
  );
}

export default UserDatePicker;
