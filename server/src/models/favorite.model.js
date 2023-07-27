import mongoose from "mongoose";
import modelOptions from "./model.option.js";

const favoriteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        mediaType: { type: String, required: true, enum: ["tv", "movie"] },
        mediaId: { type: String, required: true },
        mediaTitle: { type: String, required: true },
        mediaPoster: { type: String, required: true },
        mediaRate: { type: Number, required: true },
    },
    modelOptions
);

export default mongoose.model("Favorite", favoriteSchema);
