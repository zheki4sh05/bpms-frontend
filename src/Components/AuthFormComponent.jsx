import { Box } from "@mui/material";
import SignUp from "../Containers/SignUp";
import SignIn from "./SignIn";
import { memo, useState } from "react";
import DomainNames from "../Store/DomainNames";
import { CircularProgress } from "@mui/material";
import CustomCreateAlert from "../Components/CustomCreateAlert";
import { useSelector } from "react-redux";
import { getAuthStatus } from "../Store/slices/appUserSlice";

const AuthFormComponent = () => {
  let authResultContent;
  let alertDuration = 1500;
  const signUp = 1;

  const signIn = 2;

  const [page, togglePage] = useState(signUp);

  const handleTogglePage = () => {
    togglePage((prevState) => (prevState === signIn ? signUp : signIn));
  };

  const userStatus = useSelector(getAuthStatus);
  const error = useSelector((state) => state[DomainNames.app.appUser].error);

  if (userStatus === "loading") {
    authResultContent = <CircularProgress />;
  } else if (userStatus === "succeeded") {
    authResultContent = (
      <CustomCreateAlert
        messageText={`${
          page == signUp ? "Регистрация" : "Авторизация"
        } прошла успешно`}
        duration={alertDuration}
        userSeverity="success"
      />
    );
  } else if (userStatus === "failed") {
    authResultContent = (
      <CustomCreateAlert
        messageText={`Ошибка ${
          page == signUp ? "Регистрации" : "Авторизации"
        }. `.concat(error)}
        duration={6000}
        userSeverity="error"
      />
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {page == signIn ? (
          <SignIn onTogglePage={handleTogglePage} />
        ) : (
          <SignUp onTogglePage={handleTogglePage} />
        )}
        <Box sx={{ mt: 2 }}>{authResultContent}</Box>
      </Box>
    </Box>
  );
};

export default AuthFormComponent;
