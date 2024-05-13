import React, { useState } from "react";
import styled from "@emotion/styled";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Grid, Box, IconButton } from "@mui/material";
import Divider from "@mui/material/Divider";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { columnsFromBackend } from "./kanbanData";
import TaskCard from "./TaskCard";
import EditIcon from '@mui/icons-material/Edit';
import AddColumnControl from "./AddColumnControl";
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

const Kanban = () => {
  const [columns, setColumns] = useState(columnsFromBackend);

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
  return (
    
      <Container>
        <TaskColumnStyles>
    
              
                  <TaskList
                  
                  >
                    <Box sx={{ width: "100%" }}>
                      <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      >
                        <Grid item xs={10}>
                          <Title>sdcsdcsdc</Title>
                        </Grid>
                        <Grid
                          item
                          xs={2}
                         
                          display="flex"
                          alignContent="flex-end"
                          justifyContent="flex-end"
                        >
                         <IconButton>
                            <DeleteForeverIcon/>
                        </IconButton>
                        <IconButton>
                            <EditIcon/>
                        </IconButton>
                        </Grid>
                      </Grid>
                    </Box>
                    <Divider />
{/* 
                    {column.items.map((item, index) => (
                      <TaskCard key={index} item={item} index={index} />
                    ))} */}
                 
                  </TaskList>
              
             
          
    
        </TaskColumnStyles>
        <Box>
            <Box>
                <AddColumnControl/>
            </Box>
        </Box>
      </Container>
   
  );
};

export default Kanban;