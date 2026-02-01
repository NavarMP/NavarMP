import mongoose, { Schema, model, models } from "mongoose";

const InquirySchema = new Schema(
    {
        type: {
            type: String,
            enum: ["freelance", "hiring"],
            required: [true, "Inquiry type is required"],
        },
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
        },
        phone: {
            type: String,
            trim: true,
        },
        company: {
            type: String,
            trim: true,
        },
        projectType: {
            type: String, // e.g., "Logo Design", "Web Development"
            trim: true,
        },
        budget: {
            type: String,
            trim: true,
        },
        timeline: {
            type: String,
            trim: true,
        },
        message: {
            type: String,
            required: [true, "Message is required"],
        },
        status: {
            type: String,
            enum: ["new", "read", "responded", "archived"],
            default: "new",
        },
        notes: {
            type: String, // Admin notes
        },
    },
    {
        timestamps: true,
    }
);

InquirySchema.index({ type: 1, status: 1, createdAt: -1 });

export const Inquiry = models.Inquiry || model("Inquiry", InquirySchema);
