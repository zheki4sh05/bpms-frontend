import { Box } from "@mui/material";
import DialogEntityProvider from "../DialogEntityProvider";
import CustomTable from "../CustomTable";
import AsideDrawer from "../AsideBox/AsideDrawer";
import DocumentOverview from "./DocumentOverview";

function DocumentTable({documents=[]}) {
    return ( 
    <Box>
        <DialogEntityProvider>
        <CustomTable
          rows={documents}
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
              label: "Размер",
            },
          ]}
        />

        <AsideDrawer
          anchorProp="right"
          content={<DocumentOverview/>}
        />
      </DialogEntityProvider>
    </Box> 
    );
}

export default DocumentTable;