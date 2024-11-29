import CreateEntity from "./CreateEntity";
import AssignmentDescription from "./AssignmentComponents/AssignmentDescription";
import AddFiles from "./AssignmentComponents/AddFiles";
import AboutAssignment from "./AssignmentComponents/AboutAssignment";
import Workers from "./AssignmentComponents/Workers";
import { useSelector } from "react-redux";
import { getProjects } from "../Store/slices/projectSlice";
import { useDispatch } from "react-redux";
import { getToken } from "../Store/slices/appUserSlice";
import { useContext, useEffect } from "react";
import DialogContext from "./DialogContext";
import {
  createAssignment,
  getAssignmentsList,
  getCreatedAssignStatus,
  resetCreatedAssignStatus,
} from "../Store/slices/assignmentSlice";
import statusTypes from "../API/status";
import UserDatePicker from "../Containers/CreateProjects/UserDatePicker";
import AssignmnetTasks from "./AssignmentComponents/AssignmentTasks";
import ReportsSelect from "./AssignmentComponents/ReportsSelect";
import DocumentsSelect from "./AssignmentComponents/DocumentsSelect";

function CreateAssignment({ reloadHandler }) {
  const { data, getDialogResult, resetDialogContext } =
    useContext(DialogContext);

  const createdStatus = useSelector(getCreatedAssignStatus);

  const projects = useSelector(getProjects);

  const dispatch = useDispatch();

  const token = useSelector(getToken);

  const handleSaveCreatedAssign = () => {
    console.log(data);

    //   const formData = new FormData()
    //   console.log(data.documents)
    //   data.documents.forEach((doc,index)=>{
    //     formData.append(`documents[${index}]`, doc)
    //   })
    //   console.log(data.aboutAssign)
    //   formData.append('projectId', data.aboutAssign.projectId)
    //   formData.append("specialization", data.aboutAssign.specialization)
    //   console.log(data.assignDesc)
    //   formData.append("desc", data.assignDesc.desc)
    //   formData.append("name", data.assignDesc.name)
    //   formData.append("finishDate", data.deadline.finishDate)
    //   formData.append("startDate", data.deadline.startDate)
    //   console.log(formData.get("finishDate"))
    //   data.reports.forEach((rep,index)=>{
    //     formData.append(`reports[${index}]`, rep)
    //     // formData.append(`reports[${index}].accessType`, rep.accessType)
    //     // formData.append(`reports[${index}].downloadAt`, rep.downloadAt)
    //     // formData.append(`reports[${index}].format`, rep.format)
    //     // formData.append(`reports[${index}].id`, rep.id)
    //     // formData.append(`reports[${index}].name`, rep.name)
    //     // formData.append(`reports[${index}].projectId`, 0)
    //     // formData.append(`reports[${index}].size`, rep.size)
    //     // formData.append(`reports[${index}].users`, 0)
    //   })
    //   data.tasks.forEach((t,index)=>{
    //     formData.append(`tasks[${index}].val`, t.val)
    //     formData.append(`tasks[${index}].isDone`, t.isDone)
    //     formData.append(`tasks[${index}].id`, t.id)
    //   })
    //   formData.append("email", data.workers.email)
    //   formData.append("id", data.workers.id)
    //  console.log(formData.get("email"))
    // dispatch(createAssignment({
    //   assignment:{formData},
    //   token

    // }))
    dispatch(
      createAssignment({
        assignment: {
          documents: data.documents,
          projectId: data.aboutAssign.projectId,
          specialization: data.aboutAssign.specialization,
          desc: data.assignDesc.desc,
          name: data.assignDesc.name,
          finishDate: data.deadline.finishDate,
          startDate: data.deadline.startDate,
          reports: data.reports,
          tasks: data.tasks,
          id: data.workers.id,
        },
        token,
      })
    );
  };

  if (createdStatus === statusTypes.succeeded) {
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
          "Шаблоны отчетов",
          "Прикрепить файлы",
        ]}
        stepsPages={[
          <AboutAssignment projects={projects} />,
          <UserDatePicker
            titleFrom="Начать задачу"
            titleTo="Закончить задачу"
          />,
          <Workers />,
          <AssignmentDescription />,
          <AssignmnetTasks />,
          <ReportsSelect />,
          <DocumentsSelect />,
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
