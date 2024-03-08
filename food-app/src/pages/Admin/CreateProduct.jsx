import React, { useEffect, useState } from 'react';
import Admenu from './Admenu';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Select } from "antd";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const { Option } = Select;

function CreateProduct() {
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

      const { data } = await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/v1/product/create-product`, productData);
      if (data?.success) {

        const notificationData = {
          message: `New meal ${name} has been added`
        }
        await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/v1/product/createNotification`, notificationData);


        toast.success("Product Created Successfully");
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
            {photo && (
              <div className="w-[200px] h-[200px]">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product_photo"
                  className="w-full h-full object-cover"
                />
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
          <button onClick={hadleSubmit} className='py-2 px-4 bg-[#08b42e] hover:bg-[#18e144] text-white rounded-lg mt-4'>Create Product</button>
        </div>
      </div>
    </>
  )
}

export default CreateProduct
