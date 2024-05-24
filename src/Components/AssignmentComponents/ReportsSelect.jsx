import { Box, Button, Divider, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import DialogContext from "../DialogContext";
import { getAllReports } from "../../Store/slices/documentsSlice";

function ReportsSelect() {

    const { data, setDataHandler } = useContext(DialogContext);  

  const reports = useSelector(getAllReports) | [];

  const [lastSelectedItem, setLastSelectedItem] = useState([]);

  const handleItemSelectionToggle = (event, itemId, isSelected) => {
    if (isSelected) {
      let currentState = [...lastSelectedItem];

      currentState.push(itemId);

      setLastSelectedItem(currentState);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setDataHandler({...data, reports:lastSelectedItem});
    // setSubmited(true)
  };



  return (




      <Grid container spacing={2}>
        <Grid xs={4}>
         
        </Grid>
        <Grid xs={4}>
          <Box sx={{display:"flex", justifyContent:"center", mt:4}}>
          <Stack spacing={2}>
        {reports.length > 0 ? (
          <>
            <Typography>
              {lastSelectedItem == null
                ? "Никакие формы отчетов не выбраны"
                : `Выбрано: ${lastSelectedItem.map(
                    (item,
                    (index) => <Typography key={index}>{item}</Typography>)
                  )}`}
            </Typography>
            <Box sx={{ minHeight: 200, minWidth: 300, flexGrow: 1 }}>
              <SimpleTreeView onItemSelectionToggle={handleItemSelectionToggle}>
                {reports.map((report, index) => (
                  <TreeItem itemId={report.name} label={report.name}>
                    {report.list.map((item, index) => {
                      <TreeItem key={index} itemId={item} label={item} />;
                    })}
                  </TreeItem>
                ))}
              </SimpleTreeView>
            </Box>
          </>
        ) : <Typography>
                Библиотека отчетов пуста
          </Typography>}
      </Stack>
      <Divider/>
      <Box sx={{mt:2}} >
      <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            disabled={lastSelectedItem.length==0}
            sx={{ mt: 3, mb: 2, width:"120px" }}

             

          >
            Сохранить
          </Button>
      </Box>
          </Box>
     
        </Grid>
        <Grid xs={4}>
          
        </Grid>
      </Grid>



 
     

  );
}

export default ReportsSelect;
