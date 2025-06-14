import mongoose from "mongoose";
const bookmarkSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  posts: {
    type: Array,
    default: [],
  },
});
export const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
