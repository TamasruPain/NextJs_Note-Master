import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import connectDB from "@/lib/mongodb";
import User from "@/models/user";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user || session.user.role !== "admin") {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        await connectDB();
        const users = await User.find({}, { password: 0 }); // Exclude password
        // Map _id to id for each user
        const mappedUsers = users.map(user => ({
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role
        }));
        return NextResponse.json(mappedUsers, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
} 