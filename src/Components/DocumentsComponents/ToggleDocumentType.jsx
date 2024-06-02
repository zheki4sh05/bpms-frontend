import { ToggleButton, ToggleButtonGroup } from "@mui/material";

function ToggleDocumentType({value=[], firstValue, changeHandler}) {
    return ( 

        <ToggleButtonGroup
        color="primary"
        value={firstValue}
        exclusive
        onChange={changeHandler}
        aria-label="Platform"
        sx={{ mb:2}}
      >

        {
            value.map((item,index)=>(
                <ToggleButton key={index} value={item.type}>{item.name}</ToggleButton>
            ))
        }
        
        
        
      </ToggleButtonGroup>
        
     );
}

export default ToggleDocumentType;