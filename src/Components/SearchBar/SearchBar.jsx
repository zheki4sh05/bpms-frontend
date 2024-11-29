import {useState} from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";

import IconButton from "@mui/material/IconButton";

import SearchIcon from "@mui/icons-material/Search";


export default function SearchBar({
  elevation,
  placeHolder = "Поиск",
  handleSearch,
}) {

  const [state,setState]= useState("")
  const onClick=()=>{
    handleSearch(state)
  }
  
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
      onSubmit={onClick}
    >
      <InputBase
       id="input"

        sx={{ ml: 1, flex: 1,fontSize:"16px" }}
        placeholder={placeHolder} 
        inputProps={{ 'aria-label': 'Поиск' }}
        value={state}
        onChange={(event)=>setState(event.target.value)}
      />
   
      <IconButton onClick={onClick} sx={{ p: "5px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
