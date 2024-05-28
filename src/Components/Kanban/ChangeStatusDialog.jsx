import {
  Dialog,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Divider } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { useContext } from "react";
import DialogContext from "../DialogContext";
import { useSelector } from "react-redux";
import { changeTaskStatus, getSelectedTask } from "../../Store/slices/assignmentSlice";
import { useDispatch } from "react-redux";
function ChangeStatusDialog({ open,handleClose }) {

    const selectedTask = useSelector(getSelectedTask)

    const dispatch = useDispatch()

  const list = [
    {
      id: 1,
      name: "Надо сделать",
    },
    {
      id: 2,
      name: "Готово",
    },
  ];


  const filteredList = list.filter((item) => item.name != selectedTask.stage.name);

  

  const handleListItemClick = (value) => {
    console.log(value);

    dispatch(changeTaskStatus());
  
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Выбрать новый статус</DialogTitle>

      <List sx={{ pt: 0 }}>
        {filteredList.map((item, index) => (
          <ListItem disableGutters key={index}>
            <ListItemButton onClick={() => handleListItemClick(item.name)}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}

        <Divider />
        <ListItem disableGutters>
          <ListItemText primary={selectedTask.stage.name} />
        </ListItem>
      </List>
    </Dialog>
  );
}

export default ChangeStatusDialog;
