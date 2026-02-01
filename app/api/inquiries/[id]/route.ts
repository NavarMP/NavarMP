import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import { Inquiry } from "@/models/Inquiry";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();
        const { status } = body;

        await connectDB();
        const inquiry = await Inquiry.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!inquiry) {
            return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
        }

        return NextResponse.json(inquiry);
    } catch (error) {
        console.error("Error updating inquiry:", error);
        return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        await connectDB();
        const inquiry = await Inquiry.findByIdAndDelete(id);

        if (!inquiry) {
            return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Inquiry deleted successfully" });
    } catch (error) {
        console.error("Error deleting inquiry:", error);
        return NextResponse.json({ error: "Failed to delete inquiry" }, { status: 500 });
    }
}
