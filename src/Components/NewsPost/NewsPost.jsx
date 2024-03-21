import {
    Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PersonIcon from "@mui/icons-material/Person";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import { useState } from "react";
function NewsPost({ post }) {
  const [save, setSave] = useState(false);
  const savePostHandler = () => {
    setSave((prevState) => (prevState === false ? true : false));
  };
  return (
    <Card sx={{ minWidth: 275, borderRadius: "5px", bgColor: "white", mb:"10px" }}>
      <CardContent>
        <Stack direction="row">
          <IconButton>
            <PersonIcon />
          </IconButton>

          <Stack direction="column">
            <Typography
              sx={{ fontSize: 16 }}
              color="text.secondary"
              gutterBottom
            >
              {post.name}
            </Typography>
            <Typography
              sx={{ fontSize: 12 }}
              color="text.secondary"
              gutterBottom
            >
              {post.email}
            </Typography>
          </Stack>

          <ArrowRightAltIcon />

          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {post.project}
          </Typography>
        </Stack>
        <Typography variant="body2">{post.body}</Typography>
      </CardContent>
      <CardActions>
        <Box sx={{display:"flex",width:"100%", justifyContent:"space-between"}}>
          <Stack direction="row">
            <Button size="small" variant="text">
              Нравится
            </Button>
            <Divider orientation="vertical" flexItem />
            <Button size="small" variant="text">
              Комментировать
            </Button>
            <Divider orientation="vertical" flexItem />
            <Button size="small" variant="text">
              Переслать
            </Button>
          </Stack>
          <IconButton onClick={savePostHandler}>
            {save ? <TurnedInIcon /> : <TurnedInNotIcon />}
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
}

export default NewsPost;
