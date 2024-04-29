import statusTypes from "../API/status";
import CustomCreateAlert from "../Components/CustomCreateAlert";
import { CircularProgress } from "@mui/material";
import { getErrorName } from "./ErrorTypes";
import React from "react";

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
    } = this.props;

    switch (result) {
      case statusTypes.failed:
        switch (errorType) {
          case "skeleton": {
            return <Skeleton animation="wave" />;
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
            default: {
              return (
                <CircularProgress />
              );
            }
          }
      }
      case statusTypes.succeeded:
        switch(successType){
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
