import React from 'react';
import { Alert } from '@material-ui/lab';

const ErrorNotification = ({ error }) => {
    return (
        <div>
            <Alert severity='error'>{error}</Alert>
        </div>
    )
};

export default ErrorNotification;