import { Box, Container, Divider } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
function UserDatePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            mt:2
          }}
        >
          <DatePicker label="Начало проекта" sx={{mr:3}}/>
        
          <DatePicker label="Окончание проекта"  />
        </Box>
      </Container>
    </LocalizationProvider>
  );
}

export default UserDatePicker;
