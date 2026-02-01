"use client";

import { useState } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";

const colorPresets = [
    { name: "Purple", color: "#6750a4" },
    { name: "Blue", color: "#1976d2" },
    { name: "Green", color: "#2e7d32" },
    { name: "Orange", color: "#ed6c02" },
    { name: "Pink", color: "#d81b60" },
    { name: "Teal", color: "#00897b" },
];

export function ThemePicker() {
    const { theme, setTheme, primaryColor, setPrimaryColor } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-20 right-4 z-50">
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 rounded-full bg-primary text-on-primary shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
                aria-label="Theme Settings"
            >
                🎨
            </button>

            {/* Settings Panel */}
            {isOpen && (
                <div className="absolute bottom-16 right-0 w-72 glass backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-outline-variant animate-scale-in">
                    <h3 className="font-display font-semibold text-lg mb-4 text-on-surface">
                        Theme Settings
                    </h3>

                    {/* Theme Mode */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-on-surface-variant mb-2">
                            Mode
                        </label>
                        <div className="flex space-x-2">
                            {(["light", "dark", "system"] as const).map((mode) => (
                                <button
                                    key={mode}
                                    onClick={() => setTheme(mode)}
                                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium capitalize transition-all ${theme === mode
                                        ? "bg-primary text-on-primary"
                                        : "bg-surface-variant text-on-surface-variant hover:bg-primary-container"
                                        }`}
                                >
                                    {mode}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Color Presets */}
                    <div>
                        <label className="block text-sm font-medium text-on-surface-variant mb-2">
                            Primary Color
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {colorPresets.map((preset) => (
                                <button
                                    key={preset.color}
                                    onClick={() => setPrimaryColor(preset.color)}
                                    className={`h-12 rounded-lg transition-all hover:scale-105 ${primaryColor === preset.color
                                        ? "ring-2 ring-primary ring-offset-2 ring-offset-surface"
                                        : ""
                                        }`}
                                    style={{ backgroundColor: preset.color }}
                                    title={preset.name}
                                />
                            ))}
                        </div>

                        {/* Custom Color Input */}
                        <div className="mt-3">
                            <input
                                type="color"
                                value={primaryColor}
                                onChange={(e) => setPrimaryColor(e.target.value)}
                                className="w-full h-10 rounded-lg cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="mt-4 w-full py-2 rounded-lg bg-surface-variant text-on-surface-variant hover:bg-primary-container transition-colors text-sm font-medium"
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
}
