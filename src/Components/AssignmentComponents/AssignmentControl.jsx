import { Box, Button, Container, Divider, List, ListItem, TextField, Typography,Checkbox } from "@mui/material";
import CustomCreateAlert from "../CustomCreateAlert";
import { useEffect, useState } from "react";
import statusTypes from "../../API/status";
import { useSelector } from "react-redux";
import { getToken } from "../../Store/slices/appUserSlice";
import { updateAssignment, updateAssignmentTodos } from "../../Store/slices/assignmentSlice";
import { useDispatch } from "react-redux";
import ChangeAssignmentWorker from "./ChangeAssignmentWorker";


function AssignmentControl({assignment, assignmentStatus}) {

    const token = useSelector(getToken)
 
  const dispatch = useDispatch();
    console.log(assignment.deadline)
    const [isEditedFinish, setEditedFinish] = useState(false);
  
    const [finishDate, setFinishDate] = useState(
        assignment.deadline
    );
  
 
    const handleFinishDate = (event) => {
      setEditedFinish(true);
  
      setFinishDate(event.target.value);
    };
  
    const setHandler = () => {
      setEditedFinish(false);

      dispatch(
        updateAssignment({
            data:{
                id:assignment.id,
                name: assignment.name,
                desc: assignment.description,
                deadline:finishDate,
                startAt: assignment.startAt,
                status:assignment.status,
                newStage:assignment.stageId
            },
            token
        })
      )
  
    //   setDataHandler({
    //     ...data,
    //     deadline: { ...data.deadline, startDate, finishDate },
    //   });
    };
  
    const check = () => {
      // Преобразуем значения в объекты Date

      const date1 = new Date(assignment.createdAt);
    
      const date2 = new Date(finishDate);
  
      // Сравниваем даты
      if (date1 > date2.getTime() || date1.getTime() < new Date().getTime()) {
  
          return <Box sx={{mt:2}}> <CustomCreateAlert
          
          messageText = {"Неверно задана дата"}
          duration={2000}
          userSeverity={statusTypes.error}
          /></Box>
  
      } else if (
        date1.getTime() < date2.getTime() ||
        date1.getTime() == date2.getTime()
      ) {
  
        return <Button
        disabled={!(isEditedFinish)}
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={setHandler}
      >
        Сохранить
      </Button>
  
      }
    };


    const [inputVal, setInputVal] = useState("");
    const [todos, setTodos] = useState(assignmentStatus.toDoDTOList);
    const [isEdited, setIsEdited] = useState(false);
    const [editedId, setEditedId] = useState(null);
    const [idEditedList, setEditedList] = useState(false)
    const onChange = (e) => {
      setInputVal(e.target.value);
    };
  
    const handleClick = () => {
      if (!isEdited) {
        setTodos([
          ...todos,
          { val: inputVal, isDone: false, id: new Date().getTime() },
        ]);
      } else {
     
        setTodos([...todos, { val: inputVal, isDone: false, id: editedId }]);
      }
      setInputVal("");
      setIsEdited(false);
      console.log("edited ")
      if(!idEditedList){
        setEditedList(true)
      } 
     
    };
  
    useEffect(() => {
    //   handleTodos(todos)
    }, [todos]);
  
    const onDelete = (id) => {
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);

  
      if(!idEditedList){
        setEditedList(true)
      }

    };
  
    const handleDone = (id) => {
      const updated = todos.map((item) => {
        if (item.id === id) {
          

          let newTodo={
            ...item,
            isDone:!item.isDone
          }
          return newTodo;

        }else{
          return item;
        }
       
      });
      setTodos(updated);
     
    };
  
    const handleEdit = (id) => {
      const newTodos = todos.filter((todo) => todo.id !== id);
      const editVal = todos.find((todo) => todo.id === id);
      setEditedId(editVal.id);
      setInputVal(editVal.val);
      setTodos(newTodos);
      setIsEdited(true);
    };

    const handleSaveTodos=()=>{
      setEditedList(false)
      dispatch(updateAssignmentTodos({
        data:{
          assignmentId:assignment.id,
          todos:todos
        },
        token
      }))
    }
 

  return (
    <Box>
      <Container maxWidth="sm">

      <Typography>Дедлайн</Typography>
        <Divider/>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Создано
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {assignment.createdAt}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
             Дэдлайн
            </Typography>
            <TextField
              type="datetime-local"
              onChange={handleFinishDate}
              value={finishDate}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {isEditedFinish ? check() : null}

          
        </Box>

        <Typography sx={{mt:2}}>Чек-лист</Typography>
        <Divider/>

        <TextField
        variant="outlined"
        onChange={onChange}
        label="Название"
        value={inputVal}
      />
      <Button
        size="large"
        variant={isEdited ? "outlined" : "contained"}
        color="primary"
        onClick={handleClick}
        disabled={inputVal ? false : true}
        sx={{ ml: 2 }}
      >
        {isEdited ? "Изменить" : "Добавить"}
      </Button>
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
              <Button
                onClick={() => handleEdit(todo.id)}
                variant="contained"
                sx={{ ml: 2 }}
              >
                Изменить
              </Button>
              <Button
                onClick={() => onDelete(todo.id)}
                color="secondary"
                variant="contained"
                sx={{ ml: 1 }}
              >
                Удалить
              </Button>
            </ListItem>
          );
        })}
      </List>
      <Button
             
              
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!idEditedList}
              onClick = {handleSaveTodos}
            >
              Сохранить
            </Button>

            
        <Typography sx={{mt:2}}>Исполнители</Typography>
        <Divider/>

        <ChangeAssignmentWorker assignment={assignment} assignmentStatus={assignmentStatus}/>

      </Container>
    </Box>
  );
}

export default AssignmentControl;
