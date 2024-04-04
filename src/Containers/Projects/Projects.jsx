import { Grow, Stack, Typography } from "@mui/material";
import SearchBox from "../../Components/SearchBox/SearchBox";
import CustomTabPanel from "../../Components/CustomTabPanel/CustomTabPanel";
import CustomTable from "../../Components/CustomTable";
import { useState } from "react";
import CreateProject from "../../Components/CreateProject";

function Projects() {

  const [openDialog, setShow] = useState(false);

  const handleOpenDialog=()=>{
    setShow((prevState) => (prevState === false ? true : false));
  }

  return (
    <div>
      <SearchBox
        openDialog={handleOpenDialog}
      />
      <Stack direction="row" sx={{ alignItems: "center", mt: 2 }}>
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


      {
        openDialog ?
        <CreateProject/>
        : null
      }
    </div>
  );
}

export default Projects;
