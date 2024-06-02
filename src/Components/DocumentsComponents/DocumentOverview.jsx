import { Box } from "@mui/material";
import { memo} from "react";
import CustomTabPanel from './../CustomTabPanel/CustomTabPanel';
import ChangeDocumentSettings from "./ChangeDocumentSettings";
import ChangeAssignments from "./ChangeAssignmentsю";


const DocumentOverview=memo(({doc})=> {

 
    console.log(doc)
    return ( <Box sx={{backgroundColor:"white", borderRadius:"3px", p:1}}>
           
           <CustomTabPanel
              content={{
                tabNames: ["Настройки", "Поручения"],
              }}
            >
              <ChangeDocumentSettings doc={doc}/>

              <ChangeAssignments />

            </CustomTabPanel>     


    </Box> );
})

export default DocumentOverview;