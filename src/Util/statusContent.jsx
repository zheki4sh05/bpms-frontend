import statusTypes from "../API/status"
import CustomCreateAlert from "../Components/CustomCreateAlert"
import { CircularProgress } from '@mui/material';
import { getErrorName } from "./ErrorTypes";
import React from 'react'; 

class StatusContent extends React.Component {
    constructor(props) { 
        super(props); 
    }

  
    render() { 
        const { result, errorDomain, errorCode, loadingType } = this.props; 
       
        switch (result) {
            case statusTypes.failed:
                return (
                    <CustomCreateAlert
                        messageText={`${this.props.failedText}. ${getErrorName(errorDomain || '', errorCode)}`}
                        duration={2000}
                        userSeverity={statusTypes.error}
                        type={loadingType || "primary"}
                    />
                );
            case statusTypes.loading:
                return <CircularProgress />;
            case statusTypes.succeeded:
                return (
                    <CustomCreateAlert
                        messageText={this.props.successText}
                        duration={2000}
                        userSeverity="success"
                        type={loadingType || "primary"}
                    />
                );
            default:
                return null; 
        }
    }
}

export default StatusContent;