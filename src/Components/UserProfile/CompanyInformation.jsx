import { Divider, List, ListItem, Typography } from "@mui/material";
import EditCompanyDesc from "../../Containers/AboutCompany/EditCompanyDesc";
import CustomTabPanel from "../CustomTabPanel/CustomTabPanel";
import CompanySpecializations from './CompanySpecializations';

function CompanyInformation() {
  return (
    <>
      <CustomTabPanel
        content={{
          tabNames: ["О компании", "Специализации"],
        }}
      >
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <ListItem alignItems="flex-start">
            <EditCompanyDesc />
          </ListItem>
          {/* <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">1</ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">2</ListItem> */}
        </List>

        <CompanySpecializations/>



      </CustomTabPanel>
    </>
  );
}

export default CompanyInformation;
