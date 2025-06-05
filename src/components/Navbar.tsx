"use client";

import Link from "next/link";
import Image from "next/image";
import {useSession} from "next-auth/react";
import ProfileCard from "./Profile-Card";
import ThemeControl from "./Theme-Control";

export default function Navbar() {
    const {data: session, status} = useSession();
    const isLoggedIn = !!session;

    // Optional: Add a loader (or return null if you want to skip UI during loading)
    if (status === "loading") {
        return (
            <div className="navbar bg-black/25 shadow-sm">
                <div className="navbar-start px-4">
                    <span className="loading loading-spinner text-primary"></span>
                </div>
            </div>
        );
    }

    return (
        <div className="navbar bg-black/25 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4 6h16M4 12h8m-8 6h16"/>
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><Link href={"/public"}>Home</Link></li>
                        <li><Link href={"/pages/notes"}>Notes</Link></li>
                    </ul>
                </div>
                <Link href="/" className="flex gap-2 text-xl">
                    <Image src="/Images/favleaf_v1.png" alt="Logo" width={24} height={24}/>
                    <h1 className="hidden sm:block">
                        Note Master
                    </h1>
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link className=" hover:shadow-md shadow-green-500" href={"/"}>Home</Link></li>
                    <li><Link className=" hover:shadow-md shadow-green-500" href={"/pages/about"}>About</Link></li>
                    <li><Link className=" hover:shadow-md shadow-green-500" href={"/pages/notes"}>Notes</Link></li>
                </ul>
            </div>

            <div className="navbar-end mx-5 gap-5">
                <ThemeControl/>

                {isLoggedIn ? (
                    <ProfileCard/>
                ) : (
                    <div className="flex gap-4 mx-2 mr-5">
                        <button className="btn btn-soft hover:shadow-md shadow-green-500">
                            <Link href={"/user-signUp"}>Sign Up</Link>
                        </button>
                        <button className="btn btn-soft hover:shadow-md shadow-green-500">
                            <Link href={"/user-signIn"}>Log in</Link>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
