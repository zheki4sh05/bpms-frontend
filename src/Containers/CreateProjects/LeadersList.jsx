import WorkersList from "./WorkersList";
import  Typography  from '@mui/material/Typography';

function LeadersList() {
    return ( <>
        
        <Typography component="h2">
            Руководитель
        </Typography>

        <WorkersList/>

        </>
        
    );
}

export default LeadersList;