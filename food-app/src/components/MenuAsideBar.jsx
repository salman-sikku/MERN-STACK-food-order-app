import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import profile from '../assets/userprofile.png';
import { Modal } from 'antd';

//icons
import { FaBowlFood, FaOutdent } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";
import { MdHelpCenter } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import NotificationCompo from './NotificationCompo';


const menuVariants = {
    open: {
        x: 0,
        transition: {
            duration: 0.3,
            ease: 'easeInOut',
        },
    },
    closed: {
        x: '-20vw',
        transition: {
            duration: 0.3,
            ease: 'easeInOut',
        },
    },
};

function MenuAsideBar({ openSideBar, setopenSideBar }) {
    const navicate = useNavigate();
    const user = useSelector(state => state.auth.user);
    const handleOut = () => {
        localStorage.removeItem('auth');
        navicate('/');
        window.location.reload(true)
    }

    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <>
            <motion.div
                variants={menuVariants}
                initial="closed"
                animate={openSideBar ? 'open' : 'closed'}
                className={`bg-white text-[#191d22] h-screen w-[70vw] md:w-[18vw] absolute left-0 md:left-5vw shadow-xl`}
            >
                <div className="p-8 relative">
                    <div className='flex items-center'>
                        <span className='text-1xl text-[#ffca41]'><FaBowlFood /></span>
                        <span className='text-2xl font-bold ml-2'>Bell<span className='text-[#ffca41]'>Fresh</span></span>
                        <button onClick={() => setopenSideBar(false)} className='absolute left-[65vw] lg:left-[17vw] px-2 py-2 bg-[#f1f1f1] rounded-full flex justify-center items-center border hover:border-[#ffca41] hover:bg-[#fff9eb]'><IoCloseSharp /></button>
                    </div>
                    <ul onClick={() => setopenSideBar(false)} className='mt-8 ml-[-15px]'>
                        <li className="mb-2 px-3 py-2 cursor-pointer transition ease-in-out text-[16px] font-semibold rounded-lg hover:bg-[#ffca41] hover:text-[#fff]"><Link to='/' className='flex items-center'><IoMdHome /> <span className='ml-2'>Home</span></Link></li>
                        <li className="mb-2 px-3 py-2 cursor-pointer transition ease-in-out text-[16px] font-semibold rounded-lg hover:bg-[#ffca41] hover:text-[#fff]"><Link to='/liked-products' className='flex items-center'><FaHeart /> <span className='ml-2'>Favorites</span></Link></li>
                        <li className="mb-2 px-3 py-2 cursor-pointer transition ease-in-out text-[16px] font-semibold rounded-lg hover:bg-[#ffca41] hover:text-[#fff]"><Link to='/support' className='flex items-center'><MdHelpCenter /> <span className='ml-2'>Help</span></Link></li>
                        <li className="mb-2 px-3 py-2 cursor-pointer transition ease-in-out flex items-center text-[16px] font-semibold rounded-lg hover:bg-[#ffca41] hover:text-[#fff]"><FaOutdent /> <span className='ml-2' onClick={handleOut}>Sign Out</span></li>
                    </ul>
                    <ul className='mt-3 ml-[-15px]'>
                        <li className="mb-2 px-3 py-2 text-[#b1b1b1] text-[14px]">Other</li>
                        <li onClick={showModal} className="mb-2 px-3 py-2 cursor-pointer transition ease-in-out flex items-center text-[16px] font-semibold rounded-lg hover:bg-[#ffca41] hover:text-[#fff] relative"><IoNotifications /> <span className='ml-2'>Notification</span> <span className='w-[5px] h-[5px] rounded-full bg-orange-500 absolute right-0 text-[14px]'></span></li>
                    </ul>
                </div>
                <div className='px-8' onClick={()=> setopenSideBar(false)}>
                    {
                        user.role === 1 ? (
                            <div className='py-2 font-semibold bg-[#ffca40] text-[#040415] rounded-md border flex justify-center items-center'>
                                <Link to='/admindashbord/dashbord' className=''>Admin Dashboard</Link>
                            </div>
                        ) : (
                            <div className='flex flex-col items-center px-8 py-4 rounded-lg shadow-2xl ring-2 ring-gray-300'>
                                <div className='h-14 w-14 rounded-full overflow-hidden bg-[#e9c882] flex items-center justify-center'>
                                    <img className='w-full h-full object-cover' src={profile} alt="User_Profile" />
                                </div>
                                <h2 className='text-center mt-4 text-lg font-semibold'>{user.name}</h2>
                                <Link to='/userprofile/user' className='mt-4 text-sm font-semibold py-2 px-4 rounded-lg bg-[#f1f1f1] text-[#333] hover:bg-[#ffca41] hover:text-white transition duration-300 ease-in-out'>Open Profile</Link>
                            </div>
                        )
                    }
                </div>
            </motion.div >
            <Modal
               visible={visible}
               footer={false}
               onCancel={handleCancel}
            >
                <NotificationCompo />
            </Modal>
        </>
    );
}

export default MenuAsideBar;
