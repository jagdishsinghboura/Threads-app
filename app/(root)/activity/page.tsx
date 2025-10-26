import { redirect } from 'next/navigation'
import { fetchUser, fetchUsers, getActivity } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import Image from 'next/image';

const page = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding")

  //getActivity
  const activity = await getActivity(userInfo._id);

 
  
    const DateConvert = (createdAt:string) => {
        const date = new Date(createdAt);
        const day = date.getDate().toString().padStart(2, '0'); // 24
        const month = date.toLocaleString('en-US', { month: 'short' }); // Oct
        const year = date.getFullYear().toString().slice(-2); // 45

        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate;

    }
  



  return (
    <section>
      <h1 className='head-text mb-10'>activity</h1>
      <section className='mt-10 flex  flex-col-reverse  gap-5'>
        {activity && activity?.length > 0 ? (
          activity?.map((act) => (
            <Link key={act._id} href={`/thread/${act.parentId}`}>
              <article className='activity-card'>
                <Image
                  src={act.author.image}
                  alt={"profile picture"}
                  width={20}
                  height={20}
                  className="rounded-ful object-cover"
                />
                <p className='!text-small-regular text-light-1'>
                  <span className="mr-1 text-primary-500">
                    {act.author.name}
                  </span>{''}
                  replied to your thread
                </p>

                  <p className=' flex-1 text-end text-white font-sans  p-1'>{DateConvert(act.createdAt)}</p>

              </article>
            </Link>
          ))
        ) : (
          <p className='text-base-regular text-light-3'>No activity yet </p>

        )}

      </section>
    </section>
  )
}

export default page