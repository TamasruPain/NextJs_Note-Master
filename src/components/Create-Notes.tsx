"use client";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

type Props = {
    onNoteCreated: () => void; // 🔁 This will notify the parent
};

export default function CreateNoteFrom({ onNoteCreated }: Props) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, content })
            });

            if (!response.ok) {
                throw new Error("Failed to create note");
            }
            setTitle("");
            setContent("");
            const modalCheckbox = document.getElementById("my_modal_6") as HTMLInputElement | null;
            if (modalCheckbox) {
                modalCheckbox.checked = false;
            }

            onNoteCreated(); // 🔁 Trigger note list refresh

            console.log("Note created successfully ✅");
            toast.success("Note created successfully ✅");
        } catch (error) {
            console.log(error)
            toast.error("Failed to create note ❌");
        }

    }

    return (
        <>
            {/* The button to open modal */}
            
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal z-50" role="dialog">
                <div className="modal-box">
                    <div className="modal-action">
                        <label htmlFor="my_modal_6" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</label>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <form onSubmit={handleSubmit} className="w-full">
                            <fieldset className="fieldset w-full gap-5">
                                <legend className="fieldset-legend text-xl mb-5">Create a Note</legend>

                                <label className="label">Title</label>
                                <input type="text" className="input w-full" placeholder="title"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                />
                                <label className="label">Content</label>
                                <textarea className="textarea h-20 w-full" placeholder="Content"
                                    onChange={(e) => setContent(e.target.value)}
                                    value={content}
                                />
                                <button type="submit" className="btn btn-neutral mt-4">Create</button>
                            </fieldset>
                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}