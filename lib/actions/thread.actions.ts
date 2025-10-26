"use server"

import { revalidatePath } from "next/cache";
import Thread from "../model/thread.model";
import User from "../model/user.model";
import { connectDB } from "../mongoose";
import { populate } from "dotenv";
import mongoose from "mongoose";
import Community from "../model/community.model";

interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string,
}
export async function createThread({ text, author, communityId, path }: Params) {

    try {
        await connectDB();
        let communityThread;

        if (communityId) {
            communityThread = await Community.findOne({ id: communityId });
            const user = await User.findOne({ id: author });
            author = user._id;
        }

        const createdThread = await Thread.create({
            text,
            author,
            community: communityThread ? communityThread._id : null,
        });

        if (communityId) {
            await Community.findByIdAndUpdate(
                communityThread._id,
                { $push: { threads: createdThread._id } },
                { new: true }
            );

        }
        await User.findByIdAndUpdate(author, {
            $push: { threads: createdThread._id }
        });


        //update user model
        const plaincreatedThread = JSON.parse(JSON.stringify(createdThread));


        revalidatePath(path);
        return plaincreatedThread;
    } catch (error) {
        console.log(`Error createing thread :::${error}`);

    }

}


export async function fetchPosts(pageNumber = 1, pageSize = 20) {
    await connectDB();

    //calcluate the number of to skip 

    const skipAmount = (pageNumber - 1) * pageSize;

    const postQuery = await Thread.find({ parentId: { $in: [null, undefined] } })
        .sort({ createdAt: "desc" })
        .skip(skipAmount)
        .limit(pageSize)
        .populate({ path: "author", model: User })
        .populate({
            path: "author",
            model: User,
            select: "id name parentId image username",
        })

    const totalPostsCount = await Thread.countDocuments({ parent: { $in: [null, undefined] } })

    let posts = postQuery;

    const isNext = totalPostsCount > skipAmount + posts.length

    posts = posts.filter((post)=>!post.community)

    return { posts, isNext };
}

export async function fetchThreadById(id: string) {
    connectDB();



    try {
        const thread = await Thread.findById(id)
            .populate({
                path: "author",
                model: User,
                select: "_id id name image"
            })
            .populate({
                path: "children",
                populate: [
                    {
                        path: "author",
                        model: User,
                        select: "_id  id name parentId image"
                    },
                    {
                        path: "children",
                        model: Thread,
                        populate: {
                            path: "author",
                            model: User,
                            select: "_id id name parentId image"
                        }
                    }
                ]
            });

        return thread;
    } catch (error: any) {
        throw new Error(`Error fetching thread :${error.message}`);
    }
}

export async function addCommentToThread(
    threadId: string,
    commentText: string,
    userId: string,
    path: string,
) {
    connectDB()

    try {
        //adding a comment
        const originalThread = await Thread.findById(threadId);

        if (!originalThread) {
            throw new Error("Thread not Found")
        }

        const commentThread = new Thread({
            text: commentText,
            author: userId,
            parentId: threadId,
        })

        const savedCommnetThread = await commentThread.save();
        originalThread.children.push(savedCommnetThread._id);
        await originalThread.save();
        revalidatePath(path);
    } catch (error: any) {
        throw new Error(`Error adding comment to Thread:${error.message}`)

    }
}

export async function addLikeToThread(
    threadId: string,
    userId: string,) {

    await connectDB();

    if (!threadId && !userId) {
        throw new Error("fields are missing ")
    }
    try {
        const user = await User.findOne({ id: userId });

        if (!user) throw new Error('User not found');

        const thread = await Thread.findById(threadId);
        if (!thread) throw new Error('Thread not found');


        // Prevent duplicate likes
        const alreadyLiked = thread.likes.includes(userId);

        if (alreadyLiked) {
            // Unlike (remove)
            thread.likes = thread.likes.filter((id: string) => id !== userId);
        } else {
            // Like (add)
            thread.likes.push(userId);
        }

        await thread.save();


    } catch (error: any) {
        console.log(error);
        throw new Error(`Error adding comment to Thread:${error.message}`)
    }


}