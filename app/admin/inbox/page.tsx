import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Building, Clock } from "lucide-react";
import connectDB from "@/lib/mongodb";
import { Inquiry } from "@/models/Inquiry";

export default async function AdminInboxPage() {
    const session = await auth();
    if (!session?.user || session.user.role !== "admin") {
        redirect("/admin/login");
    }

    await connectDB();
    const inquiries = await Inquiry.find()
        .sort({ createdAt: -1 })
        .lean();

    const statusColors = {
        new: "bg-red-500",
        read: "bg-yellow-500",
        responded: "bg-green-500",
        archived: "bg-gray-500",
    };

    return (
        <div className="min-h-screen bg-surface/50 pt-24 pb-24">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link
                        href="/admin"
                        className="text-on-surface-variant hover:text-primary transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold font-display">
                        Inquiry <span className="text-primary">Inbox</span>
                    </h1>
                </div>

                {/* Inquiries List */}
                {inquiries.length === 0 ? (
                    <div className="text-center py-24">
                        <p className="text-2xl text-on-surface-variant">No inquiries yet.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {inquiries.map((inquiry: any) => (
                            <div
                                key={inquiry._id.toString()}
                                className="p-6 bg-surface rounded-3xl border border-outline/10 hover:border-primary/30 transition-all"
                            >
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                                    <div className="flex items-start gap-4">
                                        <div
                                            className={`w-3 h-3 rounded-full ${statusColors[inquiry.status as keyof typeof statusColors]} mt-2`}
                                        />
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-bold">{inquiry.name}</h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${inquiry.type === "freelance"
                                                        ? "bg-primary/20 text-primary"
                                                        : "bg-secondary/20 text-secondary"
                                                    }`}>
                                                    {inquiry.type === "freelance" ? "Freelance" : "Hiring"}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap gap-4 text-sm text-on-surface-variant mb-3">
                                                <div className="flex items-center gap-1">
                                                    <Mail size={14} />
                                                    {inquiry.email}
                                                </div>
                                                {inquiry.phone && (
                                                    <div className="flex items-center gap-1">
                                                        <Phone size={14} />
                                                        {inquiry.phone}
                                                    </div>
                                                )}
                                                {inquiry.company && (
                                                    <div className="flex items-center gap-1">
                                                        <Building size={14} />
                                                        {inquiry.company}
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-1">
                                                    <Clock size={14} />
                                                    {new Date(inquiry.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                            {inquiry.projectType && (
                                                <p className="text-sm text-on-surface-variant mb-2">
                                                    <strong>Project:</strong> {inquiry.projectType}
                                                </p>
                                            )}
                                            {inquiry.budget && (
                                                <p className="text-sm text-on-surface-variant mb-2">
                                                    <strong>Budget:</strong> {inquiry.budget}
                                                </p>
                                            )}
                                            <p className="text-on-surface-variant">{inquiry.message}</p>
                                        </div>
                                    </div>

                                    <select
                                        defaultValue={inquiry.status}
                                        className="px-4 py-2 rounded-xl bg-surface-variant/30 border border-outline/20 focus:border-primary outline-none text-sm"
                                    >
                                        <option value="new">New</option>
                                        <option value="read">Read</option>
                                        <option value="responded">Responded</option>
                                        <option value="archived">Archived</option>
                                    </select>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
