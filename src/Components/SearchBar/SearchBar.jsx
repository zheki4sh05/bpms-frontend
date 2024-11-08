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
  
  return (
    <Paper
      component="form"
      elevation={elevation | 0}
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        height:40,
        bgcolor: "white",
        borderRadius:"10px",
        padding:"10px",
        boxSizing:"border-box",
       
      }}
      onSubmit={handleSearch}
    >
      <InputBase
       id="input"

        sx={{ ml: 1, flex: 1,fontSize:"16px" }}
        placeholder={placeHolder} 
        inputProps={{ 'aria-label': 'Поиск' }}
       
      />
   
      <IconButton type="submit" sx={{ p: "5px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
