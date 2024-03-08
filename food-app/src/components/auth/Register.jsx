import React, { useState } from 'react';
import FoodLogo from '../../assets/foodLogo.png';
import axios from 'axios';
import toast from 'react-hot-toast';
import Login from '../auth/Login';
import { Modal } from 'antd';

function Register({setVisibleModle, userCity}) {
    const [visibleLogin, setVisibleLogin] = useState(false);
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [address, setaddress] = useState(userCity);
    const [answer, setanswer] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/v1/userauth/register`, { name, email, password, address, answer });
            toast.success(response.data.msg);
            setname('');
            setemail('');
            setpassword('');
            setanswer('');
            hadleModle()
        } catch (error) {
            console.log(error);
            toast.error(response.data.msg);
        }
    }

    const hadleModle = ()=>{
        setVisibleLogin(true);
        setVisibleModle(false)
    }

    const hadleRegis = ()=>{
        setVisibleLogin(false);
        setVisibleModle(true)
    }

    return (
        <>
            <div className='flex justify-between items-center py-2'>
                <div className=''>
                    <h2 className='text-3xl text-[#2d3146] font-semibold'>Sign up</h2>
                    <p className='cursor-pointer text-sm font-semibold mt-2'>or <span className='text-[#fc8019]' onClick={hadleModle} >login to your account</span></p>
                </div>
                <div className='w-[90px] h-[90px]'>
                    <img className='w-full object-cover' src={FoodLogo} alt="logoFind" />
                </div>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <input type="text" value={name} onChange={(e) => setname(e.target.value)} placeholder='Name' className='border p-3 mt-3' required />
                <input type="email" value={email} onChange={(e) => setemail(e.target.value)} placeholder='Email' className='border p-3 mt-3' required />
                <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder='Password' className='border p-3 mt-3' required />
                <input type="address" value={address} onChange={(e) => setaddress(e.target.value)} placeholder='Address' className='border p-3 mt-3' required />
                <input type="answer" value={answer} onChange={(e) => setanswer(e.target.value)} placeholder='What is your favorite food?' className='border p-3 mt-3' required />
                <button className='p-3 bg-[#fc8019] text-white font-semibold my-5'>CONTINUE</button>
            </form>
            {
                <Modal onCancel={() => setVisibleLogin(false)} footer={false} visible={visibleLogin}>
                    <Login hadleRegis={hadleRegis} setVisibleLogin={setVisibleLogin}/>
                </Modal>
            }
        </>
    )
}

export default Register
