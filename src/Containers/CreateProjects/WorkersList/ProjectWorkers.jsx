import { Avatar, Box, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ProjectWorkers({title, data, text }) {

  return (
    <Box>
        <Typography variant="subtitle1" gutterBottom>
          {title}
        </Typography>
      {data.length != 0 ? 
        <List dense>
          {data.map((item, index) => (
            <ListItem
              key={index}
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
              <Box>
                <ListItemText primary={`${item.firstname} ${item.lastname}`} />
                <ListItemText primary={`${item.email}`} />
              </Box>
            </ListItem>
          ))}
        </List>
       : 
        <Typography variant="subtitle2" gutterBottom>
          {text}
        </Typography>
      }
    </Box>
  );
}

