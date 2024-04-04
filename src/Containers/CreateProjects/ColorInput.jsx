import React from 'react'
import { MuiColorInput } from 'mui-color-input'
import { Box } from '@mui/material'

function ColorInput() {

    const [value, setValue] = React.useState('#ffffff')

    const handleChange = (newValue) => {
      setValue(newValue)
    }

    return ( 

        <Box  sx={{maxWidth:"200px"}}>
                <MuiColorInput format="hex" value={value} onChange={handleChange} />
        </Box>

    
    
    );
}

export default ColorInput;
