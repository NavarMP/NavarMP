"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, X, Plus } from "lucide-react";

export default function ProjectForm({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Basic state for form fields - in a real app, use React Hook Form + Zod
    const [formData, setFormData] = useState({
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
        techStack: initialData?.techStack?.join(", ") || "", // Comma separated for simpler input
        tools: initialData?.tools?.join(", ") || "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
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
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-surface-variant/30 border border-outline/20 focus:border-primary outline-none"
                    >
                        <option value="graphic-design">Graphic Design</option>
                        <option value="web-development">Web Development</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2 text-on-surface">Subcategory *</label>
                    <input
                        type="text"
                        name="subcategory"
                        value={formData.subcategory}
                        onChange={handleChange}
                        required
                        placeholder="e.g., logo-design, portfolio"
                        className="w-full px-4 py-3 rounded-xl bg-surface-variant/30 border border-outline/20 focus:border-primary outline-none"
                    />
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
                    <input
                        type="text"
                        name="coverImage"
                        value={formData.coverImage}
                        onChange={handleChange}
                        required
                        placeholder="https://..."
                        className="w-full px-4 py-3 rounded-xl bg-surface-variant/30 border border-outline/20 focus:border-primary outline-none"
                    />
                </div>
            </div>

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
                        placeholder="Figma, Illustrator, Photoshop"
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
