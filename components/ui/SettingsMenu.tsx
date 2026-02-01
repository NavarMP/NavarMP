"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { HiX } from "react-icons/hi";

type Language = "en" | "ml" | "ar";

const colorPresets = [
    { name: "Purple", color: "#6750a4" },
    { name: "Blue", color: "#1976d2" },
    { name: "Green", color: "#2e7d32" },
    { name: "Orange", color: "#ed6c02" },
    { name: "Pink", color: "#d81b60" },
    { name: "Teal", color: "#00897b" },
];

export function SettingsMenu() {
    const { theme, setTheme, primaryColor, setPrimaryColor } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState<Language>("en");

    // Listen for custom event from FloatingNav
    useEffect(() => {
        const handleOpenSettings = () => setIsOpen(true);
        document.addEventListener("openSettings", handleOpenSettings);
        return () => document.removeEventListener("openSettings", handleOpenSettings);
    }, []);

    // Initialize language from localStorage
    useEffect(() => {
        const savedLanguage = localStorage.getItem("language") as Language;
        if (savedLanguage) {
            setLanguage(savedLanguage);
        }
    }, []);

    const handleLanguageChange = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
        // TODO: Trigger i18n language change
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
            />

            {/* Settings Panel */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90vw] max-w-md">
                <div className="glass backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-outline-variant animate-scale-in">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-display font-bold text-2xl text-on-surface">
                            Settings
                        </h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 rounded-lg hover:bg-surface-variant transition-colors"
                            aria-label="Close settings"
                        >
                            <HiX className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Theme Mode */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-on-surface mb-3">
                            Theme Mode
                        </label>
                        <div className="flex space-x-2">
                            {(["light", "dark", "system"] as const).map((mode) => (
                                <button
                                    key={mode}
                                    onClick={() => setTheme(mode)}
                                    className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium capitalize transition-all ${theme === mode
                                            ? "bg-primary text-on-primary shadow-lg scale-105"
                                            : "bg-surface-variant text-on-surface-variant hover:bg-primary-container"
                                        }`}
                                >
                                    {mode}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Primary Color */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-on-surface mb-3">
                            Primary Color
                        </label>
                        <div className="grid grid-cols-3 gap-3 mb-3">
                            {colorPresets.map((preset) => (
                                <button
                                    key={preset.color}
                                    onClick={() => setPrimaryColor(preset.color)}
                                    className={`h-14 rounded-xl transition-all hover:scale-105 ${primaryColor === preset.color
                                            ? "ring-4 ring-primary ring-offset-2 ring-offset-surface scale-105"
                                            : "hover:ring-2 hover:ring-outline"
                                        }`}
                                    style={{ backgroundColor: preset.color }}
                                    title={preset.name}
                                    aria-label={`${preset.name} color`}
                                />
                            ))}
                        </div>

                        {/* Custom Color Input */}
                        <input
                            type="color"
                            value={primaryColor}
                            onChange={(e) => setPrimaryColor(e.target.value)}
                            className="w-full h-12 rounded-xl cursor-pointer"
                            aria-label="Custom primary color"
                        />
                    </div>

                    {/* Language */}
                    <div>
                        <label className="block text-sm font-semibold text-on-surface mb-3">
                            Language
                        </label>
                        <div className="flex space-x-2">
                            {(["en", "ml", "ar"] as Language[]).map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => handleLanguageChange(lang)}
                                    className={`flex-1 px-4 py-3 rounded-xl text-sm font-bold uppercase transition-all ${language === lang
                                            ? "bg-secondary text-on-secondary shadow-lg scale-105"
                                            : "bg-surface-variant text-on-surface-variant hover:bg-secondary-container"
                                        }`}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
