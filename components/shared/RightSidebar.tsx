import { fetchSuggestedCommunities } from '@/lib/actions/community.actions';
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

async function RightSidebar() {
  const user = await currentUser()

  const suggestedCommunities = await fetchSuggestedCommunities(user!.id);
  return (
    <section className=' rightsidebar gap-2'>
      <h3 className='text-heading4-medium text-light-1  '>suggested community</h3>
      {suggestedCommunities && suggestedCommunities.map((community: any) => (
        <div>
          <div className='text-white bg-dark-4 w-72 border-1 rounded-md shadow-2xl p-2  '>
            <div className='flex  flex-col gap-3 m-1'>
              <h1 className='text-[1.2rem] font-sans text-blue  '>@{community.username}</h1>
              <h1 className='text-[1rem]  font-sans text-blue align-baseline mt-1'>{community.name} </h1>
            </div>
            <p className='text-wrap font-medium line-clamp-3'>{community.bio}</p>
          </div>
        </div>
      ))}

    </section>
  )
}

export default RightSidebar;
