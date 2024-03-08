import React, { useState } from 'react';
import MenuAsideBar from './MenuAsideBar';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateKeyword, updateResults } from './../feature/searchDataSlice.js';
import { LuShoppingBag } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoReorderThree } from "react-icons/io5";
import { MdMyLocation } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Popup from './Popup';
import Register from '../components/auth/Register.jsx'
import { Modal } from 'antd';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const items = useSelector(state => state.cart.items);
    const user = useSelector(state => state.auth.user);
    const [openSideBar, setopenSideBar] = useState(false);
    const [visibleModle, setVisibleModle] = useState(false);
    const [location, setLocation] = useState('');
    const [userCity, setuserCity] = useState('')
    const [visibleSearchModal, setVisibleSearchModal] = useState(false);
    const [searchKeyword, setsearchKeyword] = useState('');
    const [attemptOpenSideBar, setAttemptOpenSideBar] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(
                `${import.meta.env.REACT_APP_API_URL}/api/v1/product/search-product/${searchKeyword}`
            );
            dispatch(updateKeyword(searchKeyword));
            dispatch(updateResults(data));
            setVisibleSearchModal(false)
            navigate('/search-product');
            setsearchKeyword("")
        } catch (error) {
            console.log(error);
            toast.error('something went wrong in searching product')
        }
    }
    const hadleChange = async (e) => {
        setsearchKeyword(e.target.value)
    }

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
                    axios.get(apiUrl)
                        .then(response => {
                            const userLocation = response.data.display_name || ''; // Default value if city is undefined
                            setLocation(userLocation);
                            setuserCity(response.data.address.state);                })
                        .catch(error => {
                            console.error('Error fetching location:', error);
                        });
                },
                (error) => {
                    toast.error('Error getting geolocation:', error.message);
                }
            );
        } else {
            toast.error('Geolocation is not supported by this browser.');
        }
    };

    return (
        <>
            <div className='w-[100vw] bg-[#fff] text-[#1e1e1e] h-[60px] md:h-[80px] px-3 md:px-14 flex justify-between items-center shadow-md fixed top-0 left-0 right-0'>
                <div className='flex'>
                    <div onClick={() => {
                        if (!user) {
                            setAttemptOpenSideBar(true);
                        } else {
                            setopenSideBar(true);
                        }
                    }} className='p-[9px] md:p-[11px] text-[20px] cursor-pointer bg-[#fbbc2f] text-[#fff] rounded-md '>
                        <IoReorderThree />
                    </div>
                    {
                        !location ? (<div onClick={getLocation} className='flex items-center ml-4 md:ml-8 '>
                            <span className='text-md md:text-lg'><MdMyLocation /></span>
                            <span className='text-sm md:text-md ml-1 md:ml-3 cursor-pointer text-[#626a71] hover:text-[#151c2c]'>Get current location</span>
                        </div>) : (<div className='flex items-center ml-2 md:ml-8'>
                            <span className='text-md md:text-lg'><IoLocationSharp /></span>
                            <input type="text" value={location} readOnly className='md:block hidden ml-1 md:ml-3 text-sm md:text-md outline-none text-[#626a71]' />
                            <span className='md:hidden block text-[12px] ml-2'>{location.slice(0, 20)}...</span>
                        </div>)
                    }


                </div>
                <nav className='flex justify-between text-[20px]'>
                    <div onClick={() => setVisibleSearchModal(true)} className='md:p-[11px] md:border md:bg-[#f1f1f1] md:rounded-md ml-4 md:mr-8 text-[#3d4152] md:text-[#000] cursor-pointer transition ease-in-out md:hover:border-[#fbbc2f] md:hover:bg-[#fff9eb] hover:text-[#fbbc2f]'>
                        <IoSearch />
                    </div>
                    <div onClick={() => setVisibleModle(true)} className='md:p-[11px] md:border md:bg-[#f1f1f1] md:rounded-md ml-4 md:mr-8 text-[#3d4152] md:text-[#000] cursor-pointer transition ease-in-out md:hover:border-[#fbbc2f] md:hover:bg-[#fff9eb] hover:text-[#fbbc2f]'>
                        <RiAccountCircleLine />
                    </div>
                    <Link to='/add-to-cart' className='relative md:p-[11px] md:border md:bg-[#f1f1f1] md:rounded-md ml-4 md:mr-8 text-[#3d4152] md:text-[#000] cursor-pointer transition ease-in-out md:hover:border-[#fbbc2f] md:hover:bg-[#fff9eb] hover:text-[#fbbc2f]'>
                        {items.length < 1 ? null : <span className='absolute top-[-12px] left-[14px] md:top-[-12px] md:left-[28px] bg-[#08b42e] text-[#fff] px-1 py-[2px] md:px-2 md:py-[2px] rounded-full text-[12px] md:text-sm'>{items.length}</span>}
                        <LuShoppingBag />
                    </Link>
                </nav>
                {openSideBar && (
                    <div className='border absolute top-0 left-0 w-screen bg-[rgba(0,0,0,0.1)] h-screen'>
                        <MenuAsideBar openSideBar={openSideBar} setopenSideBar={setopenSideBar} />
                    </div>
                )}
                {
                    <Modal onCancel={() => setVisibleModle(false)} footer={false} visible={visibleModle}>
                        <Register setVisibleModle={setVisibleModle} userCity={userCity} />
                    </Modal>
                }
                {
                    <Modal onCancel={() => setVisibleSearchModal(false)} footer={false} visible={visibleSearchModal}>
                        <form onSubmit={handleSearch} className='rounded-md bg-[#f1f1f1] w-[90%] p-4 mt-6 flex justify-center items-center'>
                            <span className='mr-4 text-[18px]'><IoSearch /></span>
                            <input value={searchKeyword} onChange={hadleChange} className='w-[90%] bg-inherit outline-none' type="text" placeholder='Search food...' />
                        </form>
                    </Modal>
                }
                {!user && attemptOpenSideBar && <Popup setVisibleModle={setVisibleModle} />}
            </div>
        </>
    )
}

export default Header;
