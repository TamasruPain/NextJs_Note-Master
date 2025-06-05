"use client"

import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/admin-login");
      toast.success("You have been logged out!");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (status === "loading") {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body items-center text-center">
          <div className="flex items-center m-5 justify-center mt-5">
            <FontAwesomeIcon icon={faUserAstronaut} fontSize={50} />
          </div>
          <h2 className="card-title">{session?.user?.name || "Not available"}</h2>
          <p>{session?.user?.email || "Not available"}</p>
          <p className="mt-2 text-sm text-gray-500">Role: {session?.user?.role || "admin"}</p>
          <div className="card-actions mt-10">
            <button
              className="btn btn-soft hover:shadow-md shadow-sky-500 w-35"
              onClick={handleSignOut}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}