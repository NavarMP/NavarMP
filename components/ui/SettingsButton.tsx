"use client";

import { useState, useEffect, useRef } from "react";
import { HiCog } from "react-icons/hi";

export function SettingsButton() {
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);

    // Auto-hide on scroll
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                // Scrolling down
                setIsVisible(false);
            } else {
                // Scrolling up
                setIsVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClick = () => {
        document.dispatchEvent(new CustomEvent("openSettings"));
    };

    return (
        <button
            onClick={handleClick}
            className={`fixed top-4 right-4 z-50 p-4 hover:scale-110 transition-all ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            aria-label="Open Settings"
            title="Settings"
        >
            <HiCog className="w-4 h-4" />
        </button>
    );
}
