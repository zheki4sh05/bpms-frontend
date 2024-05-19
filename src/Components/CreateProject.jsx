import * as React from "react";
import AboutProject from "../Containers/CreateProjects/AboutProject";
import UserDatePicker from "../Containers/CreateProjects/UserDatePicker";
import WorkersListControl from "../Containers/CreateProjects/WorkersListControl";
import CreateEntity from "./CreateEntity";
import { useContext } from "react";
import DialogContext from './DialogContext';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { getToken } from "../Store/slices/appUserSlice";
import { createProject, getAllUserProjects, getCreatedStatus, resetCreatedStatus } from "../Store/slices/projectSlice";
import statusTypes from "../API/status";


export default function CreateProject({reloadHandler}) {

  const {data, getDialogResult,resetDialogContext} = useContext(DialogContext);

  const createdStatus = useSelector(getCreatedStatus);

  const dispatch = useDispatch();

  const token = useSelector(getToken)

  const handleSaveCreatedProject=()=>{
 
    dispatch(createProject({
      project:{
        ...data.aboutProject,
        ...data.deadline,
        ...data.members
      },
      token

    }))
  }

  if(createdStatus===statusTypes.succeeded){
    reloadHandler();
    resetDialogContext();
    dispatch(resetCreatedStatus())
  }

  return (
    <CreateEntity
    stepsNames={["О проекте", "Настройки", "Участники"]}
    stepsPages={[<AboutProject />, <UserDatePicker />, <WorkersListControl />]}
    name={"Создание проекта"}
    handleSaveContext={handleSaveCreatedProject}
    getResult={getDialogResult}
    resetDialog={resetDialogContext}
    />
  );
}
