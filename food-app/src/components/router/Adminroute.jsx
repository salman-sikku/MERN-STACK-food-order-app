import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Outlet } from 'react-router-dom'; // Make sure you import Outlet

function Adminroute() {
    const [ok, setOk] = useState(false);
    const token = useSelector(state => state.auth.token);
    useEffect(() => {
        const checkAuthAdmin = async () => {
            try {
                const res = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/v1/userauth/adminAuth`, {
                    headers: {
                        Authorization: token
                    }
                });
                if (res.data.ok) {
                    setOk(true)
                    toast.success('Admin Access Successfully');
                } else {
                    setOk(false)
                }
            } catch (error) {
                console.log(error);
                toast.error('Something went wrong');
                setOk(false)
            }
        };

        if (token) {
            checkAuthAdmin(); // Invoke checkAuthAdmin if token exists
        }
    }, [token]);

    return ok ? <Outlet /> : "You can't reach this page";
}

export default Adminroute;
