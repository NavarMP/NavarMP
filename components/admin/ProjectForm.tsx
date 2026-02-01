"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, X, Plus } from "lucide-react";

interface ProjectFormData {
    title: string;
    slug: string;
    description: string;
    category: string;
    subcategory: string;
    client: string;
    isFreelance: boolean;
    coverImage: string;
    liveUrl: string;
    repoUrl: string;
    featured: boolean;
    techStack: string;
    tools: string;
    media: Array<{ type: 'image' | 'video', url: string }>;
}

export default function ProjectForm({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Basic state for form fields
    const [formData, setFormData] = useState<ProjectFormData>({
        title: initialData?.title || "",
        slug: initialData?.slug || "",
        description: initialData?.description || "",
        category: initialData?.category || "graphic-design",
        subcategory: initialData?.subcategory || "",
        client: initialData?.client || "",
        isFreelance: initialData?.isFreelance || false,
        coverImage: initialData?.coverImage || "",
        liveUrl: initialData?.liveUrl || "",
        repoUrl: initialData?.repoUrl || "",
        featured: initialData?.featured || false,
        techStack: initialData?.techStack?.join(", ") || "",
        tools: initialData?.tools?.join(", ") || "",
        media: initialData?.media || [],
    });

    // Category Data
    const CATEGORIES = {
        "graphic-design": {
            label: "Graphic Design",
            subcategories: [
                { value: "logo-design", label: "Logo Design" },
                { value: "branding", label: "Branding" },
                { value: "marketing-materials", label: "Marketing Materials" },
                { value: "social-media", label: "Social Media" },
                { value: "illustration", label: "Illustration" },
                { value: "print-design", label: "Print Design" },
            ]
        },
        "web-development": {
            label: "Web Development",
            subcategories: [
                { value: "web-app", label: "Web Application" },
                { value: "e-commerce", label: "E-Commerce" },
                { value: "portfolio", label: "Portfolio" },
                { value: "landing-page", label: "Landing Page" },
                { value: "full-stack", label: "Full Stack" },
                { value: "frontend", label: "Frontend" },
            ]
        },
        "app-development": {
            label: "App Development",
            subcategories: [
                { value: "ios", label: "iOS App" },
                { value: "android", label: "Android App" },
                { value: "cross-platform", label: "Cross Platform" },
                { value: "ui-ux", label: "UI/UX Design" },
            ]
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            category: e.target.value,
            subcategory: "" // Reset subcategory when category changes
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Convert comma-separated strings to arrays
            const payload = {
                ...formData,
                techStack: formData.techStack.split(",").map((s: string) => s.trim()).filter(Boolean),
                tools: formData.tools.split(",").map((s: string) => s.trim()).filter(Boolean),
                media: formData.media,
            };

            const url = initialData
                ? `/api/projects/${initialData._id}`
                : "/api/projects";

            const method = initialData ? "PATCH" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                router.push("/admin/projects");
                router.refresh();
            }
        } catch (error) {
            console.error("Failed to save project:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Show loading state/preview if needed
        const button = e.target.parentElement;
        if (button) button.style.opacity = "0.5";

        const formDataVal = new FormData();
        formDataVal.append("file", file);
        formDataVal.append("folder", "navarmp-projects");

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formDataVal,
            });

            if (res.ok) {
                const data = await res.json();
                setFormData(prev => ({
                    ...prev,
                    coverImage: data.url
                }));
            } else {
                console.error("Upload failed");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            if (button) button.style.opacity = "1";
        }
    };

    const isWebOrApp = ["web-development", "app-development"].includes(formData.category);

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium mb-2 text-on-surface">Project Title *</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-surface-variant/30 border border-outline/20 focus:border-primary outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2 text-on-surface">Slug *</label>
                    <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-surface-variant/30 border border-outline/20 focus:border-primary outline-none"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2 text-on-surface">Description *</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-surface-variant/30 border border-outline/20 focus:border-primary outline-none resize-none"
                />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium mb-2 text-on-surface">Category *</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleCategoryChange}
                        className="w-full px-4 py-3 rounded-xl bg-surface-variant/30 border border-outline/20 focus:border-primary outline-none"
                    >
                        {Object.entries(CATEGORIES).map(([key, { label }]) => (
                            <option key={key} value={key}>{label}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2 text-on-surface">Subcategory</label>
                    <select
                        name="subcategory"
                        value={formData.subcategory}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-surface-variant/30 border border-outline/20 focus:border-primary outline-none"
                    >
                        <option value="">Select Subcategory</option>
                        {CATEGORIES[formData.category as keyof typeof CATEGORIES]?.subcategories.map((sub) => (
                            <option key={sub.value} value={sub.value}>{sub.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium mb-2 text-on-surface">Client</label>
                    <input
                        type="text"
                        name="client"
                        value={formData.client}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-surface-variant/30 border border-outline/20 focus:border-primary outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2 text-on-surface">Cover Image URL *</label>
                    <div className="relative">
                        <input
                            type="text"
                            name="coverImage"
                            value={formData.coverImage}
                            onChange={handleChange}
                            required
                            placeholder="https://..."
                            className="w-full px-4 py-3 rounded-xl bg-surface-variant/30 border border-outline/20 focus:border-primary outline-none pr-28"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 overflow-hidden">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <div className="px-3 py-1.5 bg-surface text-xs font-medium rounded-lg border border-outline/20 hover:bg-surface-variant/50 transition-colors flex items-center gap-1 cursor-pointer">
                                <span>Upload</span>
                            </div>
                        </div>
                    </div>
                    {formData.coverImage && (
                        <div className="mt-2 w-20 h-20 rounded-lg overflow-hidden border border-outline/20 relative group">
                            <img src={formData.coverImage} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>
            </div>

            {/* Media Gallery Section */}
            <div>
                <label className="block text-sm font-medium mb-2 text-on-surface">Project Media</label>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {formData.media.map((item: any, index: number) => (
                            <div key={index} className="relative aspect-video bg-surface-variant/20 rounded-lg overflow-hidden group border border-outline/10">
                                {item.type === 'video' ? (
                                    <video src={item.url} className="w-full h-full object-cover" />
                                ) : (
                                    <img src={item.url} alt={`Media ${index}`} className="w-full h-full object-cover" />
                                )}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFormData(prev => ({
                                            ...prev,
                                            media: prev.media.filter((_: any, i: number) => i !== index)
                                        }));
                                    }}
                                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}

                        <div className="relative aspect-video bg-surface-variant/10 rounded-lg border-2 border-dashed border-outline/20 hover:border-primary/50 transition-colors flex flex-col items-center justify-center text-on-surface-variant cursor-pointer">
                            <input
                                type="file"
                                multiple
                                onChange={async (e) => {
                                    const files = e.target.files;
                                    if (!files?.length) return;

                                    // Show loading state on container
                                    const container = e.target.parentElement;
                                    if (container) container.style.opacity = "0.5";

                                    for (let i = 0; i < files.length; i++) {
                                        const file = files[i];
                                        const formDataVal = new FormData();
                                        formDataVal.append("file", file);
                                        formDataVal.append("folder", "navarmp-project-media");

                                        try {
                                            const res = await fetch("/api/upload", {
                                                method: "POST",
                                                body: formDataVal,
                                            });

                                            if (res.ok) {
                                                const data = await res.json();
                                                const type = file.type.startsWith('video/') ? 'video' : 'image';
                                                setFormData(prev => ({
                                                    ...prev,
                                                    media: [...prev.media, { type, url: data.url }]
                                                }));
                                            }
                                        } catch (error) {
                                            console.error("Error uploading media:", error);
                                        }
                                    }
                                    if (container) container.style.opacity = "1";
                                }}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <Plus size={24} className="mb-2" />
                            <span className="text-xs font-medium">Add Media</span>
                        </div>
                    </div>
                </div>
            </div>

            {isWebOrApp && (
                <>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-on-surface">Tech Stack (comma separated)</label>
                            <input
                                type="text"
                                name="techStack"
                                value={formData.techStack}
                                onChange={handleChange}
                                placeholder="React, Next.js, Tailwind"
                                className="w-full px-4 py-3 rounded-xl bg-surface-variant/30 border border-outline/20 focus:border-primary outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 text-on-surface">Tools (comma separated)</label>
                            <input
                                type="text"
                                name="tools"
                                value={formData.tools}
                                onChange={handleChange}
                                placeholder="VS Code, Postman"
                                className="w-full px-4 py-3 rounded-xl bg-surface-variant/30 border border-outline/20 focus:border-primary outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-on-surface">Live URL</label>
                            <input
                                type="url"
                                name="liveUrl"
                                value={formData.liveUrl}
                                onChange={handleChange}
                                placeholder="https://"
                                className="w-full px-4 py-3 rounded-xl bg-surface-variant/30 border border-outline/20 focus:border-primary outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 text-on-surface">Repository URL</label>
                            <input
                                type="url"
                                name="repoUrl"
                                value={formData.repoUrl}
                                onChange={handleChange}
                                placeholder="https://"
                                className="w-full px-4 py-3 rounded-xl bg-surface-variant/30 border border-outline/20 focus:border-primary outline-none"
                            />
                        </div>
                    </div>
                </>
            )}

            {!isWebOrApp && (
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-on-surface">Tools / Software (comma separated)</label>
                        <input
                            type="text"
                            name="tools"
                            value={formData.tools}
                            onChange={handleChange}
                            placeholder="Photoshop, Illustrator, Figma"
                            className="w-full px-4 py-3 rounded-xl bg-surface-variant/30 border border-outline/20 focus:border-primary outline-none"
                        />
                    </div>
                </div>
            )}

            <div className="flex gap-8 pt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleChange}
                        className="w-5 h-5 rounded text-primary focus:ring-primary"
                    />
                    <span className="font-medium">Featured Project</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        name="isFreelance"
                        checked={formData.isFreelance}
                        onChange={handleChange}
                        className="w-5 h-5 rounded text-primary focus:ring-primary"
                    />
                    <span className="font-medium">Freelance Project</span>
                </label>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 rounded-full bg-primary text-on-primary font-bold shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
            >
                {loading ? (
                    <>
                        <Loader2 className="animate-spin" size={20} />
                        Saving...
                    </>
                ) : (
                    <>
                        <Save size={20} />
                        Save Project
                    </>
                )}
            </button>
        </form>
    );
}
