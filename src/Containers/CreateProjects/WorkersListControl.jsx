import { Box, Container, Divider, Typography } from "@mui/material";
import WorkersList from './WorkersList';
import LeadersList from "./LeadersList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllWorkers, getFetchWorkersErrorMessage, getWorkersList, getWorkersStatus } from "../../Store/slices/workersSlice";
import { useSelector } from "react-redux";
import StatusContent from './../../Util/statusContent';

function WorkersListControl() {

  const dispatch  = useDispatch();

  const allWorkers = useSelector(getWorkersList)

  const status = useSelector(getWorkersStatus)
 //const errorMessage = useSelector(getFetchWorkersErrorMessage)
 const errorMessage="EMPTY_LIST"
  useEffect(() => {
    dispatch(getAllWorkers())
  },[]);

  return <Container maxWidth="sm">
    <Box>
      <Divider/>
      <Typography component="h2">
            Сотрудники
      </Typography>
      <Box sx={{display:"flex", justifyContent:"center"}}>
        {
          allWorkers.length!== 0 ? 
               <WorkersList/>
              :
              <Typography component="subtitle2">
              В вашей компании нет сотрудников 
        </Typography>
        }
        <StatusContent
          result={status}
          errorDomain={'workers'}
          errorCode={errorMessage}
          loadingType={'skeletons'}
          successType={'primary'}
          errorType={'primary'}

        />
      
      </Box>
       

    </Box>

  </Container>;
}

export default WorkersListControl;
