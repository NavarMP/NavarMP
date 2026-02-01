"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const trailRef = useRef<HTMLDivElement>(null);
    const positionRef = useRef({ x: 0, y: 0 });
    const isMobile = useRef(false);

    useEffect(() => {
        // Check if device is mobile
        isMobile.current = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        );

        // Don't show custom cursor on mobile
        if (isMobile.current || !cursorRef.current || !trailRef.current) return;

        const cursor = cursorRef.current;
        const trail = trailRef.current;

        // Mouse move handler (with offset so it follows the real cursor)
        const handleMouseMove = (e: MouseEvent) => {
            positionRef.current = { x: e.clientX, y: e.clientY };

            // Move main cursor with slight offset to follow real cursor
            gsap.to(cursor, {
                x: e.clientX + 2,
                y: e.clientY + 2,
                duration: 0.1,
                ease: "power2.out",
            });

            // Trail follows with more delay
            gsap.to(trail, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.4,
                ease: "power2.out",
            });
        };

        // Hover effect on interactive elements
        const handleMouseEnter = () => {
            gsap.to(cursor, {
                scale: 0.7,
                duration: 0.3,
                ease: "power2.out",
            });
            gsap.to(trail, {
                scale: 1.5,
                duration: 0.3,
                ease: "power2.out",
            });
        };

        const handleMouseLeave = () => {
            gsap.to(cursor, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
            });
            gsap.to(trail, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
            });
        };

        // Add event listeners
        document.addEventListener("mousemove", handleMouseMove);

        // Find all interactive elements
        const interactiveElements = document.querySelectorAll(
            "a, button, input, textarea, select, [role='button'], [onclick]"
        );

        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", handleMouseEnter);
            el.addEventListener("mouseleave", handleMouseLeave);
        });

        // Cleanup
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleMouseEnter);
                el.removeEventListener("mouseleave", handleMouseLeave);
            });
        };
    }, []);

    // Don't render on mobile
    if (typeof window !== "undefined" && isMobile.current) {
        return null;
    }

    return (
        <>
            {/* Main cursor dot */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-3 h-3 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
                style={{ willChange: "transform" }}
            />

            {/* Trailing circle */}
            <div
                ref={trailRef}
                className="fixed top-0 left-0 w-8 h-8 border-2 border-primary rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
                style={{ willChange: "transform" }}
            />
        </>
    );
}
