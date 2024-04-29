import * as React from "react";
import AboutProject from "../Containers/CreateProjects/AboutProject";
import UserDatePicker from "../Containers/CreateProjects/UserDatePicker";
import WorkersListControl from "../Containers/CreateProjects/WorkersListControl";
import CreateEntity from "./CreateEntity";
import { useContext } from "react";
import DialogContext from './DialogContext';

export default function CreateProject() {

  const {data} = useContext(DialogContext)

  const handleSaveCreatedProject=()=>{
    //задиспатчить сохранение
  }

  return (
    <CreateEntity
    stepsNames={["О проекте", "Настройки", "Участники"]}
    stepsPages={[<AboutProject />, <UserDatePicker />, <WorkersListControl />]}
    name={"Создание проекта"}
    handleSaveContext={handleSaveCreatedProject}
    />
  );
}
