import connectMongoDB from "@/lib/mongodb";
import NoteModel from "@/models/noteModel";
import { NextRequest, NextResponse } from "next/server";

// Get a specific note
export async function GET(
    request: NextRequest,
    context: { params: { id: string } }
) {
    const { id } = context.params;
    await connectMongoDB();

    const note = await NoteModel.findById(id);
    if (!note) {
        return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json({
        id: note._id.toString(),
        title: note.title,
        content: note.content,
        createdAt: note.createdAt,
        userId: note.userId,
    });
}

// Update a specific note
export async function PUT(
    request: NextRequest,
    context: { params: { id: string } }
) {
    const { id } = context.params;
    const { title, content } = await request.json();

    await connectMongoDB();

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

// Delete a specific note
export async function DELETE(
    request: NextRequest,
    context: { params: { id: string } }
) {
    const { id } = context.params;
    await connectMongoDB();
    await NoteModel.findByIdAndDelete(id);

    return NextResponse.json({ message: "Note deleted successfully" }, { status: 200 });
}
