import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import LikeButton from '../ui/LikeButton';
import { currentUser } from '@clerk/nextjs/server';
import { addLikeToThread } from '@/lib/actions/thread.actions';




interface Props {
    id: string,
    currentUserId?: string,
    parentId?: string | null
    content: string,
    author: {
        name: string,
        image: string,
        id: string,
        username: string,
    }
    community?: {
        id: string,
        name: string,
        image: string,
    } | null;
    createdAt: string,
    comments?: {
        author: {
            image: string,
        }
    }[]
    isComment?: boolean,
    likes: [],
}


export default async function ThreadCard({
    id,
    currentUserId,
    parentId,
    content,
    author,
    community,
    createdAt,
    comments,
    isComment,
    likes }: Props) {

    const user = await currentUser();

    const threadDateConvert = () => {
        const date = new Date(createdAt);
        const day = date.getDate().toString().padStart(2, '0'); // 24
        const month = date.toLocaleString('en-US', { month: 'short' }); // Oct
        const year = date.getFullYear().toString().slice(-2); // 45

        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate;

    }




    return (
        <article className={`flex ${community ? "w-[21rem] m-2" : "w-full"} flex-col rounded-xl  ${isComment ? 'px-0 xs:px-7' : "bg-dark-2 p-7"}`}>
            <div className='flex items-start justify-between'>
                <div className='flex w-full flex-1 flex-row  gap-4'>
                    <div className='flex flex-col items-center  '>
                        <Link href={`/profile/${author.id}`} className={`relative h-11 w-11 ${community ? "w-6 h-6" : "h-11 w-11"} `}>
                            <Image
                                src={author?.image}
                                alt='Profile Image'
                                fill
                                className="cursor-pointer rounded-full"
                            />
                        </Link>
                        <div className='thread-card_bar' />
                    </div>

                    <div className='flex w-full flex-col'>
                        <div>
                            <Link href={`/profile/${author?.id}`} className={`w-fit flex ${community ? "" : ""} `}>
                                <h4 className={`cursor-pointer text-base-semibold text-light-1 ${community ? "" : ""}`}>{author?.name}</h4>
                                <h4 className={`cursor-pointer text-base-semibold text-light-1 pl-1 ${community ? "hidden" : ""}`}> @{author?.username}</h4>
                                <h4 className={`cursor-pointer text-base-semibold text-light-1 pl-2 ml-2 ${community ? "" : ""}`}>  {threadDateConvert()}</h4>
                            </Link>

                        </div>

                        <p className={`mt-2 text-light-1 text-base-regular ${community ? "text-[.8rem]" : ""}`}>{content}</p>
                        <div className={`${community ?"mt-2":"mt-5 "} flex flex-col gap-3 `}>
                            <div className={`flex items-center ${community ?" justify-around":" justify-between"}`}>
                                <LikeButton threadId={id.toString()} currentUserId={user?.id.toString()} initialLikes={likes} addLikeToThread={addLikeToThread} />
                                <Link href={`/thread/${id}`} className='flex flex-row gap-1 items-center'>
                                    <Image
                                        src="/assets/reply.svg"
                                        alt='reply'
                                        className='cursor-pointer object-contain'
                                        height={24}
                                        width={24} />
                                    <p className='text-slate-400 font-serif '>{(comments && comments?.length > 0 ? comments.length : "")}</p>
                                </Link>
                                <Link href={``} className={`flex flex-row gap-1 items-center ${community ? "hidden" : ""}`}>
                                    <Image
                                        src="/assets/repost.svg"
                                        alt='hear'
                                        className='cursor-pointer object-contain'
                                        height={24}
                                        width={24} /></Link>
                                <Link href={``} className={`flex flex-row gap-1 items-center ${community ? "hidden" : ""}`}>
                                    <Image
                                        src="/assets/share.svg"
                                        alt='hear'
                                        className='cursor-pointer object-contain'
                                        height={24}
                                        width={24} /></Link>

                            </div>
                            {/* {isComment && comments.length > 0 && (
                                <Link href={`/thread/${id}`}>
                                    <p className='mt-1 text-subtle-medium text-gray-1'>{comments.length}</p>
                                </Link>
                            )} */}

                        </div>



                    </div>

                </div>

            </div>

        </article>
    )
}
