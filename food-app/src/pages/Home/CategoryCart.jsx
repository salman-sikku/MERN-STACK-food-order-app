import React from 'react';
import Burger from '../../assets/bugerCat.png';

const CategoryCart = ({data}) => {
  const {name} = data ;
  return (
    <div className='flex-none w-[160px] h-[180px] mx-4 transition ease-in-out cursor-pointer hover:bg-[#f7b930] bg-[#fff9eb] border border-[#f9b520] rounded-[20%] overflow-hidden'>
      <div className='w-full h-[70%]'>
        <img src={Burger} alt="" className='object-cover w-full h-full' />
      </div>
      <h2 className='text-[#292a48] text-center font-semibold text-[22px] capitalize'>{name}</h2>
    </div>
  );
};

export default CategoryCart;
