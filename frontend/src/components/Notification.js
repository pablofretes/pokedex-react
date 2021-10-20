import React from 'react';
import { Alert } from '@material-ui/lab';
import { useSelector } from 'react-redux';

const Notification = () => {
    const notification = useSelector(state => state.notification);
    if(!notification){
        return null;
    }

    return (
        <div>
            {notification.type === 'success' ? (
                <Alert severity='success'>{notification.message}</Alert>    
            ) : (
                <Alert severity='error'>{notification.message}</Alert>
            )}
        </div>
    )
};

export default Notification;