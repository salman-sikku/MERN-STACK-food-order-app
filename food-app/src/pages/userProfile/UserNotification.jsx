import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import toast from 'react-hot-toast';
import { RxCross2 } from "react-icons/rx";

function UserNotification() {
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 60000); // Refresh notifications every minute
        return () => clearInterval(interval); // Clean up interval on unmount
    }, []);

    const fetchNotifications = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/v1/product/get-notification`);
            setNotifications(data.getnotimsg);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const deleteHandler = async (id)=>{
        try { 
          const {data} = await axios.delete(`${import.meta.env.REACT_APP_API_URL}/api/v1/product/delete-notification/${id}`);
        } catch (error) {
          console.log(error);
          toast.error('Something went wrong delete notification!')             
        }
    }

    return (
        <div>
            <h2 className='text-lg'>Notifications</h2>
            {notifications && notifications.length > 0 ? (
                <ul >
                    {notifications.map(notification => (
                        <li key={notification._id} className='py-3'>
                            <h3 className='leading-4'>{notification.message}</h3>
                            <h5>{new Date(notification.createdAt).toLocaleString()}</h5>
                            <button onClick={()=> deleteHandler(notification._id)} className='px-1 py-y border text-[11px] bg-[#F1F1F1]'>Remove</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>There are no notifications yet.</p>
            )}
        </div>
    );
}

export default UserNotification
