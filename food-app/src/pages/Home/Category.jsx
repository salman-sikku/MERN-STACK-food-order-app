import React from 'react';
import { IoFastFoodSharp } from "react-icons/io5";
import {Link} from 'react-router-dom';

const Category = ({ category}) => {

  return (
    <>
      <h2 className='text-lg md:text-2xl font-bold text-[#191d22]'>What's on your mind?</h2>
      <div className='cateHorzantle mt-4 md:mt-8 '>
        {
          category?.map((curElm, index) => (
            <Link to={`/product/by/category/${curElm.slug}`} key={index} className='flex-none w-[100px] h-[120px] md:w-[140px] md:h-[160px] md:mr-8 mr-4 transition ease-in-out cursor-pointer hover:bg-[#f7b930] bg-[#fff9eb] border border-[#f9b520] rounded-[20%] overflow-hidden'>
              <div className='w-full h-[70%] md:text-6xl text-5xl text-[#292a48] flex justify-center items-center'>
               <IoFastFoodSharp/>
              </div>
              <h2 className='text-[#292a48] text-center font-semibold md:text-[22px] text-[18px] capitalize'>{curElm.name}</h2>
            </Link>
          ))
        }
      </div>
      <hr className='md:mt-[40px] mt-[20px]' />
    </>
  );
};

export default Category;
