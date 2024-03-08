import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import { Modal } from 'antd';
import Login from '../../components/auth/Login';

function Private() {
  const [ok, setOk] = useState(false);
  const [visible, setVisible] = useState(false); // corrected spelling
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/v1/userauth/userAuth`);
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.log('Error checking authentication:', error);
        setOk(false);
      }
    };

    if (token) {
      checkAuth();
    }
  }, [token]);

  return ok ? <Outlet /> : (
    <div className="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
      <div className="rounded-lg bg-white p-8 text-center shadow-xl">
        <h4 className="mb-4 text-2xl text-gray-800 font-bold">You can't reach this page</h4>
        <button onClick={() => setVisible(true)} className="mt-4 inline-block rounded bg-orange-600 px-4 py-2 font-semibold text-white hover:bg-orange-500">Login</button>
      </div>
      <Modal onCancel={() => setVisible(false)} footer={false} visible={visible}> {/* corrected spelling */}
        <Login />
      </Modal>
    </div>
  );
}

export default Private;
