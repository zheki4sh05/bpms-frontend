import {

    Box,
  Divider,
  Typography,
} from "@mui/material";

function AlertDialogContent({ user }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{display:"flex",flexDirection:"row"}}>
        <Typography
          sx={{ display: "inline", ml: 1 }}
          component="span"
          variant="body1"
          color="text.primary"
        >
          Имя:
        </Typography>
        <Typography
          sx={{ display: "inline", ml: 1 }}
          component="span"
          variant="body1"
          color="text.primary"
        >
          {user.firstname}
        </Typography>
      </Box>
      <Divider/>
      <Box sx={{display:"flex",flexDirection:"row", mt:1}}>
        <Typography
          sx={{ display: "inline", ml: 1 }}
          component="span"
          variant="body1"
          color="text.primary"
        >
          Отчество:
        </Typography>
        <Typography
          sx={{ display: "inline", ml: 1 }}
          component="span"
          variant="body1"
          color="text.primary"
        >
          {user.surname}
        </Typography>
      </Box>
      <Divider/>
      <Box sx={{display:"flex",flexDirection:"row", mt:1}}>
        <Typography
          sx={{ display: "inline", ml: 1 }}
          component="span"
          variant="body1"
          color="text.primary"
        >
          Фамилия:
        </Typography>
        <Typography
          sx={{ display: "inline", ml: 1 }}
          component="span"
          variant="body1"
          color="text.primary"
        >
          {user.lastname}
        </Typography>
      </Box>
      <Divider/>

      <Box sx={{display:"flex",flexDirection:"row", mt:1}}>
        <Typography
          sx={{ display: "inline", ml: 1 }}
          component="span"
          variant="body1"
          color="text.primary"
        >
          Телефон:
        </Typography>
        <Typography
          sx={{ display: "inline", ml: 1 }}
          component="span"
          variant="body1"
          color="text.primary"
        >
          {user.phone}
        </Typography>
      </Box>
      <Divider/>
      <Box sx={{display:"flex",flexDirection:"row", mt:1}}>
        <Typography
          sx={{ display: "inline", ml: 1 }}
          component="span"
          variant="body1"
          color="text.primary"
        >
          Возраст:
        </Typography>
        <Typography
          sx={{ display: "inline", ml: 1 }}
          component="span"
          variant="body1"
          color="text.primary"
        >
          {user.birthday}
        </Typography>
      </Box>
      <Divider/>
    </Box>
  );
}

export default AlertDialogContent;
