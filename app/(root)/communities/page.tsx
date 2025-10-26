import Communities from '@/components/shared/Communities'
import DialogCommunity from '@/components/shared/DialogCommunity'
import { fetchCommunities } from '@/lib/actions/community.actions';
import { fetchCommunitiesOfUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import { Types } from 'mongoose'
import React from 'react'

interface CommunitiesProps {
  _id:Types.ObjectId,
  id: String
  username: String
  name: String
  image?: String,
  bio: String,
  createdBy: Types.ObjectId,
  threads?: [Types.ObjectId],
  members?: [ Types.ObjectId ]
}

const page = async () => {
  
  const user =  await currentUser() ;

  // const {communities}= await fetchCommunities({});
  const communities= await fetchCommunitiesOfUser(user!.id);


  return (
    <section>
      <div className='flex flex-row justify-between items-center  p-2 m-2'>
        <h1 className='head-text '>Communities</h1>
         {user && <DialogCommunity  currentUserId={user.id.toString()} />}
      </div>
      <Communities  communities={communities}/>
    </section>
  )
}

export default page