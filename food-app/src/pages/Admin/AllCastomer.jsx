import React, { useState, useEffect } from 'react';
import Admenu from './Admenu';
import toast from 'react-hot-toast';
import axios from 'axios';

function AllCastomer() {
    const [getCastomer, setGetCastomer] = useState([]);

    const getAllCastomers = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/v1/userauth/all-users`);
            toast.success(data.msg)
            setGetCastomer(data.allUser)
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong getting castomers details')
        }
    }

    useEffect(()=>{getAllCastomers()}, []);

    return (
        <>
            <div className='flex h-screen'>
                <Admenu />
                <div className='mt-[90px] overflow-y-auto p-8 w-[65vw]'>
                    <div className="overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        SNo.
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        First Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Address
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Role
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                              {
                                getCastomer?.map((curElm, index)=> (
                                    <tr key={curElm._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                       <td className="px-6 py-4 font-medium capitalize text-gray-900 whitespace-nowrap dark:text-white">
                                            #{index}
                                        </td>
                                        <td className="px-6 py-4 font-medium capitalize text-gray-900 whitespace-nowrap dark:text-white">
                                            {curElm.name}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {curElm.email}
                                        </td>
                                        <td className="px-6 py-4 font-medium capitalize text-gray-900 whitespace-nowrap dark:text-white">
                                            {curElm.address}
                                        </td>
                                        <td className="px-6 py-4 font-medium capitalize text-gray-900 whitespace-nowrap dark:text-white">
                                            {curElm.role === 1 ? 'admin' : 'user'}
                                        </td>
                                    </tr>
                                ))
                              }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllCastomer
