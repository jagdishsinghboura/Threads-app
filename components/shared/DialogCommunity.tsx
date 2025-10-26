"use client"
import { createCommunity, fetchCommunities } from '@/lib/actions/community.actions';
import React, { useState } from 'react'
import { IoCloseSharp } from "react-icons/io5"

interface DialogCommunityProps {
  currentUserId: string;
}


function DialogCommunity({currentUserId}: DialogCommunityProps ) {
    const [communityinput, setCommunityInput] = useState({
        username: "",
        name: "",
        bio: "",
    });
    const [isDialogOpen, setIsDailogOpen] = useState(false);

    const handleCommnunitydata = async () => {
        const data = await createCommunity(
            `community_${Date.now()}`,
            communityinput.name,
            communityinput.username,
            communityinput.bio,
            currentUserId.toString(),
            "",
        )

        setCommunityInput({
            username: "",
        name: "",
        bio: "",
        });

        setIsDailogOpen((isDialogOpen)=>!isDialogOpen)

        alert("community created");


    }

    return (
        <>
            <button onClick={() => setIsDailogOpen(!isDialogOpen)} className=' text-white p-2 m-2  shadow-2xl cursor-pointer rounded-md bg-slate-700'> create community</button>
            <div className={`absolute bg-dark-3 text-white min-h-[70%] min-w-[50%] top-24 z-20 backdrop-blur-sm  flex  flex-col justify-center items-center  rounded-2xl ${isDialogOpen ? "" : "hidden"}`}>
                <p onClick={() => setIsDailogOpen(!isDialogOpen)} className='absolute right-7 -top-5 cursor-pointer'>
                    <IoCloseSharp className='text-[2rem]' />
                </p>
                <h1 className='w-full text-center p-2 m-2 capitalize text-[2rem] font-sans '> Community create</h1>
                <div className='w-96 flex gap-6 flex-col '>
                    <div className='flex gap-2 flex-row w-full '>
                        {/* <h1 className='text-[1.2rem] font-sans  items-baseline text-end'>UserName:-</h1> */}
                        <input value={communityinput.username} onChange={(e) => {
                            setCommunityInput(prev => ({ ...prev, username: e.target.value.trim() }))
                        }} type="text" placeholder='Enter Unique Name of community..' className=" outline-none w-full p-2 text-lg text-black placeholder:text-gray-400 rounded-lg shadow-md" />
                    </div>
                    <div className='flex gap-2 flex-row w-full '>
                        {/* <h1 className='text-[1.2rem] font-sans  items-baseline text-end pr-9'>Name:-</h1> */}
                        <input value={communityinput.name} onChange={(e) =>
                            setCommunityInput(prev => ({ ...prev, name: e.target.value }))
                        } type="text" placeholder='Enter name of community..' className=" outline-none w-full p-2 text-lg text-black placeholder:text-gray-400 rounded-lg shadow-md" />
                    </div>
                    <div className='flex gap-2 flex-row w-full '>
                        {/* <h1 className='text-[1.2rem] font-sans pr-14 items-baseline text-end'>Bio:-</h1> */}
                        {/* <input type="text" placeholder='Enter bio of community..' className=" outline-none w-full p-2 text-lg text-black placeholder:text-gray-400 rounded-lg shadow-md"/> */}
                        <textarea value={communityinput.bio} onChange={(e) =>
                            setCommunityInput(prev => ({ ...prev, bio: e.target.value }))
                        } name="" id="" rows={2} placeholder='Enter bio of community..' className=" outline-none w-full p-2 text-lg text-black placeholder:text-gray-400 rounded-lg shadow-md "></textarea>
                    </div>
                    <button onClick={handleCommnunitydata} className='text-[1.5rem] text-center bg-slate-800 rounded-2xl p-2 m-2'>create</button>
                </div>
            </div>
        </>
    )
}

export default DialogCommunity