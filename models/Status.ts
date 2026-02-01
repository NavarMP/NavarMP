import mongoose, { Schema, model, models } from "mongoose";

const StatusSchema = new Schema(
    {
        availableForFreelance: {
            type: Boolean,
            default: true,
        },
        openForHire: {
            type: Boolean,
            default: true,
        },
        statusMessage: {
            type: String,
            trim: true,
            default: "Available for new projects",
        },
        resumeUrl: {
            type: String,
            trim: true,
            default: "/assets/NavarMP_resume.pdf", // Default fallback
        },
        lastUpdated: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

// Ensure only one status document exists (singleton pattern)
StatusSchema.statics.getSingleton = async function () {
    let status = await this.findOne();
    if (!status) {
        status = await this.create({
            availableForFreelance: true,
            openForHire: true,
        });
    }
    return status;
};

export const Status = models.Status || model("Status", StatusSchema);
