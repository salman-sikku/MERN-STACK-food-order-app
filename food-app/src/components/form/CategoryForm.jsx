import React from 'react'
import { GoFileSubmodule } from "react-icons/go";
function CategoryForm({value, setValue, submitHandler}) {
    return (
        <>
            <form>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <span className="w-4  text-gray-500 text-xl dark:text-gray-400">
                            <GoFileSubmodule/>
                        </span>
                    </div>
                    <input value={value} onChange={(e)=>setValue(e.target.value)} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg outline-none bg-gray-50 focus:ring-[#fbbc2f] focus:border-[#fbbc2f] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter new category..." required />
                    <button onClick={submitHandler} type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-[#e69f04] dark:hover:bg-blue-700 dark:focus:ring-[#fbbc2f]">Submit</button>
                </div>
            </form>
        </>
    )
}

export default CategoryForm
