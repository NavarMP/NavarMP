import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Status } from "@/models/Status";

export async function GET() {
    try {
        await connectDB();
        let status = await Status.findOne().lean();

        // Create default status if it doesn't exist
        if (!status) {
            status = await Status.create({
                availableForFreelance: true,
                openForHire: true,
            });
        }

        return NextResponse.json(status);
    } catch (error) {
        console.error("Error fetching status:", error);
        return NextResponse.json({ error: "Failed to fetch status" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        await connectDB();
        const body = await request.json();

        let status = await Status.findOne();
        if (!status) {
            status = await Status.create(body);
        } else {
            Object.assign(status, body);
            status.lastUpdated = new Date();
            await status.save();
        }

        return NextResponse.json(status);
    } catch (error) {
        console.error("Error updating status:", error);
        return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
    }
}
