import connectMongoDB from "@/lib/mongodb";
import NoteModel from "@/models/noteModel";
import { NextRequest, NextResponse, RequestEvent } from "next/server";

export async function DELETE(request: NextRequest, event: RequestEvent) {
    const { id } = event.params;
    await connectMongoDB();
    await NoteModel.findByIdAndDelete(id);
    return NextResponse.json({ message: "note deleted successfully" }, { status: 200 });
}

export async function GET(request: NextRequest, event: RequestEvent) {
    const { id } = event.params;
    await connectMongoDB();
    const note = await NoteModel.findById(id);
    if (!note) {
        return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }
    return NextResponse.json(
        {
            id: note._id.toString(),
            title: note.title,
            content: note.content,
            createdAt: note.createdAt,
            userId: note.userId,
        },
        { status: 200 }
    );
}

export async function PUT(request: NextRequest, event: RequestEvent) {
    const { id } = event.params;
    await connectMongoDB();
    const { title, content } = await request.json();
    const updatedNote = await NoteModel.findByIdAndUpdate(
        id,
        { title, content },
        { new: true }
    );
    if (!updatedNote) {
        return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }
    return NextResponse.json({
        id: updatedNote._id.toString(),
        title: updatedNote.title,
        content: updatedNote.content,
        createdAt: updatedNote.createdAt,
        userId: updatedNote.userId,
    });
}
