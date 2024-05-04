
import { Stack } from '@mui/material';
import  Typography  from '@mui/material/Typography';

function PageInfo({ name, data }) {
  return (
    <Stack direction="row" sx={{ alignItems: "center", mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        {name}
      </Typography>
      {data.map((item, index) => (
        <Typography key={index} variant="subtitle1" gutterBottom sx={{ ml: 2 }}>
          {item.name}:{item.count}
        </Typography>
      ))}

      
    </Stack>
  );
}

export default PageInfo;
