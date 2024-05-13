import { Box, Button } from "@mui/material";
import SearchBar from "../SearchBar/SearchBar";

function SimpleSearhcBox() {
    return ( 
        <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          borderRadius: "10px",
          borderStyle: "solid",
          borderWidth: "2px",
          borderColor: "#DCDCDC",
          bgcolor: "white",
          ml: 2,
          p: "5px",
        }}
      >
        <Button variant="contained" color="success">
          Категория
        </Button>
        <Box sx={{ ml: 1 }}>
          <SearchBar />
        </Box>
      </Box>

     );
}

export default SimpleSearhcBox;