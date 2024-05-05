import { useSelector } from "react-redux";
import { getProjects } from "../../Store/slices/projectSlice";
import CustomTable from "../CustomTable";
import { Box } from "@mui/material";
import { useState } from "react";
import DialogEntityProvider from "../DialogEntityProvider";
import AsideDrawer from "../AsideBox/AsideDrawer";
import ProjectOverviewWindow from "./ProjectOverviewWindow";

function ProjectsTable() {



    const projects = useSelector(getProjects) || [];


    console.log(projects)

    // function getRows(data=[]){
    //   return data.forEach(project => {
    //         return {
    //             id:project.id,
    //             name:project.name,
    //             done:project.done,
    //             finish:project.finish,
    //             workers:project.workers,
    //             role:project.role,
    //             access:project.access
    //         }
    //     });
    // }

    return ( 
    <Box>
      <DialogEntityProvider>

        <CustomTable
          
          rows={projects}
          tableTitle="Проекты"
          tableHeadCells={[
              {
                  id: 'id',
                  numeric: true,
                  disablePadding: true,
                  label: 'ID',
                },
                {
                  id: 'name',
                  numeric: false,
                  disablePadding: false,
                  label: 'Название',
                },
                {
                  id: 'done',
                  numeric: true,
                  disablePadding: false,
                  label: 'Выполнено %',
                },
                {
                  id: 'start',
                  numeric: true,
                  disablePadding: false,
                  label: 'Начало',
                },
                {
                  id: 'workers',
                  numeric: true,
                  disablePadding: false,
                  label: 'Участников',
                },
                {
                  id: 'role',
                  numeric: false,
                  disablePadding: false,
                  label: 'Роль',
                },
                {
                  id: 'access',
                  numeric: false,
                  disablePadding: false,
                  label: 'Тип приватности',
                },
          ]}
      
          />


          <AsideDrawer
            anchorProp="right"
            content={<ProjectOverviewWindow/>}
          />
      </DialogEntityProvider>
   
    </Box>
     );
}

export default ProjectsTable;