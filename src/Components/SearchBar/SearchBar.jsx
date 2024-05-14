import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { TextField } from "@mui/material";

export default function SearchBar({
  elevation,
  placeHolder = "Поиск",
  handleSearch,
}) {
  console.log(" placeHolder" + placeHolder);
  return (
    <Paper
      component="form"
      elevation={elevation | 0}
      sx={{
        display: "flex",
        alignItems: "center",
        width: 300,
        bgcolor: "white",
      }}
      onSubmit={handleSearch}
    >
      {/* <InputBase
       id="input"

        sx={{ ml: 1, flex: 1 }}
        placeholder={placeHolder} 
        inputProps={{ 'aria-label': 'Поиск' }}
       
      /> */}
      <TextField
        id="input"
        name="input"
        sx={{ flex: 1 }}
        
        siz="small"
        variant="standard"
       
      />
      <IconButton type="submit" sx={{ p: "5px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
