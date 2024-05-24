import CreateEntity from "./CreateEntity";
import AssignmentDescription from "./AssignmentComponents/AssignmentDescription";
import AddFiles from "./AssignmentComponents/AddFiles";
import AboutAssignment from "./AssignmentComponents/AboutAssignment";
import Workers from "./AssignmentComponents/Workers";
import { useSelector } from "react-redux";
import {getProjects } from "../Store/slices/projectSlice";
import { useDispatch } from "react-redux";
import { getToken } from "../Store/slices/appUserSlice";
import { useContext, useEffect } from "react";
import DialogContext from "./DialogContext";
import { createAssignment, getAssignmentsList, getCreatedAssignStatus, resetCreatedAssignStatus } from "../Store/slices/assignmentSlice";
import statusTypes from "../API/status";
import UserDatePicker from "../Containers/CreateProjects/UserDatePicker";
import AssignmnetTasks from './AssignmentComponents/AssignmentTasks';
import ReportsSelect from "./AssignmentComponents/ReportsSelect";

function CreateAssignment({reloadHandler}) {

  const {data, getDialogResult,resetDialogContext} = useContext(DialogContext);

  const createdStatus = useSelector(getCreatedAssignStatus);

  const projects = useSelector(getProjects)

  const dispatch = useDispatch();

  const token = useSelector(getToken)

  const handleSaveCreatedAssign=()=>{

    console.log(data)
 
    dispatch(createAssignment({
      assignment:{
        ...data.aboutAssignment,
        ...data.deadline,
        ...data.description,
        ...data.todos,
      },
      token

    }))
  }

  if(createdStatus===statusTypes.succeeded){
    reloadHandler();
    resetDialogContext();
    dispatch(resetCreatedAssignStatus())
  }

 

  return (
    <>
      <CreateEntity
        stepsNames={[
          "О поручении",
          "Дедлайн",
          "Исполнители",
          "Описание",
          "Создать чек-лист",
          "Форма-отчет",
          "Прикрепить файлы",
        ]}
        stepsPages={[
          <AboutAssignment projects={projects} />,
          <UserDatePicker titleFrom="Начать задачу" titleTo="Закончить задачу" />,
          <Workers />,
          <AssignmentDescription />,
          <AssignmnetTasks />,
          <ReportsSelect />,
          <AddFiles />,
        ]}
        name={"Создание поручения"}
        handleSaveContext={handleSaveCreatedAssign}
        getResult={getDialogResult}
        resetDialog={resetDialogContext}
      />
    </>
  );
}

export default CreateAssignment;
