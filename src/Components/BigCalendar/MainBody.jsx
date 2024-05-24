import  Box  from '@mui/material/Box';
import MonthPage from './MonthPage';
function MainBody() {

    return ( 
    <Box sx={{
        width:"100%",
        height:"calc(80vh - 79px)",
        display:"flex",
       
        bgcolor:"#F5F5F5",
        p:0,
        m:0,
        overflowX:"scroll"
    }}>
           <MonthPage/>
    </Box> 
    );
}

export default MainBody;