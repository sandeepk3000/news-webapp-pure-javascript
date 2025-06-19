import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        thumbnail: {
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
        tags: {
            type: Array,
            default: [],
        },

        language: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["PENDING", "PUBLISHED", "REJECTED", "SCHEDULED", "DRAFT"],
            default: "PENDING",
        },
        views: {
            type: Number,
            default: 0,
        },
        likes: {
            type: Array,
            default: [],
        },
        comments: {
            type: Array,
            default: [],
        },
        isBreaking: {
            type: Boolean,
            default: false,
        },
        publishedAt: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);
export const Post = mongoose.model("Post", postSchema);
