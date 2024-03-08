import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

function NotificationComponent() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000); // Refresh notifications every minute
    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  const fetchNotifications = async () => {
    try {
      const {data} = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/v1/product/get-notification`);
      setNotifications(data.getnotimsg);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  return (
    <div>
      <h2 className='text-lg'>Notifications</h2>
      {notifications && notifications.length > 0 ? (
        <ul >
          {notifications.map(notification => (
            <li key={notification._id} className='py-2'>
              <h3 className='leading-4'>{notification.message}</h3>
              <h5>{new Date(notification.createdAt).toLocaleString()}</h5>
            </li>
          ))}
        </ul>
      ) : (
        <p>There are no notifications yet.</p>
      )}
    </div>
  );
}

export default NotificationComponent;
