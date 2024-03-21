import { Box, Button, Stack } from "@mui/material";
import SearchBar from "../SearchBar/SearchBar";

function SearchBox() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDeirection: "row",
        bgcolor: "#F0F8FF",
        p: 2,
        borderRadius: "5px",
        alignItems:"center"
      }}
    >
        <Box>
        <Button variant="contained" color="primary">
        Создать
      </Button>

        </Box>
     
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          borderRadius: "10px",
          borderStyle:"solid",
          borderWidth:"2px",
          borderColor: "#DCDCDC",
          bgcolor:"white",
          ml:2,
          p:"5px"
        }}
      >
       
        <Button variant="contained" color="success">
          Категория
        </Button>
        <Box sx={{ml:1}}>
        <SearchBar/>
        </Box>
      
      
      </Box>
    </Box>
  );
}

export default SearchBox;
