import { Box } from "@mui/material";
import AddFiles from './../AssignmentComponents/AddFiles';



function UploadDocumentPlaceholder() {
    return ( 
    <Box>
        <AddFiles
            required={true}
        />
    </Box> );
}

export default UploadDocumentPlaceholder;