import React, { useState, useEffect } from 'react';
import ProfileMenu from './ProfileMenu';
import profile from '../../assets/userprofile.png';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '../../feature/authSlice'
import axios from 'axios';
import toast from 'react-hot-toast'

function UserProfile() {
  const user = useSelector(state => state.auth.user);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [answer, setanswer] = useState("");
  const [address, setaddress] = useState("");

  useEffect(() => {
    if (user) {
      const { name, email, answer, address } = user;
      setname(name || "");
      setemail(email || "");
      setanswer(answer || "");
      setaddress(address || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authData = JSON.parse(localStorage.getItem('auth'));
      const token = authData.token;

      const { data } = await axios.put(`${import.meta.env.REACT_APP_API_URL}/api/v1/userauth/profile`, {
        name,
        email,
        answer,
        address,
      }, {
        headers: {
          Authorization: token
        }
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        setAuth({ user: data.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };



  return (
    <>
      <div className='flex bg-white'>
        <ProfileMenu />
        <div className='md:w-[68vw] w-[78vw] mt-[90px] overflow-y-auto md:px-24 pl-3 md:py-11 py-6 sm:rounded-lg'>
          <div>
            <div className='flex items-center'>
              <div className='md:h-24 h-20 md:w-24 w-20 p-[2px] rounded-full overflow-hidden bg-[#e9c882] flex items-center justify-center'>
                <img className='w-full h-full object-cover' src={profile} alt="User_Profile" />
              </div>
              <div className='ml-4'>
                <h3 className='md:text-lg text-md leading-3 text-[#151c2c] capitalize'>{user.name}</h3>
                <span className='md:text-sm text-[12px] text-[#7e7e82]'>{user.address}</span>
              </div>
            </div>
            <form className='mt-16 '>
              <div className='flex justify-between'>
                <div>
                  <label className=' capitalize text-[#7e7e82] flex flex-col text-[15px] ml-1 font-semibold'>
                    Name
                    <input
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                      type="text"
                      className=' capitalize outline-[#fbbc2f] text-[#151c2c] rounded-lg bg-[#fbfbfb] border-2  md:w-[20vw] w-[32vw] px-2 py-2 md:px-4 md:py-3 mt-3 text-center'
                    />
                  </label>
                </div>
                <div>
                  <label className='text-[#7e7e82] flex flex-col text-[15px] ml-1 font-semibold'>
                    Email
                    <input
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                      type="email"
                      className='outline-[#fbbc2f] text-[#151c2c] rounded-lg bg-[#fbfbfb] border-2 md:w-[20vw] w-[32vw] px-2 py-2 md:px-4 md:py-3 mt-3 text-center'
                    />
                  </label>
                </div>
              </div>
              <div className='flex justify-between mt-8'>
                <div>
                  <label className='capitalize text-[#7e7e82] flex flex-col text-[15px] ml-1 font-semibold'>
                    Your farvorite food
                    <input
                      value={answer}
                      onChange={(e) => setanswer(e.target.value)}
                      type="text"
                      className=' capitalize outline-[#fbbc2f] text-[#151c2c] rounded-lg bg-[#fbfbfb] border-2  md:w-[20vw] w-[32vw] px-2 py-2 md:px-4 md:py-3 mt-3 text-center'
                    />
                  </label>
                </div>
                <div>
                  <label className='text-[#7e7e82] flex flex-col text-[15px] ml-1 font-semibold'>
                    Address
                    <input
                      value={address}
                      onChange={(e) => setaddress(e.target.value)}
                      type="text"
                      className='outline-[#fbbc2f] text-[#151c2c] rounded-lg bg-[#fbfbfb] border-2 md:w-[20vw] w-[32vw] px-2 py-2 md:px-4 md:py-3 mt-3 text-center'
                    />
                  </label>
                </div>
              </div>
              <div className='text-center mt-12'>
                <button onClick={handleSubmit} className='bg-[#e67e22] md:px-12 px-8 py-2 md:py-3 rounded-xl border font-semibold text-white'>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
