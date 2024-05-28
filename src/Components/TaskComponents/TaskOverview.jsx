import { Box, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import DialogContext from "../DialogContext";
import { useDispatch } from "react-redux";
import { fetchTaskById, getTaskStatus, getTasksError } from "./../../Store/slices/tasksSlice";
import { useSelector } from "react-redux";
import { getToken } from "../../Store/slices/appUserSlice";
import StatusContent from './../../Util/statusContent';

function TaskOverview() {
  const token = useSelector(getToken);

  const { data } = useContext(DialogContext);

  const status  = useSelector(getTaskStatus);

  const errorMessage = useSelector(getTasksError)

  const dispatch = useDispatch();

  function makeRequest() {
    dispatch(
      fetchTaskById({
        data: {
          id: data.taskId,
        },
        token,
      })
    );
  }

  useEffect(() => {
    makeRequest();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
     
      <Typography variant="subtitle1" gutterBottom>
        Анализ задачи: {data.taskName}
      </Typography>

      <StatusContent
            result={status}
            errorDomain={""}
            errorCode={errorMessage ? errorMessage.message : ""}
            loadingType={""}
            successType={"none"}
            errorType={"primary"}
          />

    </Box>
  );
}

export default TaskOverview;
