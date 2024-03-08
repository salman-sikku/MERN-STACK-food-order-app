import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import FoodLogo from '../../assets/foodLogo.png';


function ForgetPassword({setvisibleForPass}) {
  const [email, setemail] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleForgotPasssword = async(e)=>{
    e.preventDefault()
    try {
      const {data} = await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/v1/userauth/forgot-password`, { email, answer, newPassword });
      toast.success(data.msg);
      setvisibleForPass(false)
    } catch (error) {
      console.log(error);
      toast.error('something went wrong in chaned password')
    }
  }
  return (
    <>
       <div className='flex justify-between items-center mt-4'>
                <div className=''>
                    <h2 className='text-3xl text-[#2d3146] font-semibold'>RESET PASSWORD</h2>
                    <p className='text-sm font-semibold mt-2'>Fill in your email and answer below to request a new password. </p>
                </div>
                <div className='w-[100px] h-[100px]'>
                    <img className='w-full object-cover' src={FoodLogo} alt="logoFind" />
                </div>
            </div>
            <form onSubmit={handleForgotPasssword} className='flex flex-col'>
                <input type="email" value={email} onChange={(e) => setemail(e.target.value)} placeholder='Email' className='border p-3 mt-3' required />
                <input type="answer" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder='What is your favorite food?' className='border p-3 mt-3' required />
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder='New password' className='border p-3 mt-3' required />
                <button className='p-3 bg-[#fc8019] text-white font-semibold my-5'>RESET PASSWORD</button>
            </form>
    </>
  )
}

export default ForgetPassword
