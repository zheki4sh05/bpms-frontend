import Box from "@mui/material/Box";
import { useContext, useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import FolderIcon from "@mui/icons-material/Folder";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Container, Stack, TextField } from "@mui/material";
import DialogContext from "../DialogContext";

function AddFiles() {
  const { data, setDataHandler } = useContext(DialogContext);

  const [files, setFiles] = useState([]);

  function saveDocs(list) {
    setDataHandler({ ...data, files: list });
  }

  function handleChange(event) {
    setFiles((prevState) => [...prevState, event.target.files]);

    saveDocs(files);
  }

  function handleDelete(index) {
    let name = files[index][0].name;

    console.log(name);

    setFiles(files.filter((f) => f[0].name != name));

    saveDocs(files);
  }

  useEffect(() => {
    saveDocs([]);
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="subtitle1" component="span">
            Файлов загружено: {files.length}
          </Typography>
        </Box>

        <List>
          {files.map((file, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(index)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>

              <ListItemText primary={file[0].name} />
            </ListItem>
          ))}
        </List>
      </Box>
      <TextField
        type="file"
        id="outlined-basic"
        variant="outlined"
        onChange={handleChange}
        multiple
      />
    </Container>
  );
}

export default AddFiles;
