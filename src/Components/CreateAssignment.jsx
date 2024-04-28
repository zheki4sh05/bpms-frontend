import { Box } from "@mui/material";
import CreateEntity from "./CreateEntity";
import Description from "./AssignmentComponents/AssignmentDescription";
import Deadline from "./AssignmentComponents/Deadline";
import AssignmentDescription from "./AssignmentComponents/AssignmentDescription";
import FormCreator from "./AssignmentComponents/FormCreator";
import AddFiles from "./AssignmentComponents/AddFiles";
import AboutAssignment from "./AssignmentComponents/AboutAssignment";
import ToDoList from "./AssignmentComponents/ToDoList";
import Workers from "./AssignmentComponents/Workers";

function CreateAssignment() {
  return (
    <>
      <CreateEntity
        stepsNames={[
          "О поручении",
          "Дедлайн",
          "Описание",
          "Создать чек-лист",
          "Исполнители",
          "Форма-отчет",
          "Прикрепить файлы",
        ]}
        stepsPages={[
          <AboutAssignment projects={["Проект 1", "Проект 2"]} />,
          <Deadline />,
          <AssignmentDescription />,
          <ToDoList />,
          <Workers />,
          <FormCreator />,
          <AddFiles />,
        ]}
        name={"Создание поручения"}
      />
    </>
  );
}

export default CreateAssignment;
