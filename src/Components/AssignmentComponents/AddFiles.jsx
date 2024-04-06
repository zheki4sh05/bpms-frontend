import  Box  from "@mui/material/Box";
import { useState } from "react";
import  List  from '@mui/material/List';
import  ListItem  from '@mui/material/ListItem';
import  IconButton  from '@mui/material/IconButton';
import  DeleteIcon  from '@mui/icons-material/Delete';
import  ListItemAvatar  from '@mui/material/ListItemAvatar';
import  Avatar  from '@mui/material/Avatar';
import  FolderIcon  from '@mui/icons-material/Folder';
import  ListItemText  from '@mui/material/ListItemText';
import  Typography  from '@mui/material/Typography';
import { Container, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
function AddFiles() {
  const [filesCount, setCount] = useState(0);

  return (
    <Container maxWidth="sm" sx={{mt:5}}>
<Box>
    <Box sx={{display:"flex", justifyContent:"space-between"}}>
        <Typography variant="subtitle1" component="span">
            Файлов загружено: {filesCount}
        </Typography>
        <IconButton edge="end" aria-label="delete">
              <AddIcon/>
            </IconButton>
    </Box>
      

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
            primary="файл.txt"
          />
        </ListItem>
      </List>
    </Box>
    </Container>
    
  );
}

export default AddFiles;
