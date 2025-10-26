"use client"
import { addMemberToCommunity } from '@/lib/actions/community.actions'
import { createThread } from '@/lib/actions/thread.actions'
import { fetchUser } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs/server'
import { Types } from 'mongoose'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface Props {
    userId: string,
    communityId: string,
    isJoin:Boolean
}

function CommunityBottom({ userId, communityId,  isJoin }: Props) {
    const [input, setInput] = useState("")
    // const [isJoin, setJoin] = useState(isJoin)

    const pathname = usePathname();

    const handlePost = async () => {

        await createThread({
            text: input.trim(),
            author: userId.toString(),
            communityId,
            path: pathname,
        })

        setInput("");

    }
    
  




    const handleJoin = async () => {
        await addMemberToCommunity(communityId, userId)
        alert("You join the group")
    }


    return (
        <>
            <button onClick={handleJoin} className={`w-96 self-center bg-dark-4 text-white absolute bottom-2  m-1  p-2 ${isJoin?"hidden":""}` }> Join </button>
            <div className={` flex w-full text-white justify-around gap-5 p-1  absolute bottom-2 bg-dark-3 ${!isJoin?"hidden":""}`}>
                <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder='Add a post to the community ...' className='flex-1 p-1  rounded-xl border-1 bg-dark-4 outline-none' />
                <button onClick={handlePost} className=' bg-dark-2 rounded-lg px-4 p-2 m-2'> Post</button>
            </div>
        </>
    )
}

export default CommunityBottom