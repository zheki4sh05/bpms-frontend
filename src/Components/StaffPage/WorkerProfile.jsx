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
import { useSelector } from "react-redux";
import { getRoleInCompany } from "../../Store/slices/companySlice";
import statusTypes from "../../API/status";
import WorkerSpecControl from "./WorkerSpecControl";
function WorkerProfile({ worker }) {
  const projects = [];

   
 

  return (
    <Box sx={{backgroundColor:"white", borderRadius:"3px", p:1}}>

    
    <Grid container spacing={2}>
      <Grid xs={4} item>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box>
            <img src={""} />
          </Box>
          <Box></Box>
        </Box>
      </Grid>
      <Grid xs={8} item>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          <ListItem alignItems="flex-start" sx={{borderBottom:"solid 1px #b4b4b4"}}>


            <Box sx={{display:"flex",flexDirection:"row"}}>
            <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body1"
                  color="text.primary"
                >
                 Имя:&nbsp;
                </Typography>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body1"
                  color="text.primary"
                >
                    {worker.firstname}
                </Typography>
            </Box>

          </ListItem>
          
          <ListItem alignItems="flex-start" sx={{borderBottom:"solid 1px #b4b4b4"}}>
          <Box sx={{display:"flex",flexDirection:"row"}}>
            <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body1"
                  color="text.primary"
                >
                 Фамилия:&nbsp;
                </Typography>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body1"
                  color="text.primary"
                >
                    {worker.lastname}
                </Typography>
            </Box>
          </ListItem>
          
          <ListItem alignItems="flex-start" sx={{borderBottom:"solid 1px #b4b4b4"}}>
          <Box sx={{display:"flex",flexDirection:"row"}}>
            <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body1"
                  color="text.primary"
                >
                 Отчество:&nbsp;
                </Typography>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body1"
                  color="text.primary"
                >
                    {worker.surname}
                </Typography>
            </Box>
          </ListItem>
         
          <ListItem alignItems="flex-start" sx={{borderBottom:"solid 1px #b4b4b4"}}>
          <Box sx={{display:"flex",flexDirection:"row"}}>
            <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body1"
                  color="text.primary"
                >
                 Дата рождения:&nbsp;
                </Typography>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body1"
                  color="text.primary"
                >
                    {worker.birtday}
                </Typography>
            </Box>
          </ListItem>
        
          <ListItem alignItems="flex-start" sx={{borderBottom:"solid 1px #b4b4b4"}}>
          <Box sx={{display:"flex",flexDirection:"row"}}>
            <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body1"
                  color="text.primary"
                >
                 Телефон:&nbsp;
                </Typography>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body1"
                  color="text.primary"
                >
                    {worker.phone}
                </Typography>
            </Box>
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={4}>
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Соц. сети
          </Typography>
          {/* <List >
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
                    {worker.inst}
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
                    {worker.teleg}
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
                    {worker.site}
                  </Typography>
                </Box>
              </Box>
            </ListItem>
          </List> */}
        </Box>
      </Grid>
      <Grid item xs={8}>
        <Box>
          {/* <Box>
            <Typography variant="subtitle2" gutterBottom>
             Проект 1
            </Typography>
            <LinearProgressWithLabel value={90} />
          </Box> */}

          <WorkerSpecControl worker={worker}/>
         

        </Box>
      </Grid>
    </Grid>
    </Box>
  );
}

export default WorkerProfile;
