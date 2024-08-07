import { Box, Container, Divider, Typography } from "@mui/material";
import WorkersList from "./WorkersList/WorkersList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getAllWorkers,
  getFetchWorkersError,
  getWorkersList,
  getWorkersStatus,
} from "../../Store/slices/workersSlice";
import { useSelector } from "react-redux";
import StatusContent from "./../../Util/statusContent";
import { getCompanyName } from "../../Store/slices/companySlice";
import { getEmail, getToken } from "../../Store/slices/appUserSlice";

function WorkersListControl() {
  const company = useSelector(getCompanyName);

  const dispatch = useDispatch();

  const email = useSelector(getEmail)

  const allWorkers = useSelector(getWorkersList).filter(item=>item.email!=email);

  const status = useSelector(getWorkersStatus);

  const token = useSelector(getToken);
  const errorMessage = useSelector(getFetchWorkersError);
  useEffect(() => {
    dispatch(
      getAllWorkers({
        data: {
          companyName: company,
        },
        token,
      })
    );
  },[]);

  return (
    <Container maxWidth="sm">
      <Box>
        <Divider />
        <Typography component="h2">Сотрудники</Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {allWorkers.length !== 0 ? (
            <WorkersList 
            dataMembers={allWorkers}
            />
          ) : (
            <Typography component="subtitle2">
              В вашей компании нет сотрудников
            </Typography>
          )}
         
        </Box>
        <StatusContent
            result={status}
            errorDomain={"workers"}
            errorCode={errorMessage ? errorMessage.message : ""}
            loadingType={"skeletons"}
            successType={"none"}
            errorType={"primary"}
          />
      </Box>
    </Container>
  );
}

export default WorkersListControl;
