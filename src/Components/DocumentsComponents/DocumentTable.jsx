import { Box, Typography } from "@mui/material";
import DialogEntityProvider from "../DialogEntityProvider";
import CustomTable from "../CustomTable";
import AsideDrawer from "../AsideBox/AsideDrawer";
import DocumentOverview from "./DocumentOverview";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from "react";
import { getDocuments, getReports } from "../../Store/slices/documentsSlice";
import { useSelector } from "react-redux";
import EntityOverviewWindow from "../EntityOverviewWindow";
function DocumentTable() {

  const documents = useSelector(getDocuments) || []
  const reports = useSelector(getReports) || []

  const ALL="all"
  const DOCS="docs"
  const REPS="reps"

  const [alignment, setAlignment] = useState(ALL);

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
    setAlignment(newAlignment);
    }
  };

  function sortDocsByType(type){
    switch(type){
      case ALL:{
        return [...documents,...reports]
      }
      case DOCS:{
        return documents
      }
      case REPS:{
        return reports
      }
    }
  }


    return ( 
      <> { documents.length>0 || reports.length>0 ?
        <Box>
        <Box sx={{bgcolor:"white", p:"5px 5px 10px 5px",mb:"-5px", borderRadius:"3px", width:"255px"}}>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
            <ToggleButton value={ALL}>Все </ToggleButton>
            <ToggleButton value={DOCS}>Документы</ToggleButton>
            <ToggleButton value={REPS}>Отчеты</ToggleButton>
        </ToggleButtonGroup>
        </Box>
       
  
          <DialogEntityProvider>
          <CustomTable
            rows={sortDocsByType(alignment)}
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
                id: "format",
                numeric: true,
                disablePadding: false,
                label: "Формат",
              },
              {
                id: "downloadAt",
                numeric: false,
                disablePadding: false,
                label: "Загружено",
              },
              {
                id: "access",
                numeric: true,
                disablePadding: false,
                label: "Доступ",
              },
              {
                id: "size",
                numeric: false,
                disablePadding: false,
                label: "Размер (MB)",
              },
            ]}
          />
  
          <AsideDrawer
          widthLevel={1}
            anchorProp="right"
            content={<EntityOverviewWindow
            
              accordionBodyType={"document"}
              title={"документы"}

            />}
          />
        </DialogEntityProvider>
      </Box> 
      :
      <Typography>У вас нет доступных документов, либо они еще не загружены</Typography>
      }
      
      </>
   
    );
}

export default DocumentTable;