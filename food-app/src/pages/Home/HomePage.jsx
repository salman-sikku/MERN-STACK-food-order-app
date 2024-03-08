import React, { useState, useEffect } from 'react';
import Category from './Category';
import Products from './Products';
import axios from 'axios';
import toast from 'react-hot-toast';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [otherFilter, setOtherFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/v1/product/getall-products`);
        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong while fetching products!");
      }
    };

    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/v1/category/getall-category`);
        setCategories(data.getCategory);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong while fetching categories!");
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const handleOtherFilter = (otherData) => {
    setOtherFilter(otherData);
  };

  const filteredProducts = products.filter((product) => {
    let match = true;
    if (otherFilter === 'Ratings 3.0+') {
      match = parseFloat(product.rating) >= 3.0;
    } else if (otherFilter === 'Ratings 4.0+') {
      match = parseFloat(product.rating) >= 4.0;
    } else if (otherFilter === 'Rs. 300-Rs. 600') {
      match = parseFloat(product.price) >= 300 && parseFloat(product.price) <= 600;
    } else if (otherFilter === 'Less than Rs. 300') {
      match = parseFloat(product.price) < 300;
    }
    return match;
  });

  const hadleRemove = () => {
    setOtherFilter('');
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {isLoading ? (<Loading/>) : (<>
        <div className='w-[90%] md:w-[80%] m-auto mt-[90px] md:mt-[100px]'>
          <Category category={categories} />
          <div>
            <h2 className='md:text-2xl text-lg font-bold text-[#191d22] md:mt-6 mt-3'>Popular Dish</h2>
            <div className='cateHorzantle'>
              <button onClick={hadleRemove} className=' md:px-5 md:py-3 px-4 py-2 border rounded-full text-[#414448] text-[14px] md:mr-8 mr-5 mt-4 border-[#1f2024] bg-[#f0f0f5]'>Clear All Filter</button>
              {['Ratings 3.0+', 'Ratings 4.0+', 'Rs. 300-Rs. 600', 'Less than Rs. 300'].map((curElm, index) => (
                <button key={index} onClick={() => handleOtherFilter(curElm)} className={` md:px-5 md:py-3 px-4 py-2 border rounded-full text-[#414448] text-[14px] md:mr-8 mr-5 mt-4 ${curElm === otherFilter ? 'border-[#1f2024] bg-[#f0f0f5]' : ''}`}>{curElm}</button>
              ))}
            </div>
            <Products products={filteredProducts} />
          </div>
        </div>
        <div className='bg-[#02060c] md:mt-28 mt-14'>
          <Footer />
        </div>
      </>)}
    </>
  );
}

export default HomePage;
