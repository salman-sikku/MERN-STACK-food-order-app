import React from 'react';
import { FaStar } from "react-icons/fa";
import { BsCurrencyRupee } from "react-icons/bs";
import { Link } from 'react-router-dom';

function Meal({ data }) {
  const { name, rating, price, description, _id, slug } = data;
  const words = description.split(' ');
  const truncatedDescription = words.slice(0, 13).join(' ');

  return (
    <>
      <Link to={`/product-detail/${slug}`}>
        <div className='md:h-[320px] md:w-[240px] w-[160px] h-[244px]'>
          <div className='h-[30%] w-[100%] flex justify-center items-center'>
            <div className='w-[64%] h-[64%]'>
              <img src={`${import.meta.env.REACT_APP_API_URL}/api/v1/product/get-photo/${_id}`} alt="product_image" />
            </div>
          </div>
          <div className='productStyle md:rounded-[40px] rounded-[20px] h-[70%] w-[100%] bg-[#ffff] text-[#292a48]'>
            <div className='md:px-6 px-4 md:mt-20 mt-12 w-full'>
              <h2 className='font-bold md:text-[17px] text-[16px] capitalize'>{name}</h2>
              <p className='text-[14px] text-[#66676a] md:block hidden'>{truncatedDescription}...</p>
              <p className='text-[13px] text-[#66676a] md:hidden block'>{description.split(" ").slice(0,6).join(" ")}...</p>
              <footer className='flex justify-between items-center'>
                <h2 className='md:text-[20px] text-[16px] flex items-center justify-center'><span><BsCurrencyRupee /></span>{price}</h2>
                <span className='md:py-1 py-[3px] md:px-1 px-[3px] md:text-[16px] text-[14px] bg-[#e67e22] text-white md:rounded-full rounded-lg flex justify-center items-center'><FaStar /> <span className='ml-1 font-semibold'>{rating}</span></span>
              </footer>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

export default Meal
