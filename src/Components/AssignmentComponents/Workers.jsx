import Container from "@mui/material/Container";

import Stack from "@mui/material/Stack";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";


import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import { ListItemButton } from "@mui/material";
import { Tooltip } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';

function Workers() {
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);
  return (
    <Container maxWidth={"sm"} sx={{ mt: 5 }}>
      <Stack direction={"row"}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField id="outlined-basic" label="Поиск" variant="outlined" />

          <Box sx={{display:"flex", flexDirection:"row", alignItems:"center"}}>
            <ListItemButton component="a" sx={{ mt: 2 }}>
              <Tooltip title="Нажмит, чтобы добавить">
                <ListItemText primary="Spam" />
              </Tooltip>
            </ListItemButton>
            <Box>
              <IconButton children={<MoreVertIcon/>} />
            </Box>
            
          </Box>
        </Box>
        <Stack direction={"column"} sx={{ ml: 5 }}>
          <Typography variant="subtitle2" gutterBottom>
            Исполнители:
          </Typography>
          <List>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Single-line item"
                secondary={secondary ? "Secondary text" : null}
              />
            </ListItem>
          </List>
        </Stack>
      </Stack>
    </Container>
  );
}

export default Workers;
