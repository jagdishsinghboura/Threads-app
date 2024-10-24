import { redirect } from 'next/navigation'
import { fetchUser, fetchUsers } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import UserCard from '@/components/cards/UserCard';

const page =async () => {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding")

    // fetch user 
    const result = await fetchUsers({
        userId:user.id,
         searchString:'',
         pageNumber:1,
         pageSize:25,
    })
    // console.log("reakrefd", result.users);
    
  return (
    <section>
        <h1 className='head-text mb-10'>search</h1>

        <div className='mt-14 flex flex-col gap-9'>
            {result?.users.length==0?(
                <p className='no-result'> No Users</p>
            ):(
                <>
                {result?.users.map((person)=>
                        {
                            return<UserCard
                    key={person.id}
                    id={person.id}
                    name={person.name}
                    username={person.username}
                    imgUrl={person.image}
                    personType='User'
                    />
                }

                    
                )}
                </>
            )}

        </div>
    </section>
)
}

export default page