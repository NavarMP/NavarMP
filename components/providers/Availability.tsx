"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export function Availability() {
    const [isAvailable, setIsAvailable] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const headerRef = useRef<HTMLElement>(null);

    // Fetch availability status from API
    useEffect(() => {
        async function fetchStatus() {
            try {
                const response = await fetch("/api/status");
                if (response.ok) {
                    const data = await response.json();
                    setIsAvailable(data.availableForFreelance || data.openForHire);
                }
            } catch (error) {
                console.error("Failed to fetch status:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchStatus();
    }, []);

    return (
        <div className="flex items-center space-x-2">
            {!loading && (
                <>
                    <div
                        className={`w-3 h-3 rounded-full ${isAvailable ? "bg-green-500" : "bg-red-500"
                            } animate-pulse`}
                    />
                    <span className="text-sm text-on-surface-variant hidden sm:block">
                        {isAvailable ? "Available for new projects" : "Currently busy"}
                    </span>
                </>
            )}
        </div>
    );
}