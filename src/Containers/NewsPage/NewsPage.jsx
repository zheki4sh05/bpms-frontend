import { Box } from "@mui/material";
import InputNews from "../../Components/InputNews/InputNews";
import NewsBox from "../NewsBox/NewsBox";

function NewsPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        boxSizing:"border-box"
      }}
    >
      <InputNews />
      <NewsBox/>
    </Box>
  );
}

export default NewsPage;
