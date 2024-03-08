import React, { useState, useEffect } from 'react';
import ProfileMenu from './ProfileMenu';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import moment from 'moment';

function UserOrder() {
  const [ouders, setOuders] = useState([]);
  const token = useSelector(state => state.auth.token);

  //get orders
  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/v1/userauth/get-order`);
      setOuders(data);
    } catch (error) {
      console.log(error);
      toast.error('somthing went wrong get your order!');
    }
  }

  useEffect(() => {
    if (token) getOrders()
  }, [token])

  return (
    <>
      <div className='flex bg-white w-screen'>
        <ProfileMenu />
        {
          ouders.length < 1 ? (<div className='md:flex text-center justify-center items-center md:w-[68vw] w-[78vw] mt-[90px] overflow-y-auto md:px-24 py-11 sm:rounded-lg'>
            <div><h2 className='md:text-2xl text-lg text-[#282828] font-bold md:text-center'>No orders available yet</h2></div>
          </div>) : (<div className='md:w-[68vw] w-[90vw] mt-[90px] overflow-y-auto md:px-24 px-4 md:py-11 py-4 sm:rounded-lg'>
            {
              ouders.map((o, i) => {
                return (
                  <div className="overflow-x-auto shadow-md sm:rounded-lg" key={i}>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">#</th>
                          <th scope="col" className="px-6 py-3">Status</th>
                          <th scope="col" className="px-6 py-3">Buyer</th>
                          <th scope="col" className="px-6 py-3">date</th>
                          <th scope="col" className="px-6 py-3">Payment</th>
                          <th scope="col" className="px-6 py-3">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-6 py-4 font-medium capitalize text-gray-900 whitespace-nowrap dark:text-white">{i + 1}</td>
                          <td className="px-6 py-4 font-medium capitalize text-gray-900 whitespace-nowrap dark:text-white">{o?.status}</td>
                          <td className="px-6 py-4 font-medium capitalize text-gray-900 whitespace-nowrap dark:text-white">{o?.buyer?.name}</td>
                          <td className="px-6 py-4 font-medium capitalize text-gray-900 whitespace-nowrap dark:text-white">{moment(o?.createdAt).fromNow()}</td>
                          <td className="px-6 py-4 font-medium capitalize text-gray-900 whitespace-nowrap dark:text-white">{o?.payment.success ? "Success" : "Failed"}</td>
                          <td className="px-6 py-4 font-medium capitalize text-gray-900 whitespace-nowrap dark:text-white">{o?.products?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className='p-4'>
                      {o?.products?.map((p, i) => (
                        <div className="flex items-center" key={i}>
                          <div className="w-[100px] h-[100px]">
                            <img
                              src={`${import.meta.env.REACT_APP_API_URL}/api/v1/product/get-photo/${p._id}`}
                              className="w-full h-full object-cover"
                              alt={p.name}
                            />
                          </div>
                          <div className="text-center ml-4">
                            <p className='text-[14px] capitalize font-semibold'>{p.name}</p>
                            <p className='text-[14px] capitalize font-semibold'>Price : {p.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })
            }

          </div>)
        }
      </div>
    </>
  );
}

export default UserOrder;
