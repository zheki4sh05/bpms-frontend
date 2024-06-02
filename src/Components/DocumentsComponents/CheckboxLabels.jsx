import { memo, useContext, useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useSelector } from "react-redux";
import { getProjects } from "../../Store/slices/projectSlice";
import {
  Box,
  Button,
  Divider,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

import WorkersList from "../../Containers/CreateProjects/WorkersList/WorkersList";
import {
  getAllWorkers,
  getWorkersList,
  getWorkersStatus,
} from "../../Store/slices/workersSlice";
import { useDispatch } from "react-redux";
import statusTypes from "../../API/status";
import { getCompanyName } from "../../Store/slices/companySlice";
import { getToken } from "../../Store/slices/appUserSlice";


const CheckboxLabels = memo(({ data = {
  type:"",
  project:0,
  req:false,
  alignment:"document",
  handleSave:()=>{},
} }) => {

  console.log(data)

  const [state, setState] = useState(data.type);
  const [project, setProject] = useState(data.project);
  const [req, setReq] = useState(data.byRequest);
  const company = useSelector(getCompanyName);
  const projects = useSelector(getProjects);
  const allWorkers = useSelector(getWorkersList);
  const status = useSelector(getWorkersStatus);
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  // const { data, setDataHandler } = useContext(DialogContext);
  const handleRadioChange = (event) => {
    setProject(0);
    setReq(false);
    setState(event.target.value);
  };
  const handleProjectChange = (event) => {
    setProject(event.target.value);
  };
  const handleChange = () => {
    setReq((prevState) => (prevState === false ? true : false));
  };

  function makeRequest() {
    if (status == statusTypes.idle) {
      dispatch(
        getAllWorkers({
          data: {
            companyName: company,
          },
          token,
        })
      );
    }
  }

  const saveData = () => {
    console.log(project);
    // setDataHandler({
    //   ...data,
    //   members: {
    //     ...data.members,
    //     access: {
    //       type: state,
    //       project: project,
    //       byRequest: req,
    //       alignment: alignment,
    //     },
    //   },
    // });
    data.handleSave(state, project, req, data.alignment)
  };
  // useEffect(() => {
  //   console.log(data);
  //   if (
  //     data.hasOwnProperty("members") &&
  //     !data.members.hasOwnProperty("workers")
  //   ) {
  //     setDataHandler({
  //       ...data,
  //       members: {
  //         ...data.members,
  //         workers: [],
  //       },
  //     });
  //   }
  // }, [data]);

  function checkSave() {
    return (
      state == "public" ||
      (state == "project" && project != 0) ||
      (state == "user" && data.hasOwnProperty("members"))
    );
  }

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  function getContent(value) {
    switch (value) {
      case "public": {
        return <></>;
      }
      case "project": {
        return (
          <Box
            sx={{
              p: 2,
              borderRadius: "10px",
              border: "solid #e0e0e0 2px ",
              mt: 2,
              width: "100%",
            }}
          >
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Проект
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={project || ""}
                label="Age"
                onChange={handleProjectChange}
              >
                {projects.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                Выберите проект, по которому хотите ограничить область видимости
                документа
              </FormHelperText>
            </FormControl>

            <Divider />
            <FormControlLabel
              onChange={handleChange}
              control={<Checkbox {...label} checked={req} />}
              label="Сделать для других доступ по запросу"
            />

            <Divider />
          </Box>
        );
      }
      case "user": {
        makeRequest();
        return (
          <Box
            sx={{
              p: 2,
              borderRadius: "10px",
              border: "solid #e0e0e0 2px ",
              mt: 2,
              width: "100%",
            }}
          >
            <WorkersList dataMembers={allWorkers} addAdmin={false} />
            <Divider />
            <FormControlLabel
              onChange={handleChange}
              control={<Checkbox {...label} />}
              checked={req}
              label="Сделать для других доступ по запросу"
            />
            <Divider />
          </Box>
        );
      }
    }

    return <></>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">
          Настройка доступа
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          onChange={() => handleRadioChange(event)}
        >
          <FormControlLabel
            value="public"
            
            control={<Radio checked={state === "public"}/>}
            label="Общедоступный"
          />
          <FormControlLabel
            value="project"
            control={<Radio />}
            label="По проекту"
          />
          <FormControlLabel
            value="user"
            control={<Radio />}
            label="Конкретные пользователи"
          />
        </RadioGroup>

        {getContent(state)}
      </FormControl>
      <Box>
        <Button
          disabled={!checkSave()}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={saveData}
        >
          Сохранить
        </Button>
      </Box>
    </Box>
  );
});
export default CheckboxLabels;
