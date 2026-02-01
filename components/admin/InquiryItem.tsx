"use client";

import { useState } from "react";
import { Mail, Phone, Building, Clock } from "lucide-react";
import DeleteButton from "./DeleteButton";
import { useRouter } from "next/navigation";

interface InquiryItemProps {
    inquiry: any;
    statusColors: Record<string, string>;
}

export default function InquiryItem({ inquiry, statusColors }: InquiryItemProps) {
    const router = useRouter();
    const [status, setStatus] = useState(inquiry.status);
    const [loading, setLoading] = useState(false);

    const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        setLoading(true);

        try {
            const res = await fetch(`/api/inquiries/${inquiry._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) {
                router.refresh(); // Refresh to update sorting/filtering if needed
            } else {
                console.error("Failed to update status");
            }
        } catch (error) {
            console.error("Error updating status:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-surface rounded-3xl border border-outline/10 hover:border-primary/30 transition-all">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                    <div
                        className={`w-3 h-3 rounded-full ${statusColors[status as keyof typeof statusColors] || "bg-gray-400"} mt-2`}
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
                        <p className="text-on-surface-variant whitespace-pre-wrap">{inquiry.message}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <select
                        value={status}
                        onChange={handleStatusChange}
                        disabled={loading}
                        className="px-4 py-2 rounded-xl bg-surface-variant/30 border border-outline/20 focus:border-primary outline-none text-sm disabled:opacity-50"
                    >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="responded">Responded</option>
                        <option value="archived">Archived</option>
                    </select>
                    <DeleteButton
                        id={inquiry._id.toString()}
                        endpoint="/api/inquiries"
                        confirmMessage="Delete this inquiry permanently?"
                    />
                </div>
            </div>
        </div>
    );
}
