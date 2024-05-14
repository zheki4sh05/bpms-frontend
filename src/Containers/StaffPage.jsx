import { useSelector } from "react-redux";
import { getRoleInCompany, getStaffCount } from "../Store/slices/companySlice";
import SearchBox from "../Components/SearchBox/SearchBox";
import SimpleSearhcBox from "../Components/StaffPage/SimpleSearchBox";
import DialogEntityProvider from "../Components/DialogEntityProvider";
import { Box } from "@mui/material";
import PageInfo from "../Components/PageInfo";
import StaffTable from "../Components/StaffPage/StaffTable";
import InviteUser from "../Components/StaffPage/InviteUser";

function StaffPage() {
  const userRoleInCompany = useSelector(getRoleInCompany);
  const staffCount = useSelector(getStaffCount)

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

        <InviteUser/>
      </Box>
    </DialogEntityProvider>
  );
}

export default StaffPage;
