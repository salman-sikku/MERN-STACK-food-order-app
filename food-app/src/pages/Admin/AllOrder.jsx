import React, { useState, useEffect } from 'react';
import Admenu from './Admenu';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import moment from 'moment';
import { Select } from "antd";
const { Option } = Select;

function AllOrder() {
  const [ouders, setOuders] = useState([]);
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const token = useSelector(state => state.auth.token);

  //get orders
  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/v1/userauth/getall-orders`);
      setOuders(data);
    } catch (error) {
      console.log(error);
      toast.error('somthing went wrong get your order!')
    }
  }

  useEffect(() => {
    if (token) getOrders()
  }, [token]);
  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`${import.meta.env.REACT_APP_API_URL}/api/v1/userauth/status-order/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className='flex h-screen'>
        <Admenu />
        <div className='mt-[80px] overflow-y-auto p-8 w-[65vw] shadow-md sm:rounded-lg'>
          <div className='overflow-y-auto  sm:rounded-lg'>
            {
              ouders.map((o, i) => {
                return (
                  <div className="overflow-x-auto mt-8" key={i}>
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
                          <td className="px-6 py-4 font-medium capitalize text-gray-900 whitespace-nowrap dark:text-white">
                            <Select
                              bordered={false}
                              onChange={(value) => handleChange(o._id, value)}
                              defaultValue={o?.status}
                            >
                              {status.map((s, i) => (
                                <Option key={i} value={s}>
                                  {s}
                                </Option>
                              ))}
                            </Select>
                          </td>
                          <td className="px-6 py-4 font-medium capitalize text-gray-900 whitespace-nowrap dark:text-white">{o?.buyer?.name}</td>
                          <td className="px-6 py-4 font-medium capitalize text-gray-900 whitespace-nowrap dark:text-white">{moment(o?.createdAt).fromNow()}</td>
                          <td className="px-6 py-4 font-medium capitalize text-gray-900 whitespace-nowrap dark:text-white">{o?.payment.success ? "Success" : "Failed"}</td>
                          <td className="px-6 py-4 font-medium capitalize text-gray-900 whitespace-nowrap dark:text-white">{o?.products?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className='p-4'>
                      {o?.products?.map((p, i) => (
                        <div className="flex items-center" key={p._id}>
                          <div className="col-md-4">
                            <img
                              src={`${import.meta.env.REACT_APP_API_URL}/api/v1/product/get-photo/${p._id}`}
                              className="card-img-top"
                              alt={p.name}
                              width="100px"
                              height={"100px"}
                            />
                          </div>
                          <div className="text-center ml-2">
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

          </div>
        </div>
      </div>
    </>
  )
}

export default AllOrder
