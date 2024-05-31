import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import DialogEntityProvider from "../Components/DialogEntityProvider";
import SearchBox from "../Components/SearchBox/SearchBox";
import PageInfo from "../Components/PageInfo";
import CustomTabPanel from "../Components/CustomTabPanel/CustomTabPanel";
import DocumentTable from "../Components/DocumentsComponents/DocumentTable";
import UploadDocument from "../Components/DocumentsComponents/UploadDocument";
import { useSelector } from "react-redux";
import { getAllProjectsStatuses, getAllUserProjects, getProjects, getProjectsLoadedStatus } from "../Store/slices/projectSlice";
import { getDocuments } from "../Store/slices/documentsSlice";
import { useEffect, useState } from "react";
import statusTypes from "../API/status";
import { useDispatch } from "react-redux";
import { getToken } from "../Store/slices/appUserSlice";
import { getCompanyName } from "../Store/slices/companySlice";

function DocumentsPage() {
  const dispatch = useDispatch();
  const token  = useSelector(getToken)
  const companyName = useSelector(getCompanyName);


  const projectsStatus = useSelector(getProjectsLoadedStatus)




  function makeRequest(){
    dispatch(
      getAllUserProjects({
        data: {
          companyName,
        },
        token,
      })
    );
    dispatch(
      getAllProjectsStatuses({
        data: {
          companyName,
        },
        token,
      })
    );
  }

 

  useEffect(() => {
    if(projectsStatus !== statusTypes.succeeded){
      makeRequest()
    }
  }, []);

  // useEffect(() => {
  //   dispatch()
  // }, []);

  return (
    <DialogEntityProvider>
      <Box>
        <SearchBox buttonText={"Загрузить"} />

        <PageInfo
          name="Документы"
          data={[
            {
              name: "Доступно",
              count: "0",
            },
          ]}
        />

        {/* {projects.length > 0 ? (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Выбрать область
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={projects[0].name}
              label="Выбрать специализацию"
              onChange={handleProjectChange}
            >
              {projects.map((item, index) => (
                <MenuItem value={index.name} key={index}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <Typography>У вас нет проектов</Typography>
        )} */}
       
          <DocumentTable/>
          
        
       

        <UploadDocument reloadHandler={makeRequest} /> 
      </Box>
    </DialogEntityProvider>
  );
}

export default DocumentsPage;
