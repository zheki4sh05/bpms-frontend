import {
  Box,
  Container,
  Divider,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { useDispatch } from "react-redux";
import { getAddedStatus } from "../../Store/slices/projectSlice";
import { getSpecializations } from "../../Store/slices/companySlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getToken } from "../../Store/slices/appUserSlice";
function MyTaskBreaf({ task, assignmentStatus }) {


  const status = useSelector(getAddedStatus);

  const specList = useSelector(getSpecializations);

  const [specName, setName] = useState();

  useEffect(() => {
    setName(
      specList.find((item) => item.id == assignmentStatus.viewUserAsWorker.spec)
        .name
    );
  }, [status]);

  const [reports, setReports] = useState(assignmentStatus.reports || []);
  const [documents, setDocuments] = useState(assignmentStatus.documents || []);

  

  // const handleItemSelectionToggle = (event, itemId, isSelected) => {
  //   if (isSelected) {
  //     let currentState = [...lastSelectedItem];

  //     currentState.push(itemId);

  //     setLastSelectedItem(currentState);
  //   }
  // };

  function handleDownloadReport(id) {
    console.log(id);
  }

  function handleDownloadDoc(id) {
    console.log(id);
  }

  return (
    <Box>
      <Container maxWidth="sm">
     
        <Typography>Специализация</Typography>
        <Divider />
        <Typography variant="subtitle1" sx={{ mb: 2, mt: 1 }}>
          {specName}
        </Typography>

        <Typography>Название</Typography>
        <Divider />
        <Typography>{task.name}</Typography>
        <Typography sx={{ mt: 2 }}>Описание</Typography>
        <Divider />
        <Typography>{task.description}</Typography>

        <Typography sx={{ mt: 2 }}>
          Прикрепленные шаблоны отчетов. Прикреплено {reports.length}
        </Typography>
        <Divider />
        <Stack spacing={2}>
          <List
            dense
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
            }}
          >
            {reports.map((value, index) => {
              return (
                <ListItem key={index}>
                  <FormControlLabel
                    control={
                      <IconButton
                        onClick={() => handleDownloadReport(value.id)}
                      >
                        <DownloadIcon />
                        <Typography>&nbsp;Скачать</Typography>
                      </IconButton>
                    }
                    label={value.name + "." + value.format}
                  />
                </ListItem>
              );
            })}
          </List>
        </Stack>
        <Typography>
          Прикрепленные документы. Прикреплено {documents.length}
        </Typography>
        <Stack spacing={2}>
          <List
            dense
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
            }}
          >
            {documents.map((value, index) => {
              return (
                <ListItem key={index}>
                  <FormControlLabel
                    control={
                      <IconButton onClick={() => handleDownloadDoc(value.id)}>
                        <DownloadIcon />
                        <Typography>&nbsp;Скачать</Typography>
                      </IconButton>
                    }
                    label={value.name + "." + value.format}
                  />
                </ListItem>
              );
            })}
          </List>
        </Stack>
        <Divider />
        <Typography>Сроки</Typography>
        <Divider />

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Начало
            </Typography>
            <Typography >{task.startAt}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Конец
            </Typography>
            <Typography>{task.deadline}</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default MyTaskBreaf;
