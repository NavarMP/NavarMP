"use client";

import { useState } from "react";
import { Send, Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ContactPage() {
    const [formType, setFormType] = useState<"freelance" | "hiring">("freelance");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        data.type = formType;

        try {
            const res = await fetch("/api/inquiries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setSuccess(true);
                (e.target as HTMLFormElement).reset();
            }
        } catch (error) {
            console.error("Failed to submit inquiry:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-24">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Header */}
                <div className="mb-16 animate-slide-in-left">
                    <h1 className="text-5xl md:text-6xl font-bold font-display mb-6">
                        Get In <span className="text-primary">Touch</span>
                    </h1>
                    <p className="text-xl text-on-surface-variant max-w-3xl leading-relaxed">
                        Have a project in mind or looking to hire? I'd love to hear from you. Fill out the form below and I'll get back to you as soon as possible.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Contact Info Sidebar */}
                    <div className="space-y-8">
                        <div className="p-8 bg-surface rounded-3xl border border-outline/10">
                            <h3 className="text-2xl font-bold font-display mb-6">Contact Information</h3>

                            <div className="space-y-6">
                                <a
                                    href="mailto:NavarMP@gmail.com"
                                    className="flex items-center gap-4 text-on-surface-variant hover:text-primary transition-colors group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-on-surface-variant">Email</p>
                                        <p className="font-medium text-on-surface">NavarMP@gmail.com</p>
                                    </div>
                                </a>

                                <a
                                    href="tel:+919746902268"
                                    className="flex items-center gap-4 text-on-surface-variant hover:text-primary transition-colors group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-on-surface-variant">Phone</p>
                                        <p className="font-medium text-on-surface">+91 9746 902268</p>
                                    </div>
                                </a>

                                <div className="flex items-center gap-4 text-on-surface-variant">
                                    <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-on-surface-variant">Location</p>
                                        <p className="font-medium text-on-surface">Kerala, India</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl border border-primary/20">
                            <h4 className="font-bold text-lg mb-4">Response Time</h4>
                            <p className="text-on-surface-variant text-sm">
                                I typically respond to inquiries within <strong className="text-primary">24-48 hours</strong>. For urgent matters, feel free to call directly.
                            </p>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="lg:col-span-2">
                        {/* Form Type Toggle */}
                        <div className="flex gap-4 mb-8">
                            <button
                                onClick={() => setFormType("freelance")}
                                className={cn(
                                    "flex-1 px-8 py-4 rounded-2xl font-bold transition-all",
                                    formType === "freelance"
                                        ? "bg-primary text-on-primary shadow-lg"
                                        : "bg-surface border border-outline/20 text-on-surface-variant hover:border-primary/50"
                                )}
                            >
                                Freelance Project
                            </button>
                            <button
                                onClick={() => setFormType("hiring")}
                                className={cn(
                                    "flex-1 px-8 py-4 rounded-2xl font-bold transition-all",
                                    formType === "hiring"
                                        ? "bg-primary text-on-primary shadow-lg"
                                        : "bg-surface border border-outline/20 text-on-surface-variant hover:border-primary/50"
                                )}
                            >
                                Full-Time Hiring
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-on-surface">
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-surface border border-outline/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-on-surface"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-on-surface">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-surface border border-outline/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-on-surface"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium mb-2 text-on-surface">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className="w-full px-4 py-3 rounded-xl bg-surface border border-outline/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-on-surface"
                                        placeholder="+1 234 567 8900"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="company" className="block text-sm font-medium mb-2 text-on-surface">
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        className="w-full px-4 py-3 rounded-xl bg-surface border border-outline/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-on-surface"
                                        placeholder="Acme Inc."
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="projectType" className="block text-sm font-medium mb-2 text-on-surface">
                                        Project Type
                                    </label>
                                    <select
                                        id="projectType"
                                        name="projectType"
                                        className="w-full px-4 py-3 rounded-xl bg-surface border border-outline/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-on-surface"
                                    >
                                        <option value="">Select a type</option>
                                        <option value="Logo Design">Logo Design</option>
                                        <option value="Branding">Branding</option>
                                        <option value="Web Development">Web Development</option>
                                        <option value="E-Commerce">E-Commerce</option>
                                        <option value="Full-Stack App">Full-Stack App</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="budget" className="block text-sm font-medium mb-2 text-on-surface">
                                        Budget Range
                                    </label>
                                    <select
                                        id="budget"
                                        name="budget"
                                        className="w-full px-4 py-3 rounded-xl bg-surface border border-outline/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-on-surface"
                                    >
                                        <option value="">Select budget</option>
                                        <option value="< $1,000">Less than $1,000</option>
                                        <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                                        <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                                        <option value="$10,000+">$10,000+</option>
                                        <option value="Open to discussion">Open to discussion</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="timeline" className="block text-sm font-medium mb-2 text-on-surface">
                                    Project Timeline
                                </label>
                                <input
                                    type="text"
                                    id="timeline"
                                    name="timeline"
                                    className="w-full px-4 py-3 rounded-xl bg-surface border border-outline/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-on-surface"
                                    placeholder="e.g., 2-3 months, ASAP, Flexible"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2 text-on-surface">
                                    Project Details *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 rounded-xl bg-surface border border-outline/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-on-surface resize-none"
                                    placeholder="Tell me about your project, goals, and any specific requirements..."
                                />
                            </div>

                            {success && (
                                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-600 dark:text-green-400">
                                    ✓ Thank you! Your inquiry has been sent successfully. I'll get back to you soon.
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full px-8 py-4 rounded-full bg-primary text-on-primary font-bold shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send size={20} />
                                        Send Inquiry
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
