import { fetchUserReplies } from '@/lib/actions/user.actions'
import Link from 'next/link';
import React from 'react'
import { Types } from "mongoose";

interface Props {
  currentUserId: string,
  accountId: string,
  accountType: string,
}

interface replieProps{
  _id:Types.ObjectId
  text:string,
  
  parentId:{
    _id:Types.ObjectId
    text:string,
    author:{
      _id:Types.ObjectId
      id:string,
      name:string,
      username:string,
    }
    createdAt:string
  }
  createdAt:string,
}

const RepliesTab = async ({ currentUserId,
  accountId,
  accountType }: Props) => {

  const data = await fetchUserReplies(currentUserId);
  return (
    <div className='flex flex-col gap-3 flex-wrap'>

      {data && data.map((replieThread:replieProps) => {


        return <Link href={"#"}>
          <div key={replieThread?.createdAt} className=' bg-[#5c414115] p-2 rounded-lg shadow-2xl border-1'>
            <div className=''>
              <div className='flex m-2'>
                <h1 className='font-semibold '> replied to </h1>
                <Link href={"#"} className='text-blue font-medium cursor-auto ml-2'>@{replieThread.parentId.author.username}</Link>
              </div>
              
              <p className='truncate font-sans text-slate-400 w-96'> {replieThread.text}</p>
              <p className='text-red-500'>on</p>
              <p className=' truncate font-sans text-slate-400 w-96 '>{replieThread.parentId.text}</p>
            </div>
          </div>
        </Link>
      })}


    </div>
  )
}

export default RepliesTab