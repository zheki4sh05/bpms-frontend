import { useSelector } from "react-redux";
import {
  getCompanyName,
  getRoleInCompany,
  getStaffCount,
} from "../Store/slices/companySlice";
import SearchBox from "../Components/SearchBox/SearchBox";
import SimpleSearhcBox from "../Components/StaffPage/SimpleSearchBox";
import DialogEntityProvider from "../Components/DialogEntityProvider";
import { Box } from "@mui/material";
import PageInfo from "../Components/PageInfo";
import StaffTable from "../Components/StaffPage/StaffTable";
import InviteUser from "../Components/StaffPage/InviteUser";
import { getAllWorkers, getWorkersListLength, getWorkersStatus } from "../Store/slices/workersSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import statusTypes from "../API/status";
import { getToken } from "../Store/slices/appUserSlice";

function StaffPage() {
  const userRoleInCompany = useSelector(getRoleInCompany);
  const staffCount = useSelector(getWorkersListLength);
  const status = useSelector(getWorkersStatus);
  const company = useSelector(getCompanyName);
  const token = useSelector(getToken)
  const dispatch = useDispatch()
  useEffect(() => {
   
      dispatch(getAllWorkers({ data: {companyName:company}, token }));
    
  }, []);

  return (
    <DialogEntityProvider>
      <Box>
        {userRoleInCompany === "admin" ? (
          <SearchBox buttonText={"Пригласить сотрудника"} />
        ) : (
          <SimpleSearhcBox />
        )}

        <PageInfo
          name="Персонал"
          data={[
            {
              name: "Всего",
              count: `${staffCount}`,
            },
          ]}
        />

        <StaffTable />

        <InviteUser />
      </Box>
    </DialogEntityProvider>
  );
}

export default StaffPage;
