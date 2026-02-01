import mongoose, { Schema, model, models } from "mongoose";

// User/Admin Schema for NextAuth
const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters long"],
            select: false, // Don't include password in queries by default
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Pre-save hook to hash password (if using bcrypt)
// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const bcrypt = await import("bcryptjs");
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

export const User = models.User || model("User", UserSchema);
