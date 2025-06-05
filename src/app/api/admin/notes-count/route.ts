import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import connectDB from "@/lib/mongodb";
import NoteModel from "@/models/noteModel";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user || session.user.role !== "admin") {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        await connectDB();
        const count = await NoteModel.countDocuments();
        return NextResponse.json({ count }, { status: 200 });
    } catch (error) {
        console.error("Error counting notes:", error);
        return NextResponse.json({ error: "Failed to count notes" }, { status: 500 });
    }
} 