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
        <Alert className='notification-style' severity='success'>{notification.message}</Alert>    
      ) : (
        <Alert className='notification-style' severity='error'>{notification.message}</Alert>
      )}
    </div>
  )
};

export default Notification;