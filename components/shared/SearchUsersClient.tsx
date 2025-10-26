"use client"
import React, { useEffect, useState } from 'react'
import UserCard from '../cards/UserCard'
import { IoSearchOutline } from "react-icons/io5";
import { fetchUsers } from '@/lib/actions/user.actions';

interface UserProps {

}
interface User {
    id: string |any,
    name: string,
    username: string,
    image: string,
}


interface UserList {
    users: User[];
}

interface Props {
    currentUserId: string
}

function SearchUsersClient({ currentUserId }: Props) {
    const [users, setUsers] = useState<User[]>([]);
    const [searchInput, setSearchInput] = useState("");
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }
    
    useEffect( () => {
        async function userFetch(){
            
            const result = await fetchUsers({
                userId: currentUserId,
                searchString: searchInput,
                pageNumber: 1,
                pageSize: 25,
            })
            setUsers(result?.users ?? [])
        }
        userFetch();
    }, [searchInput])


    return (
        <div>
            <div>
                <form onSubmit={handleSubmit} className='w-full flex flex-row relative'>
                    <input value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} type="text" placeholder='search user...'  className='flex-1 p-2 m-2 outline-none rounded-lg border-1 ' />
                    <button type='submit' className='text-xl  m-2 absolute right-0 p-2  rounded-lg'>
                        <IoSearchOutline  className='text-black h-[1.5rem] w-8 text-2xl '/>
                    </button>
                </form>
            </div>
            <div className='mt-14 flex flex-col gap-9'>
                {users?.length == 0 ? (
                    <p className='no-result'> No Users</p>
                ) : (
                    <>
                        {users.map((person:User) => {
                            return <UserCard
                                key={person.id.toString()}
                                id={person.id.toString()}
                                name={person.name.toString()}
                                username={person.username.toString()}
                                imgUrl={person.image.toString()}
                                personType='User'
                            />
                        }


                        )}
                    </>
                )}

            </div>
        </div>
    )
}

export default SearchUsersClient