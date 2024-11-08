import { Box } from "@mui/material";

function MainBody({ children }) {
  return (
    <Box sx={{ 
    width:"100%",
   
    bgcolor: "#ABD7FF", 

    borderRadius: "10px",
    boxShadow:1,
    padding:2,
    boxSizing:"border-box",
    height:"100%"
  
    }}>
      {children}
    </Box>
  );
}

export default MainBody;
