import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { BsCurrencyRupee } from "react-icons/bs";
import Loading from '../../components/Loading';
import axios from "axios";
function ProductByCategory() {
    const params = useParams();
    const [products, setProducts] = useState([]);
    const [otherFilter, setOtherFilter] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params?.slug) getPrductsByCat();
    }, [params?.slug]);
    const getPrductsByCat = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.REACT_APP_API_URL}/api/v1/product/get-produts-by-category/${params.slug}`
            );
            setProducts(data?.products);
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(true)
        }
    };

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

    return (
        <>
            {
                loading ? (<Loading />) : (<div className='w-[90%] md:w-[80%] m-auto mt-[90px] md:mt-[100px]'>
                    <h2 className='mt-[120px] capitalize md:text-3xl text-2xl font-bold text-[#282c3f] leading-3'>{params?.slug.toLocaleLowerCase()}</h2>
                    <h4 className='text-[rgb(129,131,142)]'>Bring home fresh and filling {params?.slug.toLocaleLowerCase()} to munch on.</h4>
                    <div className='cateHorzantle'>
                        <button onClick={hadleRemove} className=' md:px-5 md:py-3 px-4 py-2 border rounded-full text-[#414448] text-[14px] mr-8 mt-4 border-[#1f2024] bg-[#f0f0f5]'>Clear All Filter</button>
                        {['Ratings 3.0+', 'Ratings 4.0+', 'Rs. 300-Rs. 600', 'Less than Rs. 300'].map((curElm, index) => (
                            <button key={index} onClick={() => handleOtherFilter(curElm)} className={` md:px-5 md:py-3 px-4 py-2 border rounded-full text-[#414448] text-[14px] mr-8 mt-4 ${curElm === otherFilter ? 'border-[#1f2024] bg-[#f0f0f5]' : ''}`}>{curElm}</button>
                        ))}
                    </div>
                    <div className='grid grid-cols-2 md:grid-cols-4 md:gap-4 gap-2 mt-6'>
                        {
                            filteredProducts.map((curElm, index) => (
                                <Link to={`/product-detail/${curElm.slug}`} key={index}>
                                    <div className='md:h-[320px] md:w-[240px] w-[160px] h-[244px]'>
                                        <div className='h-[30%] w-[100%] flex justify-center items-center'>
                                            <div className='w-[64%] h-[64%]'>
                                                <img src={`${import.meta.env.REACT_APP_API_URL}/api/v1/product/get-photo/${curElm._id}`} alt="product_image" />
                                            </div>
                                        </div>
                                        <div className='productStyle md:rounded-[40px] rounded-[20px] h-[70%] w-[100%] bg-[#ffff] text-[#292a48]'>
                                            <div className='md:px-6 px-4 md:mt-20 mt-12 w-full'>
                                                <h2 className='font-bold md:text-[17px] text-[16px] capitalize'>{curElm.name}</h2>
                                                <p className='text-[14px] text-[#66676a] md:block hidden'>{curElm.description.split(" ").slice(0, 13).join(" ")}...</p>
                                                <p className='text-[13px] text-[#66676a] md:hidden block'>{curElm.description.split(" ").slice(0, 6).join(" ")}</p>
                                                <footer className='flex justify-between items-center'>
                                                    <h2 className='md:text-[20px] text-[16px] flex items-center justify-center'><span><BsCurrencyRupee /></span>{curElm.price}</h2>
                                                    <span className='md:py-1 py-[3px] md:px-1 px-[3px] md:text-[16px] text-[14px] bg-[#e67e22] text-white md:rounded-full rounded-lg flex justify-center items-center'><FaStar /> <span className='ml-1 font-semibold'>{curElm.rating}</span></span>
                                                </footer>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>)
            }
        </>
    )
}

export default ProductByCategory
