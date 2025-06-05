"use client";

import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import toast from "react-hot-toast";

const TextEditor = () => {
    const editor = useRef(null);
    const [content, setContent] = useState("");

    const handleCopy = () => {
        try {
            if (content) {
                // Replace block-level tags with line breaks before decoding
                const normalizedHtml = content
                    .replace(/<br\s*\/?>/gi, "\n")
                    .replace(/<\/p>/gi, "\n")
                    .replace(/<\/div>/gi, "\n")
                    .replace(/<[^>]*>/g, ""); // strip remaining tags

                const plainText = decodeHtml(normalizedHtml).trim();

                navigator.clipboard.writeText(plainText).then(() => {
                    toast.success("📋 Text copied with line breaks!");
                });
            } else {
                toast("Nothing to copy!");
            }
        } catch (error) {
            toast.error("❌ Failed to copy content");
            console.error(error);
        }
    };

    const decodeHtml = (html: string) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent || "";
    };


    return (
        <div className="h-screen p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold mb-4">Text Editor</h1>
                <button className="btn btn-soft mb-4" onClick={handleCopy}>
                    Copy Plain Text
                </button>
            </div>
            <JoditEditor
                ref={editor}
                value={content}
                onChange={newContent => setContent(newContent)}
                className="text-black bg-zinc-100"
            />
        </div>
    );
};

export default TextEditor;
