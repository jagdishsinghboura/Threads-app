'use client'
import Image from 'next/image'
import React, { useState, useTransition } from 'react'

interface PropLikes {
    threadId: string,
    currentUserId: string | undefined,
    initialLikes: string[],
    addLikeToThread: (threadId: string, userId: string) => Promise<void>
}

function LikeButton({ threadId, currentUserId = "", initialLikes, addLikeToThread }: PropLikes) {

    const [likes, setLikes] = useState(initialLikes);
    const [isPending, startTransition] = useTransition();

    const hasLiked = likes.includes(currentUserId);

    const handleLike = () => {
        if (!currentUserId || isPending) return;
        startTransition(() => {
            addLikeToThread(threadId, currentUserId).then(() => {
                setLikes(prevLikes => {
                    if (hasLiked) {
                        // Unlike
                        return prevLikes.filter(id => id !== currentUserId);
                    } else {
                        // Like
                        return [...prevLikes, currentUserId];
                    }
                });
            });
        });
    }



    return (
        <button
            onClick={handleLike}
            className='flex flex-row gap-1 items-center justify-center disabled:opacity-50'
            disabled={!currentUserId || isPending}
        >
            <Image
                src={hasLiked ? "/assets/heart-filled.svg" : "/assets/heart-gray.svg"}
                alt="like"
                height={24}
                width={24}
                className={` cursor-pointer object-contain `}
            />
            <p className='text-slate-400 font-serif'>{likes.length}</p>
        </button>
    )
}

export default LikeButton