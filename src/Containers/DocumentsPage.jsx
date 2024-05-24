import { Box, Typography } from "@mui/material";
import DialogEntityProvider from "../Components/DialogEntityProvider";
import SearchBox from "../Components/SearchBox/SearchBox";
import PageInfo from "../Components/PageInfo";
import CustomTabPanel from "../Components/CustomTabPanel/CustomTabPanel";
import DocumentTable from "../Components/DocumentsComponents/DocumentTable";
import UploadDocument from "../Components/DocumentsComponents/UploadDocument";
import { useSelector } from "react-redux";
import { getProjects } from "../Store/slices/projectSlice";

function DocumentsPage() {

    const documents = useSelector(getDocuments)

    const projects = useSelector(getProjects)

    const [project, setProject] = useState(null);
    const handleProjectChange = (event) => {
      setProject(event.target.value);
   
    };


  return (
    <DialogEntityProvider>
      <Box>
        <SearchBox buttonText={"Загрузить"} />

        <PageInfo
          name="Документов"
          data={[
            {
              name: "Доступно",
              count: "0",
            },
          ]}
        />

        <CustomTabPanel
          content={{
            tabNames: ["Список", "Плитка", "Календарь", "Канбан"],
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Выбрать проект
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={project[0].name}
              label="Выбрать специализацию"
              onChange={handleProjectChange}
              disabled={show}
            >
              {projects.map((item, index) => (
                <MenuItem value={index.name} key={index}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <DocumentTable assignments={assignments} />
          <Typography variant="h5" gutterBottom>
            контент 1
          </Typography>
        </CustomTabPanel>

        <UploadDocument reloadHandler={makeRequest} />
      </Box>
    </DialogEntityProvider>
  );
}

export default DocumentsPage;
