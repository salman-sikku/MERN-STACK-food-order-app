import React, { useState } from 'react';
import { RiRestaurantLine } from 'react-icons/ri';
import { IoClose } from "react-icons/io5";
function Popup({setVisibleModle}) {
    const [showPopup, setShowPopup] = useState(true);

    // Function to hide the popup
    const hidePopup = () => {
        setShowPopup(false);
        setVisibleModle(true)
    };

    return (
        <>
            {/* Conditional rendering of the popup */}
            {showPopup && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
                    <div className=" relative bg-white p-8 rounded-lg flex flex-col items-center">
                        <span onClick={()=> setShowPopup(false)} className='cursor-pointer absolute top-2 right-2'><IoClose/></span>
                        <RiRestaurantLine className="w-16 h-16 text-[#ffca41] mb-4" />
                        <p className="text-lg text-gray-800 mb-4 font-semibold">Welcome! Please log in to explore website</p>
                        <button className="px-6 py-2 bg-[#ffca41] text-gray-800 font-semibold rounded-lg hover:bg-[#f5bd2f] focus:outline-none focus:bg-blue-600" onClick={hidePopup}>Log In</button>
                    </div>
                </div>
            )}

            {/* Your regular content when the popup is hidden */}
            
        </>
    );
}

export default Popup;
