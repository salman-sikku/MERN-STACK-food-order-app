import React, { useState } from 'react';
import Meal from './Meal';
import { FaRedo } from "react-icons/fa";

function Products({ products }) {
  const [productsCount, setProductsCount] = useState(4);
  const handleMoreMeals = () => {
    setProductsCount(prevCount => prevCount + 4);
  };

  return (
    <>
      <div className='grid grid-cols-2 md:grid-cols-4 md:gap-4 gap-2 md:mt-6 mt-4'>
        {
          products.slice(0, productsCount).map((curElm, index) => (
            <Meal key={index} data={curElm} />
          ))
        }
      </div>
      <div className='flex justify-center mt-10'>
         {productsCount < products.length && (
           <button onClick={handleMoreMeals} className='flex items-center font-semibold hover:text-[#282828] text-md md:text-lg px-4 py-1'>
             <span><FaRedo/></span> 
             <span className='ml-2'>More Meals</span>
           </button>
         )}
      </div>
    </>
  )
}

export default Products;
