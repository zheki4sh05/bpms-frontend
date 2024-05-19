import { Box } from "@mui/material";
import WorkerOverviewPage from "./WorkerOverviewPage";
import DialogEntityProvider from "../DialogEntityProvider";
import CustomTable from "../CustomTable";
import AsideDrawer from "../AsideBox/AsideDrawer";
import { getStaff } from "../../Store/slices/companySlice";
import { useSelector } from "react-redux";
import { getWorkersList } from "../../Store/slices/workersSlice";

function StaffTable() {


    const staffList = useSelector(getWorkersList)
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
              content={<WorkerOverviewPage/>}
            />
        </DialogEntityProvider>
     
      </Box>
       )
}
export default StaffTable;