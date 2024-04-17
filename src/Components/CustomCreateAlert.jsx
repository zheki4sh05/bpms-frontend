import { Alert } from "@mui/material";
import { useEffect, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
function CustomCreateAlert({messageText, duration, userSeverity}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {isVisible ? (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity={userSeverity}>
         {messageText}
        </Alert>
      ) : (
        <></>
      )}
    </>
  );
}

export default CustomCreateAlert;
