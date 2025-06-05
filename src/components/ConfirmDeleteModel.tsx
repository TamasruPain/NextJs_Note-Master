// components/ConfirmDeleteModal.tsx
"use client";
import React from "react";

type ConfirmDeleteModalProps = {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
};

export default function ConfirmDeleteModal({ 
    isOpen, 
    onCancel, 
    onConfirm, 
    title = "Confirm Delete",
    message = "Are you sure you want to delete this item?"
}: ConfirmDeleteModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="card bg-base-100 w-96">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{title}</h2>
                    <p>{message}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={onConfirm}>
                            Yes, Delete
                        </button>
                        <button className="btn btn-ghost" onClick={onCancel}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
