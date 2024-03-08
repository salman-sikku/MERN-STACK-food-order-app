import React from 'react';

import { NavLink } from 'react-router-dom';

//icons
import { FaBox, FaDashcube, FaUserCheck } from "react-icons/fa6";
import { IoIosCreate } from "react-icons/io";
import { FaProductHunt } from "react-icons/fa";


function Admenu() {
    return (
        <>
            <div className='mt-[70px] w-[18vw] h-[87vh] bg-[#ffff] shadow-lg'>
                <div className='px-8 py-10'>
                    <h2 className='text-[#282c3f] text-[22px] font-bold uppercase'>Admin panel</h2>
                    <ul className='mt-12 ml-[-15px] text-[#7e808c]'>
                        <li className="mt-8 px-3 py-2 hover:text-[#2c2f3e] cursor-pointer transition ease-in-out text-[18px] rounded-lg"><NavLink to='/admindashbord/dashbord' className='flex items-center'><FaDashcube /> <span className='ml-3'>Dashbord</span></NavLink></li>
                        <li className="mt-8 px-3 py-2 hover:text-[#2c2f3e] cursor-pointer transition ease-in-out text-[18px] rounded-lg"><NavLink to='/admindashbord/craete-category' className='flex items-center'><IoIosCreate /> <span className='ml-3'>Create Category</span></NavLink></li>
                        <li className="mt-8 px-3 py-2 hover:text-[#2c2f3e] cursor-pointer transition ease-in-out text-[18px] rounded-lg"><NavLink to='/admindashbord/craete-product' className='flex items-center'><FaProductHunt /> <span className='ml-3'>Create Product</span></NavLink></li>
                        <li className="mt-8 px-3 py-2 hover:text-[#2c2f3e] cursor-pointer transition ease-in-out text-[18px] rounded-lg"><NavLink to='/admindashbord/all-castomrs' className='flex items-center'><FaUserCheck /> <span className='ml-3'>All Castomer's</span></NavLink></li>
                        <li className="mt-8 px-3 py-2 hover:text-[#2c2f3e] cursor-pointer transition ease-in-out text-[18px] rounded-lg"><NavLink to='/admindashbord/all-products' className='flex items-center'><FaBox /> <span className='ml-3'>Product's</span></NavLink></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Admenu
