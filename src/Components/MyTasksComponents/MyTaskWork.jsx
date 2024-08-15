import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  Typography,
  Checkbox,
  Avatar,
  ListItemAvatar,
  ListItemText,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getId, getToken } from "../../Store/slices/appUserSlice";
import { useEffect, useState } from "react";
import { addDocuments, getAddedDocsStatus, resetAddedDocsStatus, updateAssignmentTodos, uploadDocForAssignment } from "../../Store/slices/assignmentSlice";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import { getCompanyName, getCompanyNameValue } from './../../Store/slices/companySlice';
import { getDocuments, getUploadedStatus, resetUploadedStatus, uploadDoc } from './../../Store/slices/documentsSlice';
import statusTypes from "../../API/status";

function MyTaskWork({ task, assignmentStatus }) {
  const token = useSelector(getToken);

  const dispatch = useDispatch();

  const companyName = useSelector(getCompanyName);
  const uploadedDocsStatus = useSelector(getAddedDocsStatus);

  const userId = useSelector(getId)

  const docs = useSelector(getDocuments).filter(item=>item.accessType=="user")

  const [todos, setTodos] = useState(assignmentStatus.toDoDTOList);
  const [idEditedList, setEditedList] = useState(false);

  const handleDone = (id) => {

    if(task.status=="accepted"){
        const updated = todos.map((item) => {
            if (item.id === id) {
              let newTodo = {
                ...item,
                isDone: !item.isDone,
              };
              return newTodo;
            } else {
              return item;
            }
          });
          setTodos(updated);
          setEditedList(true);

    }

  };

  const handleSaveTodos = () => {
    if(task.status=="accepted"){
    setEditedList(false);
    dispatch(
      updateAssignmentTodos({
        data: {
          assignmentId: task.id,
          todos: todos,
        },
        token,
      })
    );
}
  };

  const [files, setFiles] = useState([]);
  const [filesEdited, setFilesEdited] = useState(false);

  function saveDocs() {
    console.log(files);
    // setDataHandler({ ...data, files:  files });

    const formData = new FormData()


    files.forEach((file, index) => {
      formData.append(`file[${index}]`, file);
    });

    formData.append("alignment", "document")
    formData.append("byRequest", false)
    formData.append("projectId", task.projectId)
  
    formData.append("type", "user")
    formData.append(`workers[${0}].id`, task.user)
    formData.append(`workers[${1}].id`, task.worker)
    formData.append("companyName", companyName)
    formData.append("uploadedUser", userId )
    console.log(formData.keys().toArray())
    console.log(formData.values().toArray())
    formData.append("assignmentId", task.id)
   dispatch(uploadDocForAssignment({
    data:formData,
    token
   }))
    setFilesEdited(false);
  }

  function handleChange(event) {
    if(task.status=="accepted"){
        setFiles([...files, event.target.files[0]]);
      
        setFilesEdited(true);
    
    }
    
  }

  function handleDelete(index) {
    if(task.status=="accepted"){
    let name = files[index].name;

    setFiles(files.filter((f) => f.name != name));

    setFilesEdited(true);
    }
  }

  useEffect(()=>{

    if(uploadedDocsStatus == statusTypes.succeeded){
      dispatch(resetAddedDocsStatus())
    }
    
  },[uploadedDocsStatus])

  return (
    <Box>
      <Typography>Чек-лист</Typography>
      <Divider />

      <List>
        {todos.map((todo, index) => {
          return (
            <ListItem key={index} divider={true}>
              <Checkbox
                onClick={() => handleDone(todo.id)}
                checked={todo.isDone}
              />
              <Typography
                style={{ color: todo.isDone ? "green" : "" }}
                key={todo.id}
              >
                {todo.val}
              </Typography>
            </ListItem>
          );
        })}
      </List>
      <Button
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={!idEditedList || !task.status=="accepted"}
        onClick={handleSaveTodos}
      >
        Сохранить
      </Button>

      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="subtitle1" component="span">
            Файлов загружено: {files.length}
          </Typography>
        </Box>

        <List>
          {files.map((file, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(index)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>

              <ListItemText primary={file.name} />
            </ListItem>
          ))}
        </List>
        <Box
          sx={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}
        >
          <TextField
            type="file"
            id="outlined-basic"
            variant="outlined"
            onChange={handleChange}
            multiple
            
          />
          <Box>
            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!filesEdited || files.length == 0}
              onClick={saveDocs}
            >
              Сохранить
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default MyTaskWork;
