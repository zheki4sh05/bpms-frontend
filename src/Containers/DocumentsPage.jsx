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
import { getDocList, getDocsCount, getDocuments, getReportsList } from "../Store/slices/documentsSlice";
import { memo, useEffect, useState } from "react";
import statusTypes from "../API/status";
import { useDispatch } from "react-redux";
import { getToken } from "../Store/slices/appUserSlice";
import { getCompanyName, getCompanyNameValue } from "../Store/slices/companySlice";

const DocumentsPage = memo(()=> {
  const dispatch = useDispatch();
  const token  = useSelector(getToken)
  const companyName = useSelector(getCompanyName);


  const projectsStatus = useSelector(getProjectsLoadedStatus)

  const count = useSelector(getDocsCount)


  function makeProjectRequest(){
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

 function makeRequest(){
  dispatch(getDocList({
    data:{
      type:"document",
      company:companyName,
     
    },
    token:token,
  }))

  dispatch(getReportsList({
    data:{
      type:"report",
      company:companyName
    },
    token:token,
  }))
 }

  useEffect(() => {
    if(projectsStatus !== statusTypes.succeeded){
      makeProjectRequest()
    }
    makeRequest();
    

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
              count: `${count}`,
            },
          ]}
        />
       
          <DocumentTable/>
          
        
       

        <UploadDocument reloadHandler={makeRequest} company={companyName} token={token}/> 
      </Box>
    </DialogEntityProvider>
  );
})

export default DocumentsPage;
