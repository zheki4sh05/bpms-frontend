import { Box } from "@mui/material";
import WorkerOverviewPage from "./WorkerOverviewPage";
import DialogEntityProvider from "../DialogEntityProvider";
import CustomTable from "../CustomTable";
import AsideDrawer from "../AsideBox/AsideDrawer";
import { useSelector } from "react-redux";
import { getWorkersList, getWorkersStatus } from "../../Store/slices/workersSlice";
import { useMemo } from "react";
import { getEmail } from "../../Store/slices/appUserSlice";
import EntityOverviewWindow from "../EntityOverviewWindow";

function StaffTable() {

  const email = useSelector(getEmail)
  const list =  useSelector(getWorkersList);
    const staffList = useMemo(() => list.filter(item=>item.email!=email), [list]);
    console.log(staffList)
  
      return ( 
      <Box>
        <DialogEntityProvider>
  
          <CustomTable
         
            rows={staffList}
            tableTitle="Персонал"
            tableHeadCells={[

           
                  {
                    id: 'firstname',
                    numeric: false,
                    disablePadding: false,
                    label: 'Имя',
                  },
                  {
                    id: 'lastname',
                    numeric: false,
                    disablePadding: false,
                    label: 'Фамилия',
                  },
                  {
                    id: 'role',
                    numeric: true,
                    disablePadding: false,
                    label: 'Роль в компании',
                  },
                  {
                    id: 'email',
                    numeric: true,
                    disablePadding: false,
                    label: 'email',
                  },
                  {
                    id:'position',
                    numeric: true,
                    disablePadding: false,
                    label: 'Должность',
                  }
            ]}
        
            />
  
  
            <AsideDrawer
              anchorProp="right"
              content={<EntityOverviewWindow
              title={"сотрудники"}
              accordionBodyType={"staff"}
              />}
              widthLevel={1}
            />
        </DialogEntityProvider>
     
      </Box>
       )
}
export default StaffTable;