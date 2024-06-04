import { Box, Button, Divider, FormControlLabel, Grid, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import Typography from "@mui/material/Typography";
import { memo, useContext, useEffect, useState } from "react";
import DialogContext from "../DialogContext";
import { docForAssignment, getDocForAssignment, getReports } from "../../Store/slices/documentsSlice";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch } from "react-redux";
import { getToken } from "../../Store/slices/appUserSlice";
import DomainNames from "../../Store/DomainNames";

function ChangeAssignmentsReports() {

    const dispatch = useDispatch();

    const company = useSelector(
      (state) => state[DomainNames.company].userCompany.id
    );

    const token = useSelector(getToken)
  
     
  
    const publicReports = useSelector(getReports).filter(item=>item.accessType)

    const reports = useSelector(getDocForAssignment) || [];


    const [checked, setChecked] = useState( data.hasOwnProperty("reports") ? data.reports.map(item=>item) : []);
    const [submit, setSubmit] = useState(false)
    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setSubmit(false)
  
      setChecked(newChecked);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
     
      setSubmit(true)
    };

    function makeRequest(){
        dispatch(docForAssignment({
          data:{
            companyId:company,
            userId: data.worker,
            projectId: data.aboutAssign.projectId,
            type:"report"
          },
          token
        }))
      }
    
      useEffect(() => {
       
          makeRequest();  
    
      }, []);


    const label = { inputProps: { "aria-label": "Checkbox demo" } };
    return ( 

        <Grid container spacing={2}>
        <Grid xs={4} item></Grid>
        <Grid xs={4} item>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Stack spacing={2}>
              {reports.length > 0 || publicReports.length>0 ? (
                <>
                  <Typography>
                    {checked.length == 0
                      ? "Никакие формы отчетов не выбраны"
                      : `Прикреплено: ${checked.length}`}
                  </Typography>
                  <Box sx={{ minHeight: 200, minWidth: 300, flexGrow: 1 }}>
             
              <Typography>Отчеты компании:</Typography>
                    <List
                      dense
                      sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                      }}
                    >
                      {publicReports.map((value,index) => {
                       
                        return (
                          <ListItem
                            key={index}
                          
                            
                          >
                          <FormControlLabel
                              onChange={handleToggle(value.id)}
                              control={<Checkbox {...label} checked={checked.indexOf(value.id) !== -1} />}
                              label={value.name + "."+value.format}
                            
                            />
                          </ListItem>
                        );
                      })}
                    </List>     
                  
                    <Typography>Шаблоны отчетов проекта:</Typography>
  
                    {reports.length>0 ? 
                    
                    
                    <List
                    dense
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                  >
                    {reports.map((value,index) => {
                     
                      return (
                        <ListItem
                          key={index}
                        
                          
                        >
                        <FormControlLabel
                            onChange={handleToggle(value)}
                            control={<Checkbox {...label} checked={checked.indexOf(value.id) !== -1} />}
                            label={value.name + "."+value.format}
                          
                          />
                        </ListItem>
                      );
                    })}
                  </List>
                  :
                  <Typography>Отсутствуют</Typography>
                    
                    }
  
                  
                  </Box>
                </>
              ) : (
                <Typography>Библиотека отчетов пуста</Typography>
              )}
            </Stack>
            <Divider />
            <Box sx={{ mt: 2 }}>
              <Button
                onClick={handleSubmit}
                fullWidth
                variant="contained"
                disabled={checked.length == 0 || submit==true}
                sx={{ mt: 3, mb: 2, width: "120px" }}
              >
                Сохранить
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid xs={4} item></Grid>
      </Grid>

     );
}

export default ChangeAssignmentsReports;