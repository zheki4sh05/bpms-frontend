import statusTypes from "../API/status";
import CustomCreateAlert from "../Components/CustomCreateAlert";
import { Alert, CircularProgress, LinearProgress, Snackbar } from "@mui/material";
import { getErrorName } from "./ErrorTypes";
import React from "react";
import UserSkeleton from "../Components/StaffPage/UserSkeleton";
import CustomizedSnackbars from "../Components/StaffPage/CustomizedSnackbars";

class StatusContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      result,
      errorDomain,
      errorCode,
      loadingType,
      successType,
      errorType,
      failedText,
    } = this.props;

    switch (result) {
      case statusTypes.failed:
        switch (errorType) {
        case "alert":{
          return <CustomizedSnackbars
          message={failedText}
          type="error"
        />
        }
         
          default: {
            return (
              <CustomCreateAlert
                messageText={`${this.props.failedText}. ${getErrorName(
                  errorDomain | "",
                  errorCode
                )}`}
                duration={2000}
                userSeverity={statusTypes.error}
              />
            );
          }
        }

      case statusTypes.loading:{
        switch (loadingType) {
            case "skeleton": {
              return <Skeleton animation="wave" />;
            }
            case "linear":{
              return <LinearProgress />
            }
            case "userSkeleton":{
              return <UserSkeleton/>
            }
            default: {
              return (
                <CircularProgress />
              );
            }
          }
      }
      case statusTypes.succeeded:
        switch(successType){
            case "none":{
              return <></>
            }
            case "alert":{
              return <CustomizedSnackbars
                message="Приглашение отправлено!"
                type="success"
              />
            }
            default:{
                return (
                    <CustomCreateAlert
                      messageText={this.props.successText}
                      duration={2000}
                      userSeverity="success"
                    />
                  );
            }
        }
      default:
        return null;
    }
  }
}

export default StatusContent;
