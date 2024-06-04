import { Box } from "@mui/material";
import DialogEntityProvider from "../DialogEntityProvider";
import CustomTable from "../CustomTable";
import AsideDrawer from "../AsideBox/AsideDrawer";
import { getAssignmentsResults } from "../../Store/slices/assignmentSlice";
import { useSelector } from "react-redux";
import AssignmentOverviewWindow from './AssignmentOverviewWindow';
import EntityOverviewWindow from "../EntityOverviewWindow";

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
    return assignments;
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
              id: "statusName",
              numeric: true,
              disablePadding: false,
              label: "Статус",
            },
            {
              id: "createdAt",
              numeric: false,
              disablePadding: false,
              label: "Создано",
            },
            {
              id: "deadline",
              numeric: true,
              disablePadding: false,
              label: "Дэдлайн",
            },
            {
              id: "stageName",
              numeric: false,
              disablePadding: false,
              label: "Стадия",
            },
          ]}
        />

        <AsideDrawer
          anchorProp="right"
          widthLevel={1}
          content={<EntityOverviewWindow
            
            accordionBodyType={"assignment"}
            title={"поручения"}

          />}
        />
      </DialogEntityProvider>
    </Box>
  );
}

export default AssignmentTable;
