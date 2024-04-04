import { Box } from "@mui/material";
import SignUp from "../Containers/SignUp";
import SignIn from "./SignIn";
import { useState } from "react";

function AuthFormComponent({toggleState}) {

    const signUp=1;

    const signIn=2;

    const [page, togglePage] = useState(signUp);

    const handleTogglePage=()=>{
        togglePage((prevState) => (prevState === signIn ? signUp : signIn));
    }

    return ( 

            <Box
                sx={{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    width:"100%",
                    height:"100%"
                }}
            >

            {

                page == signIn ?
                <SignIn 
                    onTogglePage={handleTogglePage}
                    toggleState={toggleState}
                /> :
                <SignUp
                    onTogglePage={handleTogglePage}
                    toggleState={toggleState}
                />
            }

            </Box>
     );
}

export default AuthFormComponent;