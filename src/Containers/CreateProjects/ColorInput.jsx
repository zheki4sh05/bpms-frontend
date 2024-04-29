import React, { useContext } from 'react'
import { MuiColorInput } from 'mui-color-input'
import { Box } from '@mui/material'
import DialogContext from '../../Components/DialogContext'
import {TwitterPicker} from 'react-color'
function ColorInput() {
    const {data,setDataHandler} = useContext(DialogContext)

  
    const handleChange = (value) => {
      
      setDataHandler({...data,color:value.hex})
    }

    return ( 

        <Box  sx={{maxWidth:"200px"}}>
                {/* <MuiColorInput format="hex" value={data.color || "#ffffff"}  onInput={handleChange}/> */}
                <TwitterPicker onChangeComplete={handleChange} />
        </Box>

    
    
    );
}

export default ColorInput;
