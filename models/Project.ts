import mongoose, { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Project title is required"],
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        description: {
            type: String,
            required: [true, "Project description is required"],
        },
        category: {
            type: String,
            enum: ["graphic-design", "web-development"],
            required: [true, "Category is required"],
        },
        subcategory: {
            type: String,
            enum: [
                // Graphic Design
                "logo-design",
                "branding",
                "marketing-materials",
                "social-media",
                "illustration",
                "print-design",
                // Web Development
                "web-app",
                "e-commerce",
                "portfolio",
                "landing-page",
                "full-stack",
                "frontend",
            ],
            required: [true, "Subcategory is required"],
        },
        client: {
            type: String,
            trim: true,
        },
        isFreelance: {
            type: Boolean,
            default: false,
        },
        coverImage: {
            type: String, // Cloudinary URL
            required: [true, "Cover image is required"],
        },
        media: [
            {
                type: String, // Cloudinary URLs or video URLs
                url: String,
            },
        ],
        techStack: [
            {
                type: String, // e.g., "Next.js", "React", "Tailwind", "Figma", "Illustrator"
            },
        ],
        tools: [
            {
                type: String, // e.g., "Photoshop", "InDesign", "VS Code"
            },
        ],
        liveUrl: {
            type: String,
            trim: true,
        },
        repoUrl: {
            type: String,
            trim: true,
        },
        featured: {
            type: Boolean,
            default: false,
        },
        order: {
            type: Number,
            default: 0, // For manual sorting
        },
    },
    {
        timestamps: true,
    }
);

// Index for faster queries
ProjectSchema.index({ category: 1, featured: -1, order: 1 });
ProjectSchema.index({ slug: 1 });

export const Project = models.Project || model("Project", ProjectSchema);
