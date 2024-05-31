import { Box } from "@mui/material";
import { useContext } from "react";
import DialogContext from "../DialogContext";

function DocumentOverview() {

    const {data} = useContext(DialogContext)
    console.log(data)
    return ( <Box>
            Документы
    </Box> );
}

export default DocumentOverview;