
import  Container  from "@mui/material/Container";

import  Stack from '@mui/material/Stack';


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

function Workers() {
  return (
    <Container maxWidth={"sm"}>
      <Stack direction={"row"}>
        <Stack direction={"column"}></Stack>
        <Stack direction={"column"}>
          <Typography variant="subtitle2" gutterBottom>
            Исполнители
          </Typography>
          <List dense={dense}>
              {generate(
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
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>,
              )}
            </List>
        </Stack>
      </Stack>
    </Container>
  );
}

export default Workers;
