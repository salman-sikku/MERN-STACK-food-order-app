import React, { useEffect, useState } from 'react'
import Admenu from './Admenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import {Link} from 'react-router-dom';

const AllProducts = () => {
    const [products, setproducts] = useState([]);
    
    const getALLProducts = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/v1/product/getall-products`);
            if (data.success) {
                setproducts(data.products);
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong!")
        }
    }
    useEffect(() => { getALLProducts() }, []);

    // delete products
    const handleDelete = async(id)=>{
      try {
        let answer = window.prompt("Are You Sure want to delete this product ? ");
        if (!answer) return;
        const {data} = await axios.delete(`${import.meta.env.REACT_APP_API_URL}/api/v1/product/delete-photo/${id}`);
        toast.success(data.msg);
        getALLProducts();
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      } 
    }
    
    return (
        <>
            <div className='flex h-screen'>
                <Admenu />
                <div className='mt-[90px] overflow-y-auto p-8 w-[65vw] shadow-md sm:rounded-lg'>
                    <div className="overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Product image
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Product name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Rating
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {products?.map((curElm) => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={curElm._id}>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className='w-[50px] h-[50px]'>
                                                <img src={`${import.meta.env.REACT_APP_API_URL}/api/v1/product/get-photo/${curElm._id}`} alt={curElm?.name} className='w-full h-full object-cover' />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium capitalize text-gray-900 whitespace-nowrap dark:text-white">
                                            {curElm?.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {curElm?.rating}
                                        </td>
                                        <td className="px-6 py-4">
                                            {curElm?.price}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link to={`/admindashbord/ubdate-products/${curElm?.slug}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                            <button className='ml-4 text-red-500 font-semibold hover:underline' onClick={()=> handleDelete(curElm._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllProducts
