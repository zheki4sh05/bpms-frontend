import { Box } from "@mui/material";
import SearchBox from "./../Components/SearchBox/SearchBox";
import CustomTable from "./../Components/CustomTable";
import CustomTabPanel from "./../Components/CustomTabPanel/CustomTabPanel";
import { useEffect, useMemo, useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PageInfo from "../Components/PageInfo";
import CreateAssignment from "../Components/CreateAssignment";
import DialogContext from "../Components/DialogContext";
import DialogEntityProvider from "../Components/DialogEntityProvider";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getEmail, getId, getToken } from "../Store/slices/appUserSlice";
import { getAllUserAssignmentsStatuses, getAllUserAssignmnets, getAssignmentsList } from "../Store/slices/assignmentSlice";
import AssignmentTable from './../Components/AssignmentComponents/AssignmentTable';
import { getRoleInCompany } from "../Store/slices/companySlice";

function AssignmentsPage() {

  const useremail = useSelector(getEmail)

  const token = useSelector(getToken)

  const userId = useSelector(getId);

  const assignmentsResult = useSelector(getAssignmentsList) || []

  const assignments = assignmentsResult.filter(item=>item.user == userId)

  const role  = useSelector(getRoleInCompany)

  function makeRequest(){
    dispatch(
      getAllUserAssignmnets({
        data: {
          userEmail:useremail,
          role:role,
          size:""
        },
        token,
      })
    );
    // dispatch(
    //   getAllUserAssignmentsStatuses({
    //     data: {
    //       useremail,
    //     },
    //     token,
    //   })
    // );
  }

  const dispatch = useDispatch();
  useEffect(() => {
    makeRequest(); 
  }, []);

  return (
    <DialogEntityProvider>
      <Box>
        <SearchBox buttonText={"Назначить"} />

        <PageInfo
          name="Поручения"
          data={[
            {
              name: "Всего",
              count: `${assignments.length}`,
            },
          ]}
        />

        <CustomTabPanel
          content={{
            tabNames: ["Список", "Календарь", "Канбан"],
          }}
        >
          <AssignmentTable assignments={assignments}/>
          <Typography variant="h5" gutterBottom>
            контент 1
          </Typography>
        
          <Typography variant="h5" gutterBottom>
            контент 3
          </Typography>
          <Typography variant="h5" gutterBottom>
            контент 4
          </Typography>
        </CustomTabPanel>

        <CreateAssignment 
        
          reloadHandler={makeRequest}
        />
      </Box>
    </DialogEntityProvider>
  );
}

export default AssignmentsPage;
