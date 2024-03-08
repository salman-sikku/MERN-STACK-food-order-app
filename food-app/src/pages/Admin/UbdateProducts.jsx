import React, { useEffect, useState } from 'react';
import Admenu from './Admenu';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { Select } from "antd";
const { Option } = Select;


export default function UbdateProducts() {
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    const [name, setname] = useState("");
    const [description, setdescription] = useState("");
    const [price, setprice] = useState("");
    const [rating, setrating] = useState("")
    const [categories, setcategories] = useState([]);
    const [category, setCategory] = useState("")
    const [photo, setphoto] = useState("");
    const [shipping, setshipping] = useState("");
    const [id, setId] = useState("");
    const params = useParams();

    //get single product
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.REACT_APP_API_URL}/api/v1/product/get-product/${params.slug}`
            )
            setname(data.product.name);
            setId(data.product._id);
            setdescription(data.product.description);
            setprice(data.product.price);
            setrating(data.product.rating)
            setshipping(data.product.shipping);
            setCategory(data.product.category._id);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getSingleProduct();
        //eslint-disable-next-line
    }, []);

    const getCategory = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/v1/category/getall-category`);
            if (data?.success) {
                setcategories(data.getCategory)
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong!')
        }
    }

    useEffect(() => {
        getCategory();
        //eslint-disable-next-line
    }, []);

    const hadleSubmit = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("rating", rating);
            productData.append("photo", photo);
            productData.append("category", category);
            productData.append("shipping", shipping);

            const { data } = await axios.put(`${import.meta.env.REACT_APP_API_URL}/api/v1/product/ubdate-product/${id}`, productData);
            if (data?.success) {
                toast.success("Product Ubdate Successfully");

                const notificationData = {
                    message: `Meal ${name} has been updated`
                }
                await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/v1/product/createNotification`, notificationData);
                navigate("/admindashbord/all-products");
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong!")
        }
    }

    return (
        <>
            <div className='flex h-screen'>
                <Admenu />
                <div className='mt-[90px] overflow-y-auto p-8 shadow-md sm:rounded-lg'>
                    <div className="m-1 w-[60vw] border">
                        <Select
                            bordered={false}
                            placeholder="Select a category"
                            size="large"
                            showSearch
                            className="form-select w-full cursor-pointer"
                            onChange={(value) => {
                                setCategory(value);
                            }}
                        >
                            {categories?.map((c) => (
                                <Option key={c._id} value={c._id}>
                                    {c.name}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className="mt-4 ml-1 w-[60vw]">
                        <label className="py-2 cursor-pointer block text-center w-full bg-gray-500 hover:bg-gray-400 text-white font-semibold">
                            {photo ? photo.name : "Upload Photo"}
                            <input
                                type="file"
                                name="photo"
                                accept="image/*"
                                onChange={(e) => setphoto(e.target.files[0])}
                                className="hidden"
                            />
                        </label>
                    </div>
                    <div className="mt-4 w-[60vw] flex justify-center">
                        {photo ? (
                            <div className="w-[200px] h-[200px]">
                                <img
                                    src={URL.createObjectURL(photo)}
                                    alt="product_photo"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className="w-[200px] h-[200px]">
                                <img src={`${import.meta.env.REACT_APP_API_URL}/api/v1/product/get-photo/${id}`} alt="product_image" className='w-full h-full object-cover' />
                            </div>
                        )}
                    </div>
                    <div className="mt-4 w-[60vw] border">
                        <input className='w-full p-3 outline-[#fbbc2f]' type="name" value={name} onChange={(e) => setname(e.target.value)} placeholder='write product name' />
                    </div>
                    <div className="mt-4 w-[60vw] border">
                        <textarea className='w-full p-3 outline-[#fbbc2f]' type="name" value={description} onChange={(e) => setdescription(e.target.value)} placeholder='write description' />
                    </div>
                    <div className="mt-4 w-[60vw] border">
                        <input className='w-full p-3 outline-[#fbbc2f]' type="number" value={price} onChange={(e) => setprice(e.target.value)} placeholder='write price of product' />
                    </div>
                    <div className="mt-4 w-[60vw] border">
                        <input className='w-full p-3 outline-[#fbbc2f]' type="number" value={rating} onChange={(e) => setrating(e.target.value)} placeholder='write rating' required />
                    </div>
                    <div className='mt-4 w-[60vw] border'>
                        <Select
                            bordered={false}
                            placeholder="Select Shipping "
                            size="large"
                            showSearch
                            className="form-select w-full cursor-pointer"
                            onChange={(value) => {
                                setshipping(value);
                            }}
                        >
                            <Option value="0">No</Option>
                            <Option value="1">Yes</Option>
                        </Select>
                    </div>
                    <button onClick={hadleSubmit} className='py-2 px-4 bg-[#08b42e] hover:bg-[#18e144] text-white rounded-lg mt-4'>Ubdate Product</button>
                </div>
            </div>
        </>
    )
}
