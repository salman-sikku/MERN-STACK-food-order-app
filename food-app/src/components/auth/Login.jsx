import React, { useState } from 'react';
import FoodLogo from '../../assets/foodLogo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../feature/authSlice';
import { Modal } from 'antd';
import ForgetPassword from './ForgetPassword'

function Login({ hadleRegis , setVisibleLogin}) {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [visibleForPass, setvisibleForPass] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/v1/userauth/login`, { email, password });
            toast.success(response.data.msg);
            dispatch(setAuth({
                user: response.data.user,
                token: response.data.token
            }));
            localStorage.setItem('auth', JSON.stringify(response.data));
            setVisibleLogin(false)
            navigate('/');
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.msg); 
        }
    }

    const hadleLoginModal = ()=>{
        setVisibleLogin(false);
        setvisibleForPass(true)
    }

    return (
        <>
            <div className='flex justify-between items-center mt-4'>
                <div className=''>
                    <h2 className='text-3xl text-[#2d3146] font-semibold'>Login</h2>
                    <p className='text-sm font-semibold mt-2'>Need an account? <span className='text-[#fc8019] cursor-pointer' onClick={hadleRegis}>Sign up</span> or <span className='text-[#fc8019] cursor-pointer' onClick={hadleLoginModal}>Forget Password</span></p>
                </div>
                <div className='w-[100px] h-[100px]'>
                    <img className='w-full object-cover' src={FoodLogo} alt="logoFind" />
                </div>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <input type="email" value={email} onChange={(e) => setemail(e.target.value)} placeholder='Email' className='border p-3 mt-3' required />
                <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder='Password' className='border p-3 mt-3' required />
                <button className='p-3 bg-[#fc8019] text-white font-semibold my-5'>Login</button>
            </form>
            {
                <Modal onCancel={() => setvisibleForPass(false)} footer={false} visible={visibleForPass}>
                    <ForgetPassword setvisibleForPass={setvisibleForPass}/>
                </Modal>
            }
        </>
    );
}

export default Login;
