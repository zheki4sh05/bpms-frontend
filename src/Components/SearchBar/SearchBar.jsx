import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

export default function SearchBar() {
  return (
    <Paper
      component="form"
    elevation={0}
      sx={{ display: 'flex', alignItems: 'center', width: 300, bgcolor:'white' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Поиск"
        inputProps={{ 'aria-label': 'Поиск' }}
      />
      <IconButton type="button" sx={{ p: '5px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}