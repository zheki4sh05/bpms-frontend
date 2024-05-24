import { Box } from "@mui/material";
import DialogEntityProvider from "../DialogEntityProvider";
import CustomTable from "../CustomTable";
import AsideDrawer from "../AsideBox/AsideDrawer";
import { getAssignmentsResults } from "../../Store/slices/assignmentSlice";
import { useSelector } from "react-redux";
import AssignmentOverviewWindow from './AssignmentOverviewWindow';

function AssignmentTable({assignments = []}) {
  console.log("assignments");
  console.log(assignments);

  const statuses = useSelector(getAssignmentsResults) || [];


  const addNew = (arr=[]) => {
    // const result = arr.map(el => {
    //     return { ...el, 
    //       done: statuses.find(status => status.id == el.id).done,
    //       tasks: statuses.find(status => status.id == el.id).workers.length
    //      };
    // });
    return [];
};

  return (
    <Box>
      <DialogEntityProvider>
        <CustomTable
          rows={addNew(assignments)}
          tableTitle="Таблица поручений"
          tableHeadCells={[
            {
              id: "id",
              numeric: true,
              disablePadding: true,
              label: "ID",
            },
            {
              id: "name",
              numeric: false,
              disablePadding: false,
              label: "Название",
            },
            {
              id: "done",
              numeric: true,
              disablePadding: false,
              label: "Выполнено %",
            },
            {
              id: "createdAt",
              numeric: false,
              disablePadding: false,
              label: "Начало",
            },
            {
              id: "deadline",
              numeric: true,
              disablePadding: false,
              label: "Дэдлайн",
            },
            {
              id: "tasks",
              numeric: false,
              disablePadding: false,
              label: "Задачи",
            },
          ]}
        />

        <AsideDrawer
          anchorProp="right"
          content={<AssignmentOverviewWindow />}
        />
      </DialogEntityProvider>
    </Box>
  );
}

export default AssignmentTable;
