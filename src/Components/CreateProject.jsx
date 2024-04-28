import * as React from "react";
import AboutProject from "../Containers/CreateProjects/AboutProject";
import UserDatePicker from "../Containers/CreateProjects/UserDatePicker";
import WorkersListControl from "../Containers/CreateProjects/WorkersListControl";
import CreateEntity from "./CreateEntity";

export default function CreateProject() {

  return (
    <CreateEntity
    stepsNames={["О проекте", "Настройки", "Участники"]}
    stepsPages={[<AboutProject />, <UserDatePicker />, <WorkersListControl />]}
    name={"Создание проекта"}
    />
  );
}
