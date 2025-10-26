import { Types } from 'mongoose'
import Link from 'next/link';
import React from 'react'
interface Communites {
  _id: Types.ObjectId,
  id: string,
  username: string,
  name: string,
  image?: string,
  bio: string,
  createdBy: Types.ObjectId,
  Threads?: [
    Types.ObjectId
  ],
  member?: [
    Types.ObjectId
  ]

}

interface Props {
  communities: Communites[],
}

function Communities({ communities }: Props) {

  return (
    <div className='text-white flex flex-col w-full' >
      {communities && communities.map((community: Communites) => (
        <Link key={community.id} href={`communities/${community.id}`}>
          <div className='bg-dark-4   p-2 m-2 gap-5 flex flex-col border-b-1 rounded-lg shadow-xl cursor-pointer hover:scale-105 transform transition-all'>
            <div className='flex flex-row gap-2 '>
              {/* <p className='align-middle text-[1rem] m-2 p-2 md:m-0 md:p-0 '>Commuity  </p> */}
              <h1 className='text-[1rem]  text-blue font-bold underline  text-nowrap '>  {community.name}</h1>
              <p className='inset-6'> /@{community.username}</p>
            </div>
            <p className='text-2xl'>{community.bio} </p>
          </div>
        </Link>
      ))}

    </div>
  )
}

export default Communities