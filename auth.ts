import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";
import connectDB from "@/lib/mongodb";
import { User } from "@/models/User";

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    console.log("[Auth] Attempting login for:", credentials?.email);

                    if (!credentials?.email || !credentials?.password) {
                        console.log("[Auth] Missing credentials");
                        return null;
                    }

                    await connectDB();
                    console.log("[Auth] Database connected");

                    const user = await User.findOne({ email: credentials.email })
                        .select("+password")
                        .lean();

                    if (!user) {
                        console.log("[Auth] User not found");
                        return null;
                    }

                    if (!(user as any).isActive) {
                        console.log("[Auth] User is inactive");
                        return null;
                    }

                    const isPasswordValid = await bcrypt.compare(
                        credentials.password as string,
                        (user as any).password
                    );

                    if (!isPasswordValid) {
                        console.log("[Auth] Invalid password. Input:", credentials.password, "Hash:", (user as any).password.substring(0, 10) + "...");
                        return null;
                    }

                    console.log("[Auth] Login successful for:", (user as any).email);

                    return {
                        id: (user as any)._id.toString(),
                        email: (user as any).email,
                        name: (user as any).name,
                        role: (user as any).role,
                    };
                } catch (error) {
                    console.error("[Auth] Authorize error:", error);
                    return null;
                }
            },
        }),
    ],
});
