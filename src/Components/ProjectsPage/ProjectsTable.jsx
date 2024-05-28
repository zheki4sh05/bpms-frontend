import { useSelector } from "react-redux";
import {getProjectsResults } from "../../Store/slices/projectSlice";
import CustomTable from "../CustomTable";
import { Box } from "@mui/material";
import { useState } from "react";
import DialogEntityProvider from "../DialogEntityProvider";
import AsideDrawer from "../AsideBox/AsideDrawer";
import ProjectOverviewWindow from "./ProjectOverviewWindow";

function ProjectsTable({projects=[]}) {
  console.log("ProjectsTable")
  console.log(projects)
  
  const statuses = useSelector(getProjectsResults) || [];

  console.log(statuses)

  const addNew = (arr=[], st=[]) => {
    const result = arr.map((el) => {
      console.log(st.find(status => status.id == el.id))
        return { ...el, 
          done: st.find(status => status.id == el.id).done,
          workers: st.find(status => status.id == el.id).workers.length
         };
    });
    return result;
};

    return ( 
    <Box>
      <DialogEntityProvider>

        <CustomTable
       
          rows={addNew(projects,statuses)}
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
                  id: 'createdAt',
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
            widthLevel={1}
          />
      </DialogEntityProvider>
   
    </Box>
     );
}

export default ProjectsTable;