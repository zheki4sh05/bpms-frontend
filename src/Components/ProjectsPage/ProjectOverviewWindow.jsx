import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import DialogContext from "../DialogContext";
import { useSelector } from "react-redux";
import { getProjects } from "../../Store/slices/projectSlice";

function ProjectOverviewWindow() {

    const {getDialogResult} = useDispatch(DialogContext);

    const projects = useDispatch(getProjects);

    return (
         <Box>
        
    </Box> 
    );
}

export default ProjectOverviewWindow;