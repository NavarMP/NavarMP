"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
                <h1 className="text-9xl font-bold font-display text-primary mb-4">
                    404
                </h1>
                <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
                    Page Not Found
                </h2>
                <p className="text-xl text-on-surface-variant mb-12">
                    The page you're looking for doesn't exist or has been moved.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="px-8 py-4 rounded-full bg-primary text-on-primary font-bold shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all flex items-center gap-2"
                    >
                        <Home size={20} />
                        Go Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="px-8 py-4 rounded-full bg-surface border-2 border-outline text-on-surface font-medium hover:border-primary transition-all flex items-center gap-2"
                    >
                        <ArrowLeft size={20} />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}
