
import Chip from '@mui/material/Chip';


export default function NotifChip({text, bgColor,color}) {

  return (
      <Chip
        label={text}
        sx={{backgroundColor:bgColor,color:color}}
      />
  
  );
}