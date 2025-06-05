"use client";
import CreateNoteFrom from "@/components/Create-Notes";
import { useEffect, useState } from "react";
import ViewNoteFrom from "@/components/View-Note";
import EditNoteForm from "@/components/Edit-Note";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModel";
import toast from "react-hot-toast";

type Note = {
    id: string,
    title: string,
    content: string,
    createdAt: string,
}

export default function NotesList() {

    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null)

    const fetchNotes = async () => {
        try {
            const response = await fetch("/api/notes", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch notes");
            }
            const data = await response.json();
            setNotes(data);
            console.log("Fetched notes ✅", data.length);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchNotes();
    }, [])

    const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const openDeleteModal = (note: Note) => {
        setNoteToDelete(note);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setNoteToDelete(null);
        setShowDeleteModal(false);
    };

    const confirmDeleteNote = async () => {
        if (!noteToDelete) return;

        try {
            const response = await fetch(`/api/notes/${noteToDelete.id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Failed to delete note");

            await fetchNotes();
            console.log("Note deleted successfully");
            toast.success("Note deleted successfully")
        } catch (error) {
            console.error(error);
        } finally {
            closeDeleteModal();
        }
    };

    const [searchTerm, setSearchTerm] = useState("")

    const filteredNotes = notes.filter(e =>
        e.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="">
            {/* search bar */}
            <div className="flex items-center justify-center p-2 gap-3">
                <input
                    type="search"
                    className="input bg-base-100 w-60 p-2 rounded"
                    placeholder="🔍 Search by Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    className="btn btn-soft"
                    onClick={() => setSearchTerm("")}
                >
                    Clear
                </button>
            </div>
            <div className="flex items-center justify-between p-2">
                <div className="">
                    <legend className="text-3xl font-bold text-white">
                        My Notes
                    </legend>
                </div>
                <div className="">
                    <legend>
                        <label htmlFor="my_modal_6" className="btn btn-soft">Add a Note</label>
                    </legend>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 overflow-scroll h-120 p-5 border-2 rounded-xl">
                {filteredNotes.length === 0 ? (
                    <div className="col-span-full text-center text-gray-400 text-lg">
                        📭 No notes found.
                    </div>
                ) : (
                    filteredNotes.map((note) => (
                        <div className="card bg-base-300 shadow-xl max-h-40" key={note.id}>
                            <div className="card-body">
                                <div className="flex items-center justify-between">
                                    <h2 className="card-title">{note.title}</h2>
                                    <label className="float-end">{new Date(note.createdAt).toLocaleDateString()}</label>
                                </div>
                                <p>{note.content}</p>
                                <div className="justify-end card-actions">
                                    <label htmlFor="my_modal_2" className="btn btn-primary btn-soft"
                                        onClick={() => setSelectedNote(note)}>View</label>
                                    <label htmlFor="my_modal_4" className="btn btn-success btn-soft"
                                        onClick={() => setSelectedNote(note)}>Edit</label>
                                    <button className="btn btn-warning btn-soft"
                                        onClick={() => openDeleteModal(note)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <CreateNoteFrom onNoteCreated={fetchNotes} />

            <ViewNoteFrom note={selectedNote} />
            <EditNoteForm note={selectedNote} onNoteUpdated={fetchNotes} />
            <ConfirmDeleteModal
                isOpen={showDeleteModal}
                onCancel={closeDeleteModal}
                onConfirm={confirmDeleteNote}
            />
        </div>
    )
}
