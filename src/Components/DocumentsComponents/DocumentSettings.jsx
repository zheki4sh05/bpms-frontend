import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { memo, useEffect, useState } from "react";
import CheckboxLabels from "./CheckboxLabels";
import { useContext } from "react";
import DialogContext from "../DialogContext";
const DocumentSettings = memo(({ alignmentProp }) => {
  const [alignment, setAlignment] = useState(alignmentProp);
  const { data, setDataHandler } = useContext(DialogContext);
  const handleChange = (event) => {
    setAlignment(event.target.value);
    console.log(event.target.value)
  };

  const handleSave = (state, project, req, alignment) => {
    setDataHandler({
      ...data,
      members: {
        ...data.members,
        access: {
          type: state,
          project: project,
          byRequest: req,
          alignment,
        },
      },
    });
  };

    useEffect(() => {
    console.log(data);
    if (
      data.hasOwnProperty("members") &&
      !data.members.hasOwnProperty("workers")
    ) {
      setDataHandler({
        ...data,
        members: {
          ...data.members,
          workers: [],
        },
      });
    }
  }, [data]);

  function getState() {
    let initState;
    if (
      data.hasOwnProperty("members") &&
      data.members.hasOwnProperty("access") &&
      data.members.hasOwnProperty("workers")
    ) {
      initState = {
        type: data.members.access.type,
        project: data.members.access.project,
        req: data.members.access.byRequest,
        alignment: data.members.access.alignment,
        handleSave: handleSave,
      };
      return initState;
    } else {
      initState = {
        type: "",
        project: 0,
        req: false,
        alignment: alignment,
        handleSave: handleSave,
      };
    }
    return {...initState};
  }

  return (
    <Box sx={{ maxWidth: "40%", m: "0 auto" }}>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
          sx={{ mb: 2 }}
        >
          <ToggleButton value="document">Документы</ToggleButton>
          <ToggleButton value="report">Шаблон отчета</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box>
        <CheckboxLabels data={getState()} />
      </Box>
    </Box>
  );
});

export default DocumentSettings;
