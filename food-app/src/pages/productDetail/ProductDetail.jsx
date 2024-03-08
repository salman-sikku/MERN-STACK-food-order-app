import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from "react-icons/fa";
import { BsCurrencyRupee } from "react-icons/bs";
import { Modal } from "antd";
import { FaRegSmileWink } from "react-icons/fa";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { addItem } from './../../feature/cartSlice';
import { addLikeMeal } from './../../feature/likeMealSlice'



function ProductDetail() {
    const dispatch = useDispatch();
    const params = useParams();
    const [visibleModalId, setVisibleModalId] = useState(null);
    const [likeProduct, setlikeProduct] = useState(false);
    const [reletedProduct, setReletedProduct] = useState([]);
    const [productData, setproductData] = useState({});
    const { name, description, rating, price, _id } = productData;

    useEffect(() => {
        if (params?.slug) getSingleProduct();
        //eslint-disable-next-line
    }, [params?.slug]);
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.REACT_APP_API_URL}/api/v1/product/get-product/${params.slug}`
            );
            setproductData(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error);
            toast.error("Semothing went wrong!")
        }
    };

    // similar product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.REACT_APP_API_URL}/api/v1/product/related-product/${pid}/${cid}`
            );
            setReletedProduct(data.products)
        } catch (error) {
            console.log(error);
        }
    };

    // like product handle
    const hadleLikeProduct = (oje) => {
        toast.success('you liked this meal');
        setlikeProduct(true);
        dispatch(addLikeMeal(oje))
    }

    // add to cart
    const hadleAddToCart = () => {
        toast.success('Meal Added in cart')
        dispatch(addItem(productData));
    }
    const hadleAddToCartInModal = (oje) => {
        toast.success('Meal Added in cart')
        dispatch(addItem(oje));
    }
    return (
        <>
            <div className='w-full md:w-[66%] m-auto mt-10 md:mt-[90px]'>
                <div className='flex flex-col md:flex-row h-auto md:h-[400px] w-full'>
                    <div className='md:w-1/2 mb-5 md:mb-0'>
                        <img className='w-full h-auto md:h-full object-cover' src={`${import.meta.env.REACT_APP_API_URL}/api/v1/product/get-photo/${_id}`} alt="product_image" />
                    </div>
                    <div className='w-full md:w-1/2 p-5 md:p-10'>
                        <h3 className='text-[28px] font-bold text-[#282c3f] capitalize'>{name}</h3>
                        <p className='text-[#7e808c] text-[15px] leading-5 mt-5'>{description}</p>
                        <h3 className='flex items-center text-[20px] mt-6 text-[#282c3f]'><span><FaStar /></span> <span className='ml-2'>{rating} (rating)</span></h3>
                        <h3 className='flex items-center text-[20px] mt-6 text-[#282c3f]'><span><BsCurrencyRupee /></span> <span className='ml-2'>{price}</span></h3>
                        <h3 className='flex items-center text-[20px] mt-6 text-[#282c3f]'><FaRegSmileWink /> <span className='ml-2'>Delicious</span></h3>
                        <button onClick={hadleAddToCart} className='w-full py-2 mt-10 text-sm bg-[#fbbc2f] rounded-md font-bold text-[#fff]'>Add to cart</button>
                    </div>
                </div>

                <div className='mt-4 md:mt-14 md:p-8 p-5'>
                    {reletedProduct?.length < 1 ? <h2 className='text-[#282c3f] text-center text-[20px] font-bold'>No Similar Products found</h2> : <h2 className='text-[#282c3f] text-[21px] font-bold'>Similar food for you</h2>}
                    <div className='w-full mt-3'>
                        {reletedProduct?.map((curElm, index) => (
                            <div key={index} className='py-4 flex border-b border-red-200 items-center justify-between'>
                                <div className='mb-4 md:mb-0 md:mr-4'>
                                    <span className='w-[50px] py-1 text-[16px] bg-[#e67e22] text-white rounded-full flex justify-center items-center'><FaStar /> <span className='ml-1 font-semibold'>{curElm.rating}</span></span>
                                    <h3 className='text-lg capitalize mt-2 text-[#282c3f] font-semibold'>{curElm.name}</h3>
                                    <h2 className='text-lg capitalize mt-2 text-[#282c3f] font-semibold flex items-center'><span><BsCurrencyRupee /></span>{curElm.price}</h2>
                                </div>
                                <div onClick={() => setVisibleModalId(curElm._id)} className='w-[100px] md:w-[150px] h-[150px] flex justify-normal flex-col'>
                                    <img className='w-full h-full' src={`${import.meta.env.REACT_APP_API_URL}/api/v1/product/get-photo/${curElm._id}`} alt="product_image" />
                                    <button className='border shadow-md py-1 px-1 bg-white text-sm font-bold text-[#60b246] mt-2 md:mt-[-50px]'>Explore Meal</button>
                                </div>
                                {visibleModalId === curElm._id && (<Modal onCancel={() => setVisibleModalId(null)} footer={null} visible={visibleModalId === curElm._id}>
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
                                            <button onClick={() => hadleAddToCartInModal(curElm)} className='h-8 border shadow-md py-1 px-2 bg-white text-sm font-bold text-[#60b246] '>ADD</button>
                                            {likeProduct ? <button className='absolute top-5 text-lg font-bold text-[#60b246] '><FaHeart /></button>
                                                : <button onClick={() => hadleLikeProduct(curElm)} className='absolute top-5 text-lg font-bold text-[#60b246] '><FaRegHeart /></button>
                                            }
                                        </div>
                                    </div>
                                </Modal>)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}

export default ProductDetail
