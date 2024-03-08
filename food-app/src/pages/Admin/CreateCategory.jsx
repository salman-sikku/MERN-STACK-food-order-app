import React, { useEffect, useState } from 'react';
import Admenu from './Admenu';
import { toast } from 'react-hot-toast';
import CategoryForm from '../../components/form/CategoryForm';
import axios from 'axios';
import { Modal } from "antd";

function CreateCategory() {
    const [categoryName, setCategoryName] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    const getCategory = async () => {
        const { data } = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/v1/category/getall-category`);
        setCategoryName(data.getCategory)
    }
    useEffect(() => {
        getCategory()
    }, [])

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/v1/category/createcategory`, { name });
            if (data.success) {
                getCategory();
                toast.success(`${name} category is created`);
                setName("")
            }
        } catch (error) {
            toast.error("Something went wrong in create category");
            console.log(error)
        }
    }

    const deleteHandler = async (vid) => {
        try {
            const { data } = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/v1/category/delete-category/${vid}`);
            toast.success(data.msg);
            getCategory();
        } catch (error) {
            toast.error('Something went wrong in delete category');
            console.log(error)
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${import.meta.env.REACT_APP_API_URL}/api/v1/category/ubdate-category/${selected._id}`, { name: updatedName });
            if(data.success){
              toast.success(`${updatedName} is ubdate successfully`);
              getCategory();
              setVisible(false);
            }else{
              toast.error(data.msg); 
            } 
        } catch (error) {
            toast.error('something went wrong in ubdate category')
        }
    }

    return (
        <>
            <div className='flex h-screen'>
                <Admenu />
                <div className="mt-[90px] overflow-y-auto p-8 w-[60vw] shadow-md sm:rounded-lg">
                    <CategoryForm value={name} setValue={setName} submitHandler={submitHandler} />
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-6">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Category name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {categoryName.map((curElm) => (
                                <tr
                                    key={curElm._id}
                                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                >
                                    <td className="px-6 py-4 font-medium capitalize text-gray-900 whitespace-nowrap dark:text-white">
                                        {curElm.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => {
                                            setVisible(true)
                                            setSelected(curElm)
                                            setUpdatedName(curElm.name)
                                        }} className="py-2 px-3 bg-[#08b42e] font-medium text-white hover:underline mr-3 rounded-md">
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteHandler(curElm._id)}
                                            className="py-2 px-3 bg-[#d44545] font-medium text-white dark:text-blue-500 hover:underline mr-3 rounded-md"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Modal
                    onCancel={() => setVisible(false)}
                    footer={null}
                    visible={visible}
                >
                    <CategoryForm
                        value={updatedName}
                        setValue={setUpdatedName}
                        submitHandler={handleUpdate}
                    />
                </Modal>
            </div>
        </>
    )
}

export default CreateCategory
