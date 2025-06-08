import connectMongoDB from "@/lib/mongodb";
import NoteModel from "@/models/noteModel";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return new Response("Unauthorized", { status: 401 });
        }

        await connectMongoDB();
        const { title, content } = await request.json();

        if (!title || !content) {
            return new NextResponse(JSON.stringify({ error: "Title and content are required" }), {
                status: 400,
            });
        }

        const newNote = new NoteModel({ title, content, userId: session.user.id });
        await newNote.save();
        const mappedNote = {
            id: newNote._id.toString(),
            title: newNote.title,
            content: newNote.content,
            createdAt: newNote.createdAt,
            userId: newNote.userId
        };
        return NextResponse.json(mappedNote, { status: 201 });
    } catch (error) {
        console.error("Error creating note:", error);
        return NextResponse.json({ error: "Failed to create note" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        await connectMongoDB();
        const notes = await NoteModel.find({ userId: session.user.id }).sort({ createdAt: -1 });
        const mappedNotes = notes.map(note => ({
            id: note._id.toString(),
            title: note.title,
            content: note.content,
            createdAt: note.createdAt,
            userId: note.userId
        }));
        return NextResponse.json(mappedNotes, { status: 200 });
    } catch (error) {
        console.error("Error fetching notes:", error);
        return NextResponse.json({ error: "Failed to fetch notes" }, { status: 500 });
    }
}
