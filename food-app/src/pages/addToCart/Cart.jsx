import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import emtyCart from '../../assets/cart_empty_ipmau1.avif';
import { Link } from 'react-router-dom';
import { removeItem } from '../../feature/cartSlice';
import { FaRegSmileWink } from "react-icons/fa";
import { BsCurrencyRupee } from "react-icons/bs";
import { RiDeleteBin2Line } from "react-icons/ri";
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import Login from '../../components/auth/Login';

// Payment gateway
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

function Cart() {
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const items = useSelector(state => state.cart.items);
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();
  const [visible, setvisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('cartData', JSON.stringify(items));
  }, [items]);

  let deliveryFee = 44;
  let total =  deliveryFee;
  items.forEach(item => {
    total = total + item.price;
  });

  const getToken = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/v1/product/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [user]);

  // Handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();      
      const { data } = await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/v1/product/braintree/payment`, {
        nonce,
        items,
      });
      
      setLoading(false);
      localStorage.removeItem("cartData");
      toast.success("Payment Completed Successfully ");
      navigate("/userprofile/user-oders");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  

  return (
    <>
      {
        items?.length < 1 ? (
          <div className='pt-8 w-full h-screen flex flex-col justify-center items-center'>
            <div className='h-[300px] w-[300px]'>
              <img className='h-full w-full object-cover' src={emtyCart} alt="find_img" />
            </div>
            <h3 className='mt-6 text-2xl text-[#68696f] font-bold'>Your cart is empty</h3>
            <Link to='/' className='mt-3 px-10 py-2 text-sm font-bold text-white bg-[#ff5a00] hover:bg-[#e36d2e]'>See Meals</Link>
          </div>
        ) : (<div className='w-full md:w-[68%] m-auto mt-8 md:mt-[110px]'>
          <h2 className='capitalize text-2xl text-[#282c3f] font-bold text-center'>Welcome to cart</h2>
          <div className='w-full flex flex-col md:flex-row md:justify-between mt-10'>
            <div className='w-full md:w-2/3 myShadow'>
              {
                items?.map((curE) => (
                  <div key={curE._id} className='flex justify-between items-center px-4 py-2'>
                    <div className='w-[100px] md:w-[90px] h-[90px]'>
                      <img className='w-full h-full' src={`${import.meta.env.REACT_APP_API_URL}/api/v1/product/get-photo/${curE._id}`} alt="product_image" />
                    </div>
                    <div>
                      <h2 className='capitalize md:text-[20px] text-[16px] font-bold text-[#282c3f]'>{curE.name}</h2>
                      <h3 className='flex items-center md:text-sm text-[12px] font-semibold capitalize text-[#282c3f]'><FaRegSmileWink /> <span className='ml-2'>Delicious</span></h3>
                    </div>
                    <div className='text-[#60b246] border md:block hidden'>
                      <button className='font-bold md:px-2 px-1 md:text-2xl text-lg'>+</button>
                      <span className='md:text-lg text-md font-bold px-1'>1</span>
                      <button className='font-bold md:px-2 px-1 md:text-2xl text-lg'>-</button>
                    </div>
                    <div className='mr-7'>
                      <h2 className='md:text-[18px] text-[16px] font-bold flex items-center text-[#282c3f] justify-center'><span><BsCurrencyRupee /></span>{curE.price}</h2>
                      <button onClick={() => dispatch(removeItem(curE._id))} className='flex items-center md:text-[12px] text-[11px] md:px-2 px-1 py-[2px] md:py-1 font-semibold capitalize border border-red-500 text-red-500 cursor-pointer hover:border-red-400 hover:text-red-400'><RiDeleteBin2Line /> <span className='ml-2'>Remove</span></button>
                    </div>
                  </div>
                ))
              }
            </div>
            <div className='w-[80vw] m-auto md:ml-4 md:w-1/3 text-center md:mt-0 mt-7'>
              <h2 className='text-[22px] font-semibold text-[#151c2c]'>Cart Summary</h2>
              <h4 className='text-sm mt-[-5px] text-[#7e808c]'>Total || Checkout || Payment</h4>
              <hr className='mt-4 border-2' />
              <h3 className='text-md mt-4 flex items-center justify-center'>Delivery Fee: {deliveryFee}</h3>
              <h3 className='text-lg mt-4 flex items-center justify-center'>Total: <span className='ml-2'><BsCurrencyRupee /></span> {total}</h3>
              {!user ? (
                <button onClick={() => setvisible(true)} className='my-4 bg-[#e67e22] hover:bg-[#e78631] px-12 py-2 mt-5 rounded-xl border font-semibold text-white'>Make Payment</button>
              ) : (
                <div className="mt-2">
                  {!clientToken || !user || !items?.length ? (
                    ""
                  ) : (
                    <>
                      <DropIn
                        options={{
                          authorization: clientToken,
                          paypal: {
                            flow: "vault",
                          },
                        }}
                        onInstance={(instance) => setInstance(instance)}
                      />
                      <button
                        className="bg-[#e67e22] hover:bg-[#e78631] px-12 py-2 my-5 rounded-xl border font-semibold text-white"
                        onClick={handlePayment}
                        disabled={loading || !instance || !user?.address}
                      >
                        {loading ? "Processing ...." : "Make Payment"}
                      </button>
                    </>
                  )}
                </div>
              )}
              <Modal onCancel={() => setvisible(false)} footer={false} visible={visible}>
                <Login />
              </Modal>
            </div>
          </div>
        </div>)
      }
    </>
  )
}

export default Cart;
