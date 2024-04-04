import { Stack, Typography } from "@mui/material";
import SearchBox from "../Components/SearchBox/SearchBox";
import CustomTabPanel from "../Components/CustomTabPanel/CustomTabPanel";
import CustomTable from "../Components/CustomTable";

function MyTasksPage() {
    return ( 
        <div>
        <SearchBox />
        <Stack direction="row" sx={{ alignItems: "center", mt: 2 }}>
          <Typography variant="h5" gutterBottom>
            Мои задачи
          </Typography>
          <Typography variant="subtitle1" gutterBottom sx={{ ml: 2 }}>
           выполнено:0
          </Typography>
          <Typography variant="subtitle1" gutterBottom sx={{ ml: 2 }}>
            надо сделать:0
          </Typography>
          <Typography variant="subtitle1" gutterBottom sx={{ ml: 2 }}>
            в процессе:0
          </Typography>
        </Stack>
        <CustomTabPanel
          content={{
            tabNames: ["Список", "Гант", "Сроки", "Календарь", "Канбан"],
          }}
        >
          <CustomTable/>
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
      </div>
     );
}

export default MyTasksPage;