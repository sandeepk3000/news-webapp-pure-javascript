import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    publishedAt: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    // videoUrl: {
    //     type: String,
    //     required: true,
    // },
    // imageUrl: {
    //     type: String,
    //     required: true,
    // },
    publishedAt: {
        type: String,
        required: true,
    },
});
export const Post = mongoose.model("Post", postSchema);
