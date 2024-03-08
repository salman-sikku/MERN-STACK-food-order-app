import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaRegSmileWink } from "react-icons/fa";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { BsCurrencyRupee } from "react-icons/bs";
import { Modal } from "antd";
import { useDispatch } from 'react-redux';
import { addItem } from '../../feature/cartSlice.js';
import { addLikeMeal } from '../../feature/likeMealSlice.js';
import toast from 'react-hot-toast';

function Searchproduct() {
  const dispatch = useDispatch();
  const [likeProduct, setlikeProduct] = useState(false);
  const [visibleModalId, setVisibleModalId] = useState(null);
  const results = useSelector(state => state.searchData.results);
  const keyword = useSelector(state => state.searchData.keyword);

  //add to cart
  const handleAdd = (curElm) => {
    toast.success("Item Added in cart")
    dispatch(addItem(curElm));
  }

  // like product handle
  const hadleLikeProduct = (oje) => {
    toast.success('You liked this meal');
    setlikeProduct(true);
    dispatch(addLikeMeal(oje))
  }

  return (
    <>
      <div className='w-[96vw] md:w-[60%] m-auto my-8 md:my-[110px]'>
        {results?.length < 1 ? <div className='md:mt-11 mt-28 text-center md:text-2xl text-lg font-bold capitalize text-[#282c3f]'>No results found</div> : <h2 className='mt-24 text-center text-lg font-bold capitalize text-[#282c3f]'>search for "{keyword}"</h2>}
        {
          results?.map((curElm) => (
            <div key={curElm._id} className='w-full border-b-2 py-4 flex items-center'>
              <div onClick={() => setVisibleModalId(curElm._id)} className='w-[100px] h-[100px] cursor-pointer md:w-[130px] md:h-[130px] flex justify-normal flex-col'>
                <img className='w-full h-full' src={`${import.meta.env.REACT_APP_API_URL}/api/v1/product/get-photo/${curElm._id}`} alt="product_image" />
              </div>
              <div>
                <h3 className='ml-3 text-1xl font-bold capitalize text-[#282c3f]'>{curElm.name}</h3>
                <h3 className='flex items-center ml-3 text-sm font-semibold capitalize text-[#282c3f]'><FaRegSmileWink /> <span className='ml-2'>Delicious</span></h3>
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
                      <button onClick={() => handleAdd(curElm)} className='h-8 border shadow-md py-1 px-2 bg-white text-sm font-bold text-[#60b246] '>ADD</button>
                      {likeProduct ? <button className='absolute top-5 text-lg font-bold text-[#60b246] '><FaHeart /></button>
                        : <button onClick={() => hadleLikeProduct(curElm)} className='absolute top-5 text-lg font-bold text-[#60b246] '><FaRegHeart /></button>
                      }
                    </div>
                  </div>
                </Modal>
              )}
            </div>
          ))
        }
      </div>
    </>
  )
}

export default Searchproduct
