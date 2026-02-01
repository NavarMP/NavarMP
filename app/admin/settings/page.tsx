"use client";

import { useState, useEffect } from "react";
import { Save, Loader2 } from "lucide-react";

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

export default function AdminSettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [availableForFreelance, setAvailableForFreelance] = useState(true);
    const [openForHire, setOpenForHire] = useState(true);
    const [statusMessage, setStatusMessage] = useState("");
    const [resumeUrl, setResumeUrl] = useState("");
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        async function fetchStatus() {
            try {
                const res = await fetch("/api/status");
                const data = await res.json();
                setAvailableForFreelance(data.availableForFreelance);
                setOpenForHire(data.openForHire);
                setStatusMessage(data.statusMessage || "");
                setResumeUrl(data.resumeUrl || "");
            } catch (error) {
                console.error("Failed to fetch status:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchStatus();
    }, []);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "navarmp-resume");

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                setResumeUrl(data.url);
            } else {
                console.error("Upload failed");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setSuccess(false);

        try {
            const res = await fetch("/api/status", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    availableForFreelance,
                    openForHire,
                    statusMessage,
                    resumeUrl,
                }),
            });

            if (res.ok) {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
            }
        } catch (error) {
            console.error("Failed to save settings:", error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={40} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface/50 pt-24 pb-24">
            <div className="max-w-4xl mx-auto px-4 md:px-8">
                <h1 className="text-4xl md:text-5xl font-bold font-display mb-12">
                    Admin <span className="text-primary">Settings</span>
                </h1>

                <div className="space-y-8">
                    {/* Availability Toggles */}
                    <div className="p-8 bg-surface rounded-3xl border border-outline/10">
                        <h2 className="text-2xl font-bold font-display mb-6">Availability Status</h2>

                        <div className="space-y-6">
                            {/* Freelance Toggle */}
                            <div className="flex items-center justify-between p-6 bg-surface-variant/20 rounded-2xl">
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Available for Freelance</h3>
                                    <p className="text-sm text-on-surface-variant">
                                        Show that you're accepting new freelance projects
                                    </p>
                                </div>
                                <button
                                    onClick={() => setAvailableForFreelance(!availableForFreelance)}
                                    className={`relative w-16 h-8 rounded-full transition-colors ${availableForFreelance ? "bg-green-500" : "bg-gray-400"
                                        }`}
                                >
                                    <span
                                        className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transition-transform ${availableForFreelance ? "right-1" : "left-1"
                                            }`}
                                    />
                                </button>
                            </div>

                            {/* Hiring Toggle */}
                            <div className="flex items-center justify-between p-6 bg-surface-variant/20 rounded-2xl">
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Open for Hiring</h3>
                                    <p className="text-sm text-on-surface-variant">
                                        Show that you're open to full-time opportunities
                                    </p>
                                </div>
                                <button
                                    onClick={() => setOpenForHire(!openForHire)}
                                    className={`relative w-16 h-8 rounded-full transition-colors ${openForHire ? "bg-green-500" : "bg-gray-400"
                                        }`}
                                >
                                    <span
                                        className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transition-transform ${openForHire ? "right-1" : "left-1"
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Status Message */}
                    <div className="p-8 bg-surface rounded-3xl border border-outline/10">
                        <h2 className="text-2xl font-bold font-display mb-6">Status Message</h2>
                        <textarea
                            value={statusMessage}
                            onChange={(e) => setStatusMessage(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl bg-surface-variant/30 border border-outline/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-on-surface resize-none"
                            placeholder="e.g., Available for new projects, Currently booked until March..."
                        />
                    </div>

                    {/* Resume Upload */}
                    <div className="p-8 bg-surface rounded-3xl border border-outline/10">
                        <h2 className="text-2xl font-bold font-display mb-6">Resume / CV</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-on-surface">Upload New PDF</label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleFileUpload}
                                        disabled={uploading}
                                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 text-sm text-on-surface-variant cursor-pointer"
                                    />
                                    {uploading && <Loader2 className="animate-spin text-primary" size={20} />}
                                </div>
                            </div>

                            {resumeUrl && (
                                <div className="p-4 bg-surface-variant/20 rounded-xl flex items-center justify-between">
                                    <div className="truncate flex-1 mr-4">
                                        <p className="text-sm font-medium text-on-surface">Current Resume Link</p>
                                        <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline truncate block">
                                            {resumeUrl}
                                        </a>
                                    </div>
                                    <a
                                        href={resumeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-1.5 bg-surface text-xs font-medium rounded-lg border border-outline/20 hover:bg-surface-variant/50 transition-colors"
                                    >
                                        View
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="px-8 py-4 rounded-full bg-primary text-on-primary font-bold shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save size={20} />
                                    Save Changes
                                </>
                            )}
                        </button>

                        {success && (
                            <span className="text-green-600 dark:text-green-400 font-medium">
                                ✓ Settings saved successfully
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
