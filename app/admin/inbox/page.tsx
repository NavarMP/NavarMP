import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import connectDB from "@/lib/mongodb";
import { Inquiry } from "@/models/Inquiry";
import InquiryItem from "@/components/admin/InquiryItem";

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
                            <InquiryItem
                                key={inquiry._id.toString()}
                                inquiry={inquiry}
                                statusColors={statusColors}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
