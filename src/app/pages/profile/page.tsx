"use client"

import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useState } from "react";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModel";

export default function ProfilePage() {

    const { data: session } = useSession();
    const router = useRouter();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleSignOut = async () => {
        try {
            await signOut({ redirect: false });
            router.push("/user-signIn");
            toast.success("You have been logged out!");
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };

    const openDeleteModal = () => {
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const handleDeleteAccount = async () => {
        try {
            const response = await fetch("/api/user/delete", {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete account");
            }

            await signOut({ redirect: false });
            router.push("/user-signIn");
            toast.success("Your account has been deleted successfully");
        } catch (error) {
            console.error("Delete account error:", error);
            toast.error("Failed to delete account");
        } finally {
            closeDeleteModal();
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="card bg-base-200 w-96 shadow-sm">
                <div className="card-body items-center text-center">
                    <div className="flex items-center m-5 justify-center mt-5">
                        <FontAwesomeIcon icon={faUserAstronaut} fontSize={50}/>
                    </div>
                    <h2 className="card-title">{session?.user?.name || "Not available"}</h2>
                    <p>{session?.user?.email || "Not available"}</p>
                    <div className="flex gap-10">
                        <div className="card-actions mt-10">
                            <button 
                                className="btn btn-soft hover:shadow-md shadow-sky-500 w-35"
                                onClick={openDeleteModal}
                            >
                                Delete Account
                            </button>
                        </div>
                        <div className="card-actions mt-10">
                            <button className="btn btn-soft hover:shadow-md shadow-sky-500 w-35"
                                onClick={handleSignOut}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmDeleteModal 
                isOpen={showDeleteModal} 
                onCancel={closeDeleteModal} 
                onConfirm={handleDeleteAccount}
            />
        </div>
    )
}