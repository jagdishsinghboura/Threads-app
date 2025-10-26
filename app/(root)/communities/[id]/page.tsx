import ThreadCard from '@/components/cards/ThreadCard'
import CommunityBottom from '@/components/shared/CommunityBottom'
import ScrollToBottom from '@/components/shared/ScrollToBottom'
import { fetchCommunityDetails, fetchCommunityPosts } from '@/lib/actions/community.actions'
import { fetchUser } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

async function page({ params }: { params: { id: string } }) {

  const communityDetails = await fetchCommunityPosts(params.id)
  let user = await currentUser()  
  let isJoin = false;
  if(user){
     const data = await fetchUser(user.id);
      isJoin = communityDetails.members.includes(data._id)
  }

  return (
    <div className='relative bg-dark-1'>
      <div className=' fixed top-[3.8rem] z-20 w-[56%] ml-1 flex bg-dark-4  flex-row gap-3 pl-6  justify-between  items-center rounded-lg shadow-lg '>
        <div className='flex flex-row  items-center justify-center'>
          <div className='rounded-full bg-dark-2 h-8 w-8 flex justify-center items-center  m-2'>
            <Image
              src="/assets/user.svg"
              alt='hear'
              className='cursor-pointer object-contain text-[2rem]'
              height={40}
              width={40} />
          </div>
          <div className='text-white p-2 m-2 flex flex-col gap-2'>
            <p className='text-[1.3rem]'>{communityDetails?.name}</p>
            <h1 className='text-[.8rem]'>@ {communityDetails?.username} </h1>
          </div>
        </div>
        {/* <button className='  bg-dark-1 rounded-lg  text-white  bottom-2  mr-8  p-2 pl-4 ' > Join</button> */}
      </div>
      <div className=' relative z-10 w-full min-h-[90vh] bg-dark-1 flex flex-col top-8  overflow-y-auto  '>
        <ScrollToBottom />
        <div className="flex flex-col justify-end flex-nowrap  relative bottom-30 min-h-screen overflow-y-auto mb-10">
          <div>
            -----------------------------------
            {communityDetails.threads.map((thread: any) => (
              <div key={thread._id} className={`  flex flex-wrap  m-1 w-full `}>
                <div className={`${ (user && user.id== thread.author.id)?"ml-auto":"mr-auto"} `}>
                <ThreadCard  
                id={thread._id}
                currentUserId={user?.id ||""} 
                content={thread.text}
                 author={thread.author} 
                 
                 createdAt={thread.createdAt}
                 comments={thread.children}
                  likes={thread.likes}
                  community={{
                    id: communityDetails.id,
                    name: communityDetails.name,
                    image: communityDetails.image,
                  }}
                  />
                </div>
                  </div>
            ))}


            -------------------------------------
          </div>
        </div>
        <div className=''>
          <CommunityBottom userId={user?.id.toString()!} communityId={communityDetails.id.toString()! } 
           isJoin={isJoin}
        />
        </div>

      </div>
    </div>
  )
}

export default page