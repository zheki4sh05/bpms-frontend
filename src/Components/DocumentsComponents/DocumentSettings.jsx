import { Box, Button, Divider, ToggleButton, ToggleButtonGroup } from "@mui/material";
import {useState } from "react";
import CheckboxLabels from "./CheckboxLabels";
import { useDispatch } from "react-redux";
import { uploadDoc } from "../../Store/slices/documentsSlice";
import { useSelector } from "react-redux";
import { getToken } from "../../Store/slices/appUserSlice";
function DocumentSettings() {

    const [alignment, setAlignment] = useState("docs");

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
      };

      // const handleSave=()=>{
      //   dispatch(uploadDoc({data:{
          
      //   },
      //   token
      // }
          
      //   ))
      // }

    return ( 
    <Box sx={{maxWidth:"40%", m:"0 auto"}}>
        <Box sx={{display:"flex", justifyContent:"center", mt:4}}>

       
         <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        sx={{ mb:2}}
      >
        
        <ToggleButton value="document">Документы</ToggleButton>
        <ToggleButton value="report">Шаблон отчета</ToggleButton>
      </ToggleButtonGroup>
      </Box>
        <Box>

        <CheckboxLabels alignment={alignment}/>

        </Box>
    

    </Box> 
    
);
}

export default DocumentSettings;