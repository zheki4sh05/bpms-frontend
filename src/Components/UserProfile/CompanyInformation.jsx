import { Divider, List, ListItem } from "@mui/material";
import EditCompanyDesc from "../../Containers/AboutCompany/EditCompanyDesc";

function CompanyInformation() {
    return ( 
        <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListItem alignItems="flex-start">
        
           <EditCompanyDesc/>
        
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
         1
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          2
        </ListItem>
      </List>

    );
}

export default CompanyInformation;