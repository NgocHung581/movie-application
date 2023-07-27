import mongoose from "mongoose";
import modelOptions from "./model.option.js";

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        content: { type: String, required: true },
        mediaType: { type: String, required: true, enum: ["tv", "movie"] },
        mediaId: { type: String, required: true },
        mediaTitle: { type: String, required: true },
        mediaPoster: { type: String, required: true },
    },
    modelOptions
);

export default mongoose.model("Review", reviewSchema);
