import { Box, Container, Divider, Typography } from "@mui/material";
import WorkersList from './WorkersList';
import LeadersList from "./LeadersList";

function WorkersListControl() {
  return <Container maxWidth="sm">
    <Box>




    <LeadersList/>
      <Divider/>
      <Typography component="h2">
            Участники
        </Typography>
        <WorkersList/>

    </Box>

  </Container>;
}

export default WorkersListControl;
