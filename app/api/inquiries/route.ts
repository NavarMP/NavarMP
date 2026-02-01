import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Inquiry } from "@/models/Inquiry";

export async function POST(request: Request) {
    try {
        await connectDB();

        const body = await request.json();
        const { type, name, email, phone, company, projectType, budget, timeline, message } = body;

        // Basic validation
        if (!type || !name || !email || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Create inquiry
        const inquiry = await Inquiry.create({
            type,
            name,
            email,
            phone,
            company,
            projectType,
            budget,
            timeline,
            message,
            status: "new",
        });

        // TODO: Send email notification to admin
        // await sendNotificationEmail(inquiry);

        return NextResponse.json({ success: true, id: inquiry._id }, { status: 201 });
    } catch (error) {
        console.error("Error creating inquiry:", error);
        return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 });
    }
}
