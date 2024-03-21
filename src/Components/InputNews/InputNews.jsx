import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import ResizeIco from "./../../assets/icons/resize_ico";
import HeightIcon from "@mui/icons-material/Height";
import UserButton from "../Button/UserButton";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import SendIcon from "@mui/icons-material/Send";
import PushPinIcon from "@mui/icons-material/PushPin";
import { BorderBottom, BorderLeft } from "@mui/icons-material";
function InputNews() {
  const min_rows = 2;
  const max_rows = 8;
  const max_symbols = 1000;
  const [rows, setrows] = useState(min_rows);

  const [text,setText] = useState("");

  const [showWarnMsg,setMsg]= useState(false);

  const handleInputText=(event)=>{
      
        if( event.target.value.length < max_symbols){
            setText(event.target.value);
            setMsg(false);
        }else{
          setMsg(true);
        }
        
       
  }

  const handleResetText = () => {
    setText("")
  };

  const handleResize = () => {
    setrows((prevState) => (prevState === max_rows ? min_rows : max_rows));
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignContent: " space-between",
        flexDirection: "column",
        bgcolor: "white",
        borderTopLeftRadius: "0",
        borderTopRightRadius: "0",
        borderBottomRightRadius: "10px",
        borderBottomLeftRadius: "10px",
        padding: 2,
        boxSizing: "border-box",
        height:"auto"
      }}
    >
        <Stack>
            <Typography sx={{ color: 'error.main' }} variant="caption" display="block" gutterBottom>
            {showWarnMsg ? "Максимальная длина строки: "+max_symbols : ''}
          </Typography>
          </Stack>
      <Stack direction="row">
        <Box
          sx={{
            width: "100%",
          }}
        >
          <TextField
            variant="standard"
            fullWidth
            label="Введите текст..."
            id="fullWidth"
            multiline
            maxRows={rows.toString()}
            value={text}
            onChange={handleInputText}
            sx={{height:"auto"}}
          />
        </Box>
        <Box>
          <IconButton onClick={handleResize}>
            <HeightIcon />
          </IconButton>
        </Box>
      </Stack>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: 2,
        }}
      >
        <Box>
          <IconButton>
            <PushPinIcon />
          </IconButton>
        </Box>
        <Stack direction="row">
            <Box sx={{mr:2}}>
            <Button
                    size="small"
                    variant="outlined"
                    
                    onClick={handleResetText}
                    startIcon={
                        <ClearAllIcon />
                    }
                    >
                    Стереть
                    </Button>
            </Box>
           
           
         <Box>
         <Button size="small" variant="outlined" startIcon={<SendIcon />}>
              Опубликовать
            </Button>
         </Box>
        
        </Stack>
      </Box>
    </Box>
  );
}

export default InputNews;
