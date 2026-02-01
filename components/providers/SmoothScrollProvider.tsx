"use client";

import { useSmoothScroll } from "@/lib/hooks/useSmoothScroll";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    useSmoothScroll();

    return <>{children}</>;
}
