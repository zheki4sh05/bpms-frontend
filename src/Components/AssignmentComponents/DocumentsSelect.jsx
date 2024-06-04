import { Box, Button, Divider, FormControlLabel, Grid, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useSelector } from "react-redux";
import Stack from "@mui/material/Stack";

import Typography from "@mui/material/Typography";
import { memo, useContext, useEffect, useState } from "react";
import DialogContext from "../DialogContext";
import { docForAssignment, getDocForAssignment, getDocuments } from "../../Store/slices/documentsSlice";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch } from "react-redux";
import { getToken } from "../../Store/slices/appUserSlice";
import DomainNames from "../../Store/DomainNames";

const DocumentsSelect=memo(()=> {
  const { data, setDataHandler } = useContext(DialogContext);
  const company = useSelector(
    (state) => state[DomainNames.company].userCompany.id
  );
  const documents = useSelector(getDocForAssignment) || [];
  const publicDocuments = useSelector(getDocuments).filter(item=>item.accessType)
  const token = useSelector(getToken)


  // const handleItemSelectionToggle = (event, itemId, isSelected) => {
  //   if (isSelected) {
  //     let currentState = [...lastSelectedItem];

  //     currentState.push(itemId);

  //     setLastSelectedItem(currentState);
  //   }
  // };

  const dispatch = useDispatch();

  const [checked, setChecked] = useState(data.hasOwnProperty("documents") ? data.documents.map(item=>item) : []);
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

    setDataHandler({ ...data, documents: checked });
    setSubmit(true)
  };

  function makeRequest(){
    dispatch(docForAssignment({
      data:{
        companyId:company,
        userId: data.workers.id,
        projectId: data.aboutAssign.projectId,
        type:"document"
      },
      token
    }))
  }

  useEffect(() => {
    if (data.hasOwnProperty("aboutAssign") && data.hasOwnProperty("workers")) {

      makeRequest();

    }
  
    
  }, []);

  console.log(checked)
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <Grid container spacing={2}>
      <Grid xs={4} item></Grid>
      <Grid xs={4} item>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Stack spacing={2}>
            {documents.length > 0 || publicDocuments.length>0 ? (
              <>
                <Typography>
                  {checked.length == 0
                    ? "Никакие формы отчетов не выбраны"
                    : `Выбрано: ${checked.length}`}
                </Typography>
                <Box sx={{ minHeight: 200, minWidth: 300, flexGrow: 1 }}>
                  {/* <SimpleTreeView onItemSelectionToggle={handleItemSelectionToggle}>
               
                  <TreeItem itemId={1} label={"Документы"} key={index}>
                    {report.list.map((item, index) => {
                      <TreeItem key={index} itemId={item} label={item} />;
                    })}
                  </TreeItem>
           

                  <TreeItem itemId={2} label={"Шаблоны отчетов"}>
                    {reports.map((item, index) => {
                      <TreeItem key={index} itemId={item} label={item} />;
                    })}
                  </TreeItem>
              </SimpleTreeView> */}


            <Typography>Документы компании:</Typography>
                  <List
                    dense
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                  >
                    {publicDocuments.map((value,index) => {
                     
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
                
                  <Typography>Документы в рамках проекта:</Typography>

                  {documents.length>0 ? 
                  
                  
                  <List
                  dense
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  {documents.map((value,index) => {
                   
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
                :
                <Typography>Отсутствуют</Typography>
                  
                  }

                
                </Box>
              </>
            ) : (
              <Typography>Библиотека файлов пуста</Typography>
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
})

export default DocumentsSelect;
