"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Logo } from "@/components/ui/Logo";

export function Header() {
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const headerRef = useRef<HTMLElement>(null);

    // Auto-hide on scroll down
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

    return (
        <header
            ref={headerRef}
            className={`fixed top-0 left-0 right-0 z-40 glass backdrop-blur-xl border-b border-outline-variant transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
                }`}
        >
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                    {/* <div className="relative w-10 h-10">
                        <Image
                            src="/assets/Logo.svg"
                            alt="Muḥammed Navār Logo"
                            fill
                            className="object-contain"
                        />
                    </div> */}
                    <div className="relative w-24 h-10">
                        <Logo className="w-full text-primary" />
                    </div>
                    <span className="font-display font-bold text-xl text-on-background hidden md:block">
                        Muḥammed Navār
                    </span>
                </Link>
            </div>
        </header>
    );
}
