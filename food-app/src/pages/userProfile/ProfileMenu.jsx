import React, { useState } from 'react';
import {NavLink} from 'react-router-dom';
import {Modal} from 'antd';
import UserNotification from './UserNotification';

// icons
import { GrUserManager } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import { PiBowlFood } from "react-icons/pi";
import { MdOutlineEditNotifications } from "react-icons/md";




function ProfileMenu() {
    const [visible, setvisible] = useState(false)
    return (
        <>
            <div className='md:w-[18vw] w-[14vw] h-[100vh] bg-[#ffff] shadow-lg'>
                <div className='md:px-8 py-12 md:mt-[70px]'>
                    <h2 className='text-[#282c3f] text-[22px] font-bold md:block hidden'>User Profile</h2>
                    <ul className='md:ml-[-25px] mt-14 text-[#7e808c]'>
                        <li className="mt-14 md:mt-10 px-4 py-2 hover:text-[#2c2f3e] hover:font-medium cursor-pointer transition ease-in-out text-[18px]  rounded-lg"><NavLink className='flex items-center' to='/userprofile/user'><span className='text-[21px]'><GrUserManager /></span> <span className='ml-3 md:block hidden'>Edit profile</span></NavLink></li>
                        <li className="mt-14 md:mt-10 px-4 py-2 hover:text-[#2c2f3e] hover:font-medium cursor-pointer transition ease-in-out text-[18px]  rounded-lg"><NavLink className='flex items-center' to='/userprofile/user/like/product'><span className='text-[21px]'><FaRegHeart /></span> <span className='ml-3 md:block hidden'>Favorites</span></NavLink></li>
                        <li className="mt-14 md:mt-10 px-4 py-2 hover:text-[#2c2f3e] hover:font-medium cursor-pointer transition ease-in-out text-[18px]  rounded-lg"><NavLink className='flex items-center' to='/userprofile/user-oders'><span className='text-[21px]'><PiBowlFood /></span> <span className='ml-3 md:block hidden'>Ouders</span></NavLink></li>
                        <li onClick={()=> setvisible(true)} className="mt-14 md:mt-10 px-4 py-2 flex items-center hover:text-[#2c2f3e] hover:font-medium cursor-pointer transition ease-in-out text-[18px]  rounded-lg"><span className='text-[21px]'><MdOutlineEditNotifications /></span> <span className='ml-3 md:block hidden'>Notifacation</span></li>
                    </ul>
                </div>
            </div>
            {
                <Modal onCancel={()=> setvisible(false)} footer={false} visible={visible}>
                  <UserNotification/>
                </Modal>
            }
        </>
    )
}

export default ProfileMenu
