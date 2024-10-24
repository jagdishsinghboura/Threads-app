import React from 'react'

import { redirect } from 'next/navigation'
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import PostThread from '@/components/forms/PostThread';

export default async function page() {

    const user = await currentUser();
    if (!user) {
        return null;
    }

    const userInfo = await fetchUser(user?.id);

    if (!userInfo?.onboarded) redirect("/onboarding")
    return (
        <>
            <h1 className='head-text'>
                create thread
            </h1>
            <PostThread userId={userInfo?._id.toString() } />
        </>
    )
}

