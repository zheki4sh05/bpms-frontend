import { Box, Grid } from "@mui/material";

import SearchBar from "../SearchBar/SearchBar";
import StatusContent from "../../Util/statusContent";
import { useSelector } from "react-redux";
import {
  findUser,
  getInviteError,
  getSearchedStatus,
  getSearchedUser,
} from "../../Store/slices/companySlice";
import { getToken } from "../../Store/slices/appUserSlice";
import { useDispatch } from "react-redux";
import statusTypes from "../../API/status";
import SearchResult from "./SearchResult";

function InviteControl() {
  const status = useSelector(getSearchedStatus);

  const user = useSelector(getSearchedUser);

  const token = useSelector(getToken);

  const dispatch = useDispatch();

  function makeRequest(data) {


    
    dispatch(
      findUser({
        data: {
          email: data,
        },
        token,
      })
    );
  }

  return (

    <Box sx={{p:4}}>

    
    <Grid container spacing={2} >
      <Grid xs={8}>
       <Box sx={{mb:2}}>
       <SearchBar
          elevation={2}
          placeHolder="Введите email"
          handleSearch={makeRequest}
        />
       </Box>
        
        
        {status === statusTypes.succeeded ? (
          <SearchResult user={user} />
        ) : (
          <StatusContent
            result={status}
            errorDomain={"any"}
            errorCode={"any"}
            loadingType={"userSkeleton"}
            successType={"none"}
            errorType={"any"}
            failedText={"Не удалось найти пользователя с таким email"}
          />
        )}
        
        
      </Grid>
      <Grid xs={4}></Grid>
    </Grid>
    </Box>
  );
}

export default InviteControl;
