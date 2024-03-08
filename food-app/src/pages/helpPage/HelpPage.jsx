import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

function HelpPage() {
    // Define state to manage visibility of each info item
    const [infoVisibility, setInfoVisibility] = useState({});

    const infArray = [
        { id: 1, heading: 'What is BellFresh', pra: 'BellFresh ipsum dolor sit amet consectetur adipisicing elit. Illo fugit aliquid ab ullam minima quis temporibus numquam vero officia, totam mollitia. Maxime voluptas tenetur ipsam rem expedita? Minima, quae aspernatur?' },
        { id: 2, heading: 'How to sign up', pra: 'Sign up ipsum dolor, sit amet consectetur adipisicing elit. Sint autem maiores ad consectetur natus explicabo fugiat facere molestias minus adipisci officiis debitis exercitationem tempore cum, temporibus rem omnis culpa aliquid rerum laudantium voluptates. Officia in nobis impedit fuga?' },
        { id: 3, heading: 'How to manage your profile', pra: 'Profile ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati doloremque excepturi laborum sed! Dolorem repellendus ex molestias inventore itaque mollitia quos cupiditate eum dignissimos pariatur. Nam accusantium nemo neque, odit dolores debitis labore deleniti optio, quisquam vitae voluptas.' },
        { id: 4, heading: 'How to reset password', pra: 'Password ipsum dolor sit amet consectetur adipisicing elit. Maxime nesciunt aliquid delectus blanditiis consequatur. Repellat debitis laboriosam suscipit praesentium neque nisi et, placeat commodi!' }
    ];

    const toggleInfoVisibility = (id) => {
        setInfoVisibility((prevVisibility) => {
            const updatedVisibility = !prevVisibility[id] || false;
            return { ...prevVisibility, [id]: updatedVisibility };
        });
    };
    

    return (
        <div className='md:w-[60%] w-[90%] m-auto'>
            <h2 className='md:mt-[140px] mt-[110px] md:text-2xl text-[22px] font-bold text-[#282c3f] leading-3'>Help & Support</h2>
            <h3 className='text-sm font-semibold text-[#323441]'>Let's take a step ahead and help you better.</h3>
            {infArray.map((c) => (
                <div className='w-full mt-8 border-b py-4' key={c.id}>
                    <div onClick={() => toggleInfoVisibility(c.id)} className='flex justify-between cursor-pointer text-[#1f2024] hover:text-orange-600'>
                        <h2 className={`capitalize text-[20px] ${infoVisibility[c.id] ? 'text-orange-600' : ''}`}>{c.heading}</h2>
                        <span>{infoVisibility[c.id] ? <IoIosArrowUp/> : <IoIosArrowDown/>}</span>
                    </div>
                    {infoVisibility[c.id] && <p className='mt-4 text-sm text-[#383b3e]'>{c.pra}</p>}
                </div>
            ))}
        </div>
    );
}

export default HelpPage;
