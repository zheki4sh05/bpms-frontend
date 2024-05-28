import { Box } from "@mui/material";
import Kanban from "../../Kanban/Kanban";
import { getAssignmentsList } from "../../../Store/slices/assignmentSlice";
import { getMyTasks, getOtherTasks } from "../../../Store/slices/tasksSlice";
import { useSelector } from "react-redux";
import AsideDrawer from "../../AsideBox/AsideDrawer";
import TaskOverview from "../../TaskComponents/TaskOverview";
import DialogEntityProvider from "../../DialogEntityProvider";
import { memo, useMemo } from "react";

const KanbanProject = memo(({project})=> {

    const {list} = useSelector(getAssignmentsList)
    // const tasks =useSelector(getMyTasks)
    // const otherTasks = useSelector(getOtherTasks)

    // const assignments = []
    const tasks = []
    const otherTasks = []
    console.log(list)

    return ( 
    <Box>
        <DialogEntityProvider>
            <Kanban
                    tasks = {[...list, ...tasks, ...otherTasks]}
                    showDialog={false}
                    projectId = {project.id}
                />
                <AsideDrawer
                    anchorProp={"right"}
                    widthLevel={2}
                    content={<TaskOverview/>}

                />

        </DialogEntityProvider>
           
    </Box> );
})

export default KanbanProject;