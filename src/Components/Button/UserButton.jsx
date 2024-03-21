import { Button } from "@mui/material";

// function getTheme(name){
//    let color = ""
//     switch(name){
//         case "primary":{
//             color="#07149E";
//             break;
//         };
//         case "light":{
//             color="#07149E";
//             break;
//         }
//         case "extra":{
//             color="#00FF7F";
//             break;
//         }
//         default:{
//             color="#07149E";
//         }
        
//     }
//     return color;
// }


function UserButton({text,children}) {
    return ( 
        <Button variant="contained" 
            startIcon={children}
        >{text}</Button>
     );
}

export default UserButton;