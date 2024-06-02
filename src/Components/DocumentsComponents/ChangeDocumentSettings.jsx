import { Box } from "@mui/material";
import ToggleDocumentType from "./ToggleDocumentType";
import { useState } from "react";
import CheckboxLabels from "./CheckboxLabels";

function ChangeDocumentSettings({doc}) {


    const [alignment, setAlignment] = useState("documents");

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
      };

      const handleSave=()=>{
        console.log("saved")
      }

      console.log(doc)
      function getState() {
        let initState;
     
          initState = {
            type: doc.type,
            project: doc.project,
            req: doc.byRequest,
            alignment: doc.alignment,
            handleSave: handleSave,
          };
        
        console.log(initState)
        return {...initState};
      }


    return ( <Box>
            <ToggleDocumentType
            
                value={[
                    {
                        type:"documents",
                        name:"Документы"
                    },
                    {
                        type:"reports",
                        name:"Отчеты"
                    }
                ]}
                firstValue={alignment}
                changeHandler={handleChange}
            />


                <CheckboxLabels
                
                data={getState()}
                
                />

    </Box> );
}

export default ChangeDocumentSettings;