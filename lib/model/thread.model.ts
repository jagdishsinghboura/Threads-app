import mongoose, { mongo } from "mongoose";
import { Schema } from "zod";


const threadSchema = new mongoose.Schema({
  text: { type: String, required: true },
 
  likes: [{
    type: String, // 👈 store Clerk user IDs as strings
    ref: "User"   // 👈 still allows .populate()
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  parentId: {
    type: String,
  },
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thread",
  }]
})

const Thread = mongoose.models?.Thread || mongoose.model("Thread", threadSchema)

export default Thread;

