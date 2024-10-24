"use server"
import { revalidatePath } from "next/cache";
import User from "../model/user.model";
import { connectDB } from "../mongoose";
import Thread from "../model/thread.model";
import { populate } from "dotenv";
import { FilterQuery, SortOrder } from "mongoose";

interface Params {
    userId: string,
    username: string,
    name: string,
    bio: string,
    image: string,
    path: string,
}

export async function updateUser({
    userId,
    username,
    name,
    bio,
    image,
    path,
}: Params): Promise<void> {
    await connectDB(); // Ensure the DB connection is awaited

    try {
        const user = await User.findOneAndUpdate(
            { id: userId }, // Use userId directly
            {
                $set: {
                    username: username.toLowerCase(),
                    name,
                    bio,
                    image,
                    onboarded: true
                }
            },
            { upsert: true, new: true }
        );
        console.log("user", user);


        if (path === "/profile/edit") {
            revalidatePath(path);
        }
    } catch (error: any) {
        console.error(`Failed to create/update user: ${error.message}`);
        throw new Error(`Failed to create/update user: ${error.message}`);
    }
}


export async function fetchUser(userId: string) {
    try {
        connectDB();
        return await User.findOne({ id: userId })
        // .populate({
        //     path:"communities",
        //     model:"Community",
        // })


    } catch (error: any) {
        throw new Error(`"failed to fetch user ${error.message}`)
    }

}


export async function fetchUserPosts(userId: string) {
    try {
        connectDB();

        const threads = await User.findOne({ id: userId })
            .populate({
                path: "threads",
                model: Thread,
                populate: {
                    path: "children",
                    model: Thread,
                    populate: {
                        path: 'author',
                        model: User,
                        select: 'name image id'
                    }
                }
            });
        return threads;
    } catch (error) {
        console.log(error);

    }
}

export async function fetchUsers({
    userId,
    searchString = "",
    pageNumber = 1,
    pageSize = 20,
    sortBy = "desc",
}: {
    userId: string;
    searchString?: string;
    pageNumber?: number;
    pageSize?: number;
    sortBy?: SortOrder;
}) {
    try {
        connectDB()

        const skipAmount = (pageNumber - 1) * pageSize;

        const regex = new RegExp(searchString, "i");
        const query: FilterQuery<typeof User> = {
            id: { $ne: userId }
        }

        if (searchString.trim() !== '') {
            query.$or = [
                { username: { $regex: regex } },
                { name: { $regex: regex } }
            ]
        }

        const sortOptions = { createdAt: sortBy };
        const userQuery = await User.find(query)
            .sort(sortOptions)
            .skip(skipAmount)
            .limit(pageSize);

        const totalUserCount = await User.countDocuments(query);

        const users = userQuery;
        const isNext = totalUserCount > skipAmount + users.length;
        return { users, isNext };

    } catch (error: any) {
        console.log(`Failed to fetch users: ${error.message}`)

    }
}

export async function getActivity(userId: string) {
    try {
        connectDB();

        //find  all thread
        const userThreads = await Thread.find({ author: userId });

        // Collect all the thread children IDs
        const childThreadIds = userThreads.reduce((acc, userThread) => {
            return acc.concat(userThread.children);
        }, []);

        // Fetch replies that match the child thread IDs and have different authors
        const replies = await Thread.find({
            _id: { $in: childThreadIds },
            author: { $ne: userId },
        }).populate({
            path: "author",
            model: User,
            select: 'name image _id',
        });

        console.log("userSawrn", childThreadIds);

        return replies;

    } catch (error: any) {
        console.log(`Failed to fetch activity :${error.message}`);

    }
}