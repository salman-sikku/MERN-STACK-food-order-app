import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaStar } from "react-icons/fa";
import { BsCurrencyRupee } from "react-icons/bs";
import { addItem } from '../../feature/cartSlice.js';
import ProfileMenu from './ProfileMenu.jsx';
import toast from 'react-hot-toast';
import { Modal } from 'antd';

function UserLikePro() {
    const dispatch = useDispatch();
    const [visibleModalId, setVisibleModalId] = useState(null);
    const likeItems = useSelector(state => state.likemeal.likeItems);

    const handleAdd = (curElm) => {
        toast.success("Item Added in cart")
        dispatch(addItem(curElm));
    }

    return (
        <>
            <div className='flex bg-white h-screen'>
                <ProfileMenu />
                {likeItems.length < 1 ? (<div className='md:flex text-center justify-center items-center md:w-[68vw] w-[78vw] mt-[90px] overflow-y-auto md:px-24 py-11 sm:rounded-lg'>
                    <div><h2 className='md:text-2xl text-lg text-[#282828] font-bold md:text-center'>No like meal available yet</h2></div>
                </div>) : (<div className='mt-[50px] overflow-y-auto md:px-10 px-4 md:w-[80vw] w-[92vw] max-h-[calc(100vh - 120px)]'>
                    <div className='grid grid-cols-2 md:grid-cols-3 md:gap-4 gap-2 mt-6'>
                        {likeItems?.map((curElm) => (
                            <div key={curElm._id} className='md:h-[320px] md:w-[240px] w-[138px] h-[230px]'>
                                <div className='h-[30%] w-[100%] flex justify-center items-center'>
                                    <div onClick={() => setVisibleModalId(curElm._id)} className='w-[64%] h-[64%] cursor-pointer'>
                                        <img src={`${import.meta.env.REACT_APP_API_URL}/api/v1/product/get-photo/${curElm._id}`} alt="product_image" />
                                    </div>
                                </div>
                                <div className='productStyle md:rounded-[40px] rounded-[16px] h-[70%] w-[100%] bg-[#ffff] text-[#292a48]'>
                                    <div className='md:px-6 px-4 md:mt-20 mt-10 w-full'>
                                        <h2 className='font-bold md:text-[17px] text-sm capitalize'>{curElm.name}</h2>
                                        <p className='text-[14px] text-[#66676a] md:block hidden'>{curElm.description.split(" ").slice(0, 13).join(" ")}...</p>
                                        <p className='text-[13px] text-[#66676a] md:hidden block'>{curElm.description.split(" ").slice(0, 5).join(" ")}</p>
                                        <footer className='flex justify-between items-center'>
                                            <h2 className='md:text-[20px] text-sm flex items-center justify-center'><span><BsCurrencyRupee /></span>{curElm.price}</h2>
                                            <span className='md:py-1 py-[2px] md:px-1 px-[2px] md:text-[16px] text-[14px] bg-[#e67e22] text-white md:rounded-full rounded-lg flex justify-center items-center'><FaStar /> <span className='ml-1 font-semibold'>{curElm.rating}</span></span>
                                        </footer>
                                    </div>
                                </div>
                                {visibleModalId === curElm._id && (
                                    <Modal onCancel={() => setVisibleModalId(null)} footer={null} visible={visibleModalId === curElm._id}>
                                        <div className=''>
                                            <div className='w-[300px] h-[300px] m-auto'>
                                                <img className='w-full h-full' src={`${import.meta.env.REACT_APP_API_URL}/api/v1/product/get-photo/${curElm._id}`} alt="product_image" />
                                            </div>
                                            <div className='flex justify-between'>
                                                <div className='w-full'>
                                                    <span className='w-[50px] py-1 text-[14px] bg-[#fbbc2f] text-white rounded-lg flex justify-center items-center'><FaStar /> <span className='ml-1 font-semibold'>{curElm.rating}</span></span>
                                                    <h2 className='font-bold mt-2 text-lg capitalize'>{curElm.name}</h2>
                                                    <h2 className='text-md w-8 flex items-center justify-center'><span><BsCurrencyRupee /></span>{curElm.price}</h2>
                                                    <p className='mt-2'>{curElm.description.split(" ").slice(0, 18).join(" ")}..</p>
                                                </div>
                                                <button onClick={() => handleAdd(curElm, curElm._id)} className='h-8 border shadow-md py-1 px-2 bg-white text-sm font-bold text-[#60b246] '>ADD</button>
                                            </div>
                                        </div>
                                    </Modal>
                                )}
                            </div>
                        ))}
                    </div>
                </div>)}
            </div>
        </>
    );
}

export default UserLikePro;
