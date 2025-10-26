import { redirect } from 'next/navigation'
import { fetchUser, fetchUsers } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import SearchUsersClient from '@/components/shared/SearchUsersClient';

const page = async () => {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding")


    return (
        <section>
            <h1 className='head-text mb-10'>search</h1>

            <SearchUsersClient currentUserId={user.id.toString()}/>
            
        </section>
    )
}

export default page