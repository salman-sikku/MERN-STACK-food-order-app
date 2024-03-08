import React, { useState, useEffect } from 'react';
import Admenu from './Admenu';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductChart from './ProductChart';
import UserCountChart from './UserCountChart';

// icons
import { RiAccountCircleFill } from "react-icons/ri";
import { FaBox } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa6";

const AdminDash = () => {
  const [products, setproducts] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [getCastomer, setGetCastomer] = useState([]);
  const [ouders, setOuders] = useState([]);



  const getALLProducts = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/v1/product/getall-products`);
      if (data.success) {
        setproducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const getCategory = async () => {
    const { data } = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/v1/category/getall-category`);
    setCategoryName(data.getCategory)
  }
  const getAllCastomers = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/v1/userauth/all-users`);
      setGetCastomer(data.allUser)
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong getting castomers details')
    }
  }
  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/v1/userauth/getall-orders`);
      setOuders(data);
    } catch (error) {
      console.log(error);
      toast.error('somthing went wrong get your order!')
    }
  }
  useEffect(() => { getALLProducts(); getCategory(); getAllCastomers(); getOrders() }, []);

  return (
    <>
      <div className='flex h-screen'>
        <Admenu />
        <div className='mt-[90px] overflow-y-auto p-8 w-[80vw] max-h-[calc(100vh - 120px)] shadow-md sm:rounded-lg'>
          <div className='grid md:grid-cols-4 grid-cols-2 gap-4'>
            <Link to='/admindashbord/all-castomrs' className='transition-transform duration-300 ease-in-out transform hover:scale-105 p-5 w-[200px] h-[110px] bg-white text-[#151c2c] rounded-lg border shadow-lg'>
              <h3 className='text-[17px] font-semibold text-[#151c2c]'>TOTAL CUSTOMER'S</h3>
              <div className='flex justify-between items-center mt-4'>
                <h3 className='text-[18px] text-[#151c2c] '>{getCastomer?.length}</h3>
                <span className='py-2 px-2 text-[18px] rounded-full bg-[#151c2c] text-white flex justify-center items-center'><RiAccountCircleFill /></span>
              </div>
            </Link>
            <Link to='/admindashbord/all-products' className='transition-transform duration-300 ease-in-out transform hover:scale-105 p-5 w-[200px] h-[110px] bg-white text-[#151c2c] rounded-lg border shadow-lg'>
              <h3 className='text-[17px] font-semibold text-[#151c2c]'>TOTAL PRODUCT'S</h3>
              <div className='flex justify-between items-center mt-4'>
                <h3 className='text-[18px] text-[#151c2c] '>{products?.length}</h3>
                <span className='py-2 px-2 text-[18px] rounded-full bg-[#151c2c] text-white flex justify-center items-center'><FaBox /></span>
              </div>
            </Link>
            <Link to='/admindashbord/craete-category' className='transition-transform duration-300 ease-in-out transform hover:scale-105 p-5 w-[200px] h-[110px] bg-white text-[#151c2c] rounded-lg border shadow-lg'>
              <h3 className='text-[17px] font-semibold text-[#151c2c]'>TOTAL CATEGORY</h3>
              <div className='flex justify-between items-center mt-4'>
                <h3 className='text-[18px] text-[#151c2c] '>{categoryName?.length}</h3>
                <span className='py-2 px-2 text-[18px] rounded-full bg-[#151c2c] text-white flex justify-center items-center'><MdCategory /></span>
              </div>
            </Link>
            <Link to='/admindashbord/all-orders' className='transition-transform duration-300 ease-in-out transform hover:scale-105 p-5 w-[200px] h-[110px] bg-white text-[#151c2c] rounded-lg border shadow-lg'>
              <h3 className='text-[17px] font-semibold text-[#151c2c]'>TOTAL ORDERS</h3>
              <div className='flex justify-between items-center mt-4'>
                <h3 className='text-[18px] text-[#151c2c] '>{ouders.length}</h3>
                <span className='py-2 px-2 text-[18px] rounded-full bg-[#151c2c] text-white flex justify-center items-center'><FaCartArrowDown /></span>
              </div>
            </Link>
          </div>
          <div className='flex justify-between mt-12'>
            <div className='w-[48%]'>
              <ProductChart products={products} />
            </div>
            <div className='w-[50%]'>
              <UserCountChart userData={getCastomer} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDash
