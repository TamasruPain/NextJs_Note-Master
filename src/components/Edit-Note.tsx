"use client";

import { useState, useEffect, FormEvent } from "react";

type Props = {
    note: {
        id: string;
        title: string;
        content: string;
    } | null;
    onNoteUpdated: () => void;
};

export default function EditNoteForm({ note, onNoteUpdated }: Props) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setContent(note.content);
        }
    }, [note]);

    if (!note) return null;

    const handleUpdate = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/notes/${note.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, content }),
            });

            if (!res.ok) throw new Error("Failed to update note");

            onNoteUpdated(); // 🔄 Refresh notes
            document.getElementById("my_modal_4")?.click(); // Close modal
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            {/* The button to open modal */}

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my_modal_4" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <div className="modal-action">
                        <label htmlFor="my_modal_4"
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</label>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <form onSubmit={handleUpdate} className="w-full">
                            <fieldset className="fieldset gap-5">
                                <legend className="fieldset-legend text-xl mb-5">Edit The Note</legend>

                                <label className="label">Title</label>
                                <input type="text" className="input w-full" placeholder="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <label className="label">Description</label>
                                <textarea className="textarea h-20 w-full" placeholder="Description"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                                <button type="submit" className="btn btn-neutral mt-4">Update</button>
                            </fieldset>
                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}