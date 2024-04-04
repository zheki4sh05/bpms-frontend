import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
      const interval = setInterval(() => {
        setTime(new Date());
      }, 1000); // обновление времени каждую секунду
  
      return () => clearInterval(interval);
    }, []);
  
    return (

        <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, ml: 2, display: "inline-block" }}
      >
      { time.toLocaleTimeString()}
      </Typography>

    );
}

export default Clock;