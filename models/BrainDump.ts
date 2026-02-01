import mongoose, { Schema, model, models } from "mongoose";

const BrainDumpSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        content: {
            type: String,
            required: [true, "Content is required"],
        },
        excerpt: {
            type: String,
            trim: true,
        },
        tags: [
            {
                type: String,
                trim: true,
            },
        ],
        coverImage: {
            type: String, // Cloudinary URL (optional)
        },
        published: {
            type: Boolean,
            default: false,
        },
        viewCount: {
            type: Number,
            default: 0,
        },
        readTime: {
            type: Number, // Estimated minutes
            default: 5,
        },
    },
    {
        timestamps: true,
    }
);

BrainDumpSchema.index({ published: 1, createdAt: -1 });
BrainDumpSchema.index({ slug: 1 });

export const BrainDump = models.BrainDump || model("BrainDump", BrainDumpSchema);
