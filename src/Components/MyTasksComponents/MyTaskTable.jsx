import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { getAssignmentsList } from "../../Store/slices/assignmentSlice";
import { getId } from "../../Store/slices/appUserSlice";
import DialogEntityProvider from "../DialogEntityProvider";
import CustomTable from "../CustomTable";
import EntityOverviewWindow from "../EntityOverviewWindow";
import AsideDrawer from "../AsideBox/AsideDrawer";

function MyTaskTable() {

    const myId = useSelector(getId);


    const myTasks = useSelector(getAssignmentsList).filter(item=>item.worker == myId)



    // function processData(list){
    //     let mass = []

    //     list.forEach(item => {
    //         mass.push({
    //             ...item,

    //         })
    //     });
    // }

    return ( 


        <> { myTasks.length>0 ?
            <Box>
          
           
              <DialogEntityProvider>
              <CustomTable
                rows={myTasks}
                tableTitle="Таблица документов"
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
                    id: "stageName",
                    numeric: true,
                    disablePadding: false,
                    label: "Стадия",
                  },
                  {
                    id: "deadline",
                    numeric: false,
                    disablePadding: false,
                    label: "Срок",
                  },
                  {
                    id: "statusName",
                    numeric: true,
                    disablePadding: false,
                    label: "Статус",
                  },
                  {
                    id: "projectName",
                    numeric: false,
                    disablePadding: false,
                    label: "Проект",
                  },
                  {
                    id: "userEmail",
                    numeric: false,
                    disablePadding: false,
                    label: "Постановщик",
                  },
                ]}
              />
      
              <AsideDrawer
              widthLevel={1}
                anchorProp="right"
                content={<EntityOverviewWindow
                
                  accordionBodyType={"myTasks"}
                  title={"Мои задачи"}
    
                />}
              />
            </DialogEntityProvider>
          </Box> 
          :
          <Typography>Нет назначенных Вам задач</Typography>
          }
          
          </>


     );
}

export default MyTaskTable;