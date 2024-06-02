import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import statusTypes from "../../API/status";
import { memo, useEffect, useMemo, useState } from "react";
import { changeUserSpec, getRoleInCompany, getSpecializations } from "../../Store/slices/companySlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getEmail, getToken } from "../../Store/slices/appUserSlice";
import DomainNames from "../../Store/DomainNames";
import { updateWorkerSpec } from "../../Store/slices/workersSlice";

const WorkerSpecControl = memo(({ worker }) => {

  const token = useSelector(getToken)

    const company = useSelector(
        (state) => state[DomainNames.company].userCompany.id
      );

  


  const specList = useSelector(getSpecializations);

  const role = useSelector(getRoleInCompany);

  const [changed,setChanged] = useState(false);

  const spec = useMemo(
    () => specList.find((item) => item.id == worker.spec),
    [specList]
  );

  let count = 0;

  if (typeof spec !== "undefined") {
    count = useMemo(
      () => specList.filter((item) => item.id == worker.spec).length,
      [spec]
    );
  }
  console.log(count)
  const [specInputId, setInput] = useState(typeof spec == "undefined" ? 0 : spec.id);

  const handleSelectChange = (event) => {
    setInput(event.target.value);
    setChanged(true)
  };

  const dispatch = useDispatch();

  function makeRequest() {
    console.log(worker)
    dispatch(changeUserSpec({
        data:{
            company:company,
            email:worker.email,
            spec:specInputId
        },
        token
    }
   
        
    ))
    dispatch(updateWorkerSpec({workerId:worker.id, specId:specInputId}))
    setChanged(false)

  }

  // useEffect(() => {
  //   makeRequest();
  // }, [changed]);

  function getContent(type) {
    switch (type) {
      case statusTypes.mainrole: {
        return (
          <Box sx={{ m: 1 }}>
             <Typography>
        Должность:
      </Typography>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={specInputId || ""}
              label="Age"
              onChange={handleSelectChange}
            >
              {specList.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            {
                changed ? 
                <Button  onClick={()=>makeRequest()} >Сохранить</Button>
                :
                null
            }
           
          </Box>
        );
      }
      case statusTypes.role: {
        return <>
        
        <Typography>
        Должность:{typeof spec != "undefined" ? spec.name : "не назначено"}
      </Typography>
        
        </>;
      }
    }
  }

  return (
    <Box>
      {getContent(role)}
    
      <Typography>
        {typeof spec != "undefined"
          ? `Данную должность занимают:${count}`
          : ""}
      </Typography>
    </Box>
  );
});

export default WorkerSpecControl;
