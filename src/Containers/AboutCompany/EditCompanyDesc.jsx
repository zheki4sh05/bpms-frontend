import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import DomainNames from "../../Store/DomainNames";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { resetUpdated, updateCompany } from "../../Store/slices/companySlice";
import { getToken } from "../../Store/slices/appUserSlice";
import statusTypes from "../../API/status";
import StatusContent from "../../Util/statusContent";
function EditCompanyDesc() {
  const dispatch = useDispatch();

  const token = useSelector(getToken);
  const updated = useSelector((state) => state[DomainNames.company].updated);
  const name = useSelector(
    (state) => state[DomainNames.company].userCompany.name
  );

  const desc = useSelector(
    (state) => state[DomainNames.company].userCompany.desc
  );
  const role = useSelector(
    (state) => state[DomainNames.company].userCompany.currentRole
  );
  const [isEdited, setEdited] = useState(false);

  const [nameValue, setName] = useState(name);
  const [descValue, setDesc] = useState(desc);

  const handleClick = (event) => {
    setEdited(false);
    dispatch(
      updateCompany({
        data: {
          name: nameValue,
          desc: descValue,
        },
        token,
      })
    );
  };

  useEffect(() => {
    dispatch(resetUpdated())
  }, []);

  const handleChangeName = (event) => {
    setEdited(true);
    setName(event.target.value);
  };

  const handleChangeDesc = (event) => {
    setEdited(true);
    setDesc(event.target.value);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Название
        </Typography>
        <TextField
          fullWidth
          id="fullWidth"
          placeholder={name}
          disabled={role !== "admin"}
          onChange={handleChangeName}
          value={nameValue}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Описание
        </Typography>
        <TextField
          multiline
          fullWidth
          id="fullWidth"
          disabled={role !== "admin"}
          onChange={handleChangeDesc}
          value={descValue}
        />
      </Box>
      {role == "admin" ? (
        <>
          <Button
            variant="contained"
            endIcon={<SaveIcon />}
            disabled={!isEdited && updated===statusTypes.succeeded}
            onClick={handleClick}
            sx={{ mt: 2 }}
          >
            Сохранить
          </Button>
        </>
      ) : null}
      {updated!==null? (
        <StatusContent
          result={updated}
          errorDomain="any"
          errorCode={"any"}
          successText="Операция выполнена успешно!"
          failedText="Что-то пошло не так..."
        />
      ) : null}
    </Box>
  );
}

export default EditCompanyDesc;
