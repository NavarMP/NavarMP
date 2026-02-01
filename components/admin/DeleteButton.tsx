"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";

interface DeleteButtonProps {
    id: string;
    endpoint: string; // e.g., "/api/projects"
    confirmMessage?: string;
}

export default function DeleteButton({ id, endpoint, confirmMessage = "Are you sure you want to delete this item?" }: DeleteButtonProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!confirm(confirmMessage)) return;

        setLoading(true);
        try {
            const res = await fetch(`${endpoint}/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                router.refresh();
            } else {
                console.error("Failed to delete item");
                alert("Failed to delete item");
            }
        } catch (error) {
            console.error("Error deleting item:", error);
            alert("Error deleting item");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="p-3 rounded-xl bg-surface-variant/30 text-error hover:bg-error hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Delete"
        >
            {loading ? <Loader2 size={20} className="animate-spin" /> : <Trash2 size={20} />}
        </button>
    );
}
