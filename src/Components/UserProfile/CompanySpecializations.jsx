import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { memo, useEffect, useState } from "react";
import { createSpec, deleteSpec, getRoleInCompany, getSpecializations, updateSpec } from "../../Store/slices/companySlice";
import DomainNames from "../../Store/DomainNames";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getToken } from "../../Store/slices/appUserSlice";

const CompanySpecializations = memo(() => {

    const dispatch = useDispatch();

    const token = useSelector(getToken)

  const role = useSelector(
    (state) => state[DomainNames.company].userCompany.currentRole
  );

  const company = useSelector(
    (state) => state[DomainNames.company].userCompany.id
  );

  const specList = useSelector(getSpecializations)
  const [inputVal, setInputVal] = useState(" ");
  const [list, setList] = useState(specList || []);
  const [isEdited, setIsEdited] = useState(false);
  const [editedId, setEditedId] = useState(null);
  const [count, setEditedCount] = useState(0);

  const onChange = (e) => {
    setInputVal(e.target.value);
  };

  useEffect(() => {
    setList(specList); 
  }, [specList]);

  const handleClick = () => {
    if (!isEdited) {
        console.log(company)
        dispatch(createSpec({
            data:{
                id:company,
                name:inputVal
            }, 
            token
        })) 
     
      setInputVal("");
    } else {
        dispatch(updateSpec({
            data:{
                id:editedId,
                name:inputVal,
                count:count
            }, 
            token
        }))

        setIsEdited(false)
        setInputVal("");
    }
setList(specList)
  };


  const onDelete = (id) => {
    console.log(id)
    dispatch(deleteSpec({
        data:{
            id:id
              },
        token
    }))

    
};

  const handleEdit = (id) => {
    const newList = list.filter((item) => item.id !== id);
    const editVal = list.find((item) => item.id === id);
    setEditedId(editVal.id);
    setInputVal(editVal.name);
    setEditedCount(editVal.count);
    setList(newList);
    setIsEdited(true);
  };

  return (
    <Container maxWidth={"sm"} sx={{ mt: 5 }}>
      {role == "admin" ? (
        <>
          <TextField
            variant="outlined"
            onChange={()=>onChange(event)}
            label="Название"
            value={inputVal}
          />
          <Button
            size="large"
            variant={isEdited ? "outlined" : "contained"}
            color="primary"
            onClick={handleClick}
            disabled={inputVal ? false : true}
            sx={{ ml: 2 }}
          >
            {isEdited ? "Изменить" : "Добавить"}
          </Button>
        </>
      ) : null}

      <List>
        {list.map((item, index) => {
          return (
            <ListItem key={index} divider={true}>
              <Typography key={item.id}>{item.name} ({item.count})</Typography>

              {role == "admin" ? (
                <>
                  <Button
                    onClick={() => handleEdit(item.id)}
                    variant="contained"
                    sx={{ ml: 2 }}
                  >
                    Изменить
                  </Button>
                  <Button
                    onClick={() => onDelete(item.id)}
                    color="secondary"
                    variant="contained"
                    sx={{ ml: 1 }}
                  >
                    Удалить
                  </Button>
                </>
              ) : null}

                <Typography > </Typography>

            </ListItem>
          );
        })}
      </List>
    </Container>
  );
});

export default CompanySpecializations;
