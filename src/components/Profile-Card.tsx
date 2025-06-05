"use client"

import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession, signOut } from "next-auth/react"
import Link from "next/link";
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function ProfileCard() {

    const { data: session } = useSession();
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await signOut({ redirect: false });
            router.push("/user-signIn");
            toast.success("You have been logged out!");
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };

    return (
        <>
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-soft flex gap-3 m-1 hover:shadow-md shadow-green-500">
                    <FontAwesomeIcon icon={faUserAstronaut} />
                    {session?.user?.email || "Not available"}
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 gap-2 shadow-sm">
                    <li>
                        <Link
                            href={session?.user?.role === "admin" ? "/Admin/dashboard/admin-profile" : "/pages/profile"}
                            className="btn btn-soft hover:shadow-md shadow-sky-500"
                        >
                            Profile
                        </Link>
                    </li>
                    <li>
                        <a className="btn btn-soft hover:shadow-md shadow-sky-500" onClick={handleSignOut}>
                            Logout
                        </a>
                    </li>

                </ul>
            </div>
        </>
    );
}