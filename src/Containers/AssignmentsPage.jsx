import { Box } from "@mui/material";
import SearchBox from "./../Components/SearchBox/SearchBox";
import CustomTable from "./../Components/CustomTable";
import CustomTabPanel from "./../Components/CustomTabPanel/CustomTabPanel";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PageInfo from "../Components/PageInfo";
import CreateAssignment from "../Components/CreateAssignment";
import DialogContext from "../Components/DialogContext";
import DialogEntityProvider from "../Components/DialogEntityProvider";

function AssignmentsPage() {
  return (
    <DialogEntityProvider>
      <Box>
        <SearchBox buttonText={"Назначить"} />
        {/* <Stack direction="row" sx={{ alignItems: "center", mt: 2 }}>
        <Typography variant="h5" gutterBottom>
          Мои проекты
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ ml: 2 }}>
          я управляю:0
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ ml: 2 }}>
          я управляю:0
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ ml: 2 }}>
          просрочено:0
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ ml: 2 }}>
          готово:0
        </Typography>
      </Stack> */}

        <PageInfo
          name="Поручения"
          data={[
            {
              name: "Всего",
              count: "0",
            },
          ]}
        />

        <CustomTabPanel
          content={{
            tabNames: ["Список", "Плитка", "Календарь", "Проект"],
          }}
        >
          <CustomTable />
          <Typography variant="h5" gutterBottom>
            контент 1
          </Typography>
          <Typography variant="h5" gutterBottom>
            контент 2
          </Typography>
          <Typography variant="h5" gutterBottom>
            контент 3
          </Typography>
          <Typography variant="h5" gutterBottom>
            контент 4
          </Typography>
        </CustomTabPanel>

        <CreateAssignment />
      </Box>
    </DialogEntityProvider>
  );
}

export default AssignmentsPage;
