import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/admin/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isAdminRoute = nextUrl.pathname.startsWith("/admin");
            const isLoginRoute = nextUrl.pathname.startsWith("/admin/login");

            if (isAdminRoute) {
                if (isLoginRoute) return true;
                if (isLoggedIn) {
                    // Check role if available in session (basic check here, full check in middleware/server side if needed)
                    if (auth.user?.role === "admin") return true;
                    return false; // Redirect if not admin
                }
                return false; // Redirect unauthenticated users to login page
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as string;
                session.user.id = token.id as string;
            }
            return session;
        },
    },
    providers: [], // Providers configured in auth.ts
} satisfies NextAuthConfig;
