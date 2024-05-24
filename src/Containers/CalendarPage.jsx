import { Box } from "@mui/material";
import SearchBox from "../Components/SearchBox/SearchBox";
import MainBody from "../Components/BigCalendar/MainBody";

function CalendarPage() {
  return (
    <Box>
      <SearchBox buttonText={null} />

      <MainBody />
    </Box>
  );
}

export default CalendarPage;
