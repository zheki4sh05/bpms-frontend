import React, { memo, useCallback, useContext, useMemo, useState } from "react";
import styled from "@emotion/styled";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Grid, Box, IconButton, ListItemButton } from "@mui/material";
import Divider from "@mui/material/Divider";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { columnsFromBackend } from "./kanbanData";
import TaskCard from "./TaskCard";
import EditIcon from "@mui/icons-material/Edit";
import AddColumnControl from "./AddColumnControl";
import { id } from "date-fns/locale";
import ChangeStatusDialog from "./ChangeStatusDialog";
import DialogContext from "../DialogContext";
import { useDispatch } from "react-redux";
import { setSelectedTask } from "../../Store/slices/assignmentSlice";
import { useSelector } from "react-redux";
import { getProjectStages } from "../../Store/slices/projectSlice";
const Container = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
}));

const TaskList = styled("div")(() => ({
  minHeight: "100px",
  display: "flex",
  flexDirection: "column",
  background: "#d7dce8",
  minWidth: "341px",
  borderRadius: "5px",
  padding: "15px 15px",
  marginRight: "45px",
}));

const TaskColumnStyles = styled("div")(() => ({
  margin: "8px",
  display: "flex",
  width: "100%",
  minHeight: "80vh",
}));
const Title = styled("span")(() => ({
  fontWeight: "bold",
  color: "#333333",
  fontSize: 16,
  marginBottom: "1.5px",
}));
const FilterIcon = styled("span")(() => ({
  marginBottom: "1.5px",
  color: "text.secondary",
}));

const Kanban = memo(({tasks, showDialog, projectId}) => {
  const {setDataHandler,  openDialogHandler } = useContext(DialogContext);
  // const [columns, setColumns] = useState(columnsFromBackend);

  const stages = useSelector(state => getProjectStages(state, projectId))

 const dispatch= useDispatch();

  const [open,setOpen] = useState(false);

//   const [tasks,setTasks] = useState([{
//     id:1,
//     name:"задача",
//     desc:"описание",
//     start:"16.09.2024",
//     finish:"19.09.2024",
//     assigned_To:"test@mail.ru",
//     status_id:1

//   },
//   {
//     id:2,
//     name:"задача 2",
//     desc:"описание",
//     start:"16.09.2024",
//     finish:"19.09.2024",
//     assigned_To:"test@mail.ru",
//     status_id:2

//   }


// ])

  // const [stages, setStages] = useState([{
  //   id:1,
  //   name:"Надо сделать"
  //   },{
  //     id:2,
  //     name:"Готово"
  //     }])


  //   const onDragEnd = (result, columns, setColumns) => {
  //     if (!result.destination) return;
  //     const { source, destination } = result;
  //     if (source.droppableId !== destination.droppableId) {
  //       const sourceColumn = columns[source.droppableId];
  //       const destColumn = columns[destination.droppableId];
  //       const sourceItems = [...sourceColumn.items];
  //       const destItems = [...destColumn.items];
  //       const [removed] = sourceItems.splice(source.index, 1);
  //       destItems.splice(destination.index, 0, removed);
  //       setColumns({
  //         ...columns,
  //         [source.droppableId]: {
  //           ...sourceColumn,
  //           items: sourceItems,
  //         },
  //         [destination.droppableId]: {
  //           ...destColumn,
  //           items: destItems,
  //         },
  //       });
  //     } else {
  //       const column = columns[source.droppableId];
  //       const copiedItems = [...column.items];
  //       const [removed] = copiedItems.splice(source.index, 1);
  //       copiedItems.splice(destination.index, 0, removed);
  //       setColumns({
  //         ...columns,
  //         [source.droppableId]: {
  //           ...column,
  //           items: copiedItems,
  //         },
  //       });
  //     }
  //   };

  function reduceTasks(tasks, id) {
    return tasks.filter(item=>item.status_id === id);
  }
  // function openDialog(taskId, stage){

   
  // }

  const openDialog =(taskId, stage={})=>{
    dispatch(setSelectedTask({taskId, stage:{id:stage.id, name:stage.name}}))
    
    setOpen(true)

  }

  function handleClose(){
    setOpen(false)
  }

  // function handleOpenOverview(taskId){
  //     console.log(taskId)

  //     setDataHandler({taskId:taskId})

  //     openDialogHandler()

  // }

  const handleOpenOverview = (id, name)=>{
    console.log(id)

    setDataHandler({taskId:id, taskName: name})

    openDialogHandler()
  }

  return (
    <Container>
       {stages.map((item, index) => (
      <TaskColumnStyles key={index}>
       
          <TaskList>
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={10}>
                  <Title>{item.name}</Title>
                </Grid>
                <Grid
                  item
                  xs={2}
                  display="flex"
                  alignContent="flex-end"
                  justifyContent="flex-end"
                >
                  <IconButton>
                    <DeleteForeverIcon />
                  </IconButton>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <Divider />
            </Box>
           


          {reduceTasks(tasks, item.id).map((task,index)=>(
        
            <TaskCard  task={task}  handleOpenDialog={()=>openDialog(task.id,item)} handleOpenOverview={handleOpenOverview} showDialog={showDialog}/>
 
              
          ))
          }
          </TaskList>



       
      </TaskColumnStyles>
       ))}

       {showDialog ? <ChangeStatusDialog open={open} handleClose={handleClose}/> : null}

  

      <Box>
        <Box>
          <AddColumnControl />
        </Box>
      </Box>
    </Container>
  );
});

export default Kanban;
