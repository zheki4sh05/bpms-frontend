import {
  Avatar,
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import LanguageIcon from "@mui/icons-material/Language";
import LinearProgressWithLabel from "./LinearProgressWithLabel";
function WorkerProfile({ worker }) {
  const projects = [];

  return (
    <Grid container spacing={2}>
      <Grid xs={4}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box>
            <img src={""} />
          </Box>
          <Box></Box>
        </Box>
      </Grid>
      <Grid xs={8}>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="Отчество"
              secondary={
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {worker.lastname}
                </Typography>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="Почта"
              secondary={
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {worker.email}
                </Typography>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="Должность"
              secondary={
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {worker.position}
                </Typography>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="Возраст"
              secondary={
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {worker.age}
                </Typography>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="Телефон"
              secondary={
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {worker.phone}
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Grid>
      <Grid xs={4}>
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Соц. сети
          </Typography>
          <List >
            <ListItem>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <ListItemAvatar>
                    <Avatar>
                      <InstagramIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Instagram" />
                </Box>
                <Box>
                  <Typography variant="body1" gutterBottom>
                    {worker.social.inst}
                  </Typography>
                </Box>
              </Box>
            </ListItem>
            <ListItem>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <ListItemAvatar>
                    <Avatar>
                      <TelegramIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Telegram" />
                </Box>
                <Box>
                  <Typography variant="body1" gutterBottom>
                    {worker.social.teleg}
                  </Typography>
                </Box>
              </Box>
            </ListItem>
            <ListItem>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <ListItemAvatar>
                    <Avatar>
                      <LanguageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Веб-сайт" />
                </Box>
                <Box>
                  <Typography variant="body1" gutterBottom>
                    {worker.social.site}
                  </Typography>
                </Box>
              </Box>
            </ListItem>
          </List>
        </Box>
      </Grid>
      <Grid xs={8}>
        <Box>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
             Проект 1
            </Typography>
            <LinearProgressWithLabel value={90} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default WorkerProfile;
