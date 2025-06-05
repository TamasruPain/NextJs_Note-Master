"use client"

import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleLeft} from "@fortawesome/free-solid-svg-icons";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import React, {useState} from "react";
import {FaExclamationTriangle} from "react-icons/fa"

export default function UserLoginPage() {


    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [pending, setPending] = useState<boolean>(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPending(true);

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
            })
            if (res?.ok) {
                router.push("/pages/notes");
                toast.success("Login successful");
            } else {
                toast.error("Login failed");
                setPending(false);
                setError("Login failed");
            }

        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unexpected error occurred");
            }
        }

    }

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div>
                    <div className="flex justify-end mb-4">
                        <Link href="/" className="btn btn-soft hover:shadow-md shadow-green-200">
                            <FontAwesomeIcon icon={faCircleLeft}/> Home
                        </Link>
                    </div>
                    <div
                        className="backdrop-blur-xl font-bold rounded-box w-xs hover:shadow-lg shadow-sky-400">

                        <fieldset className="fieldset p-5">

                            <legend className="fieldset-legend text-2xl mt-6 mb-6">Sign in</legend>

                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-10">
                                    <label className="floating-label">
                                        <span>Email</span>
                                        <input className="input validator input-md"
                                               id="email"
                                               type="email"
                                               placeholder="abc@example.com"
                                               value={email}
                                               onChange={(e) => setEmail(e.target.value)}
                                               disabled={pending}
                                               required
                                        />
                                    </label>
                                    <label className="floating-label">
                                        <span>Password</span>
                                        <input className="input validator input-md"
                                               id="password"
                                               type="password"
                                               placeholder="Password"
                                               value={password}
                                               onChange={(e) => setPassword(e.target.value)}
                                               disabled={pending}
                                               required/>
                                    </label>
                                </div>
                                <button type="submit"
                                        className="btn btn-soft mt-10 w-full mb-8 hover:shadow-md shadow-green-200"
                                        disabled={pending}
                                >
                                    Log in
                                </button>
                            </form>
                            {!!error && (
                                <div
                                    className="bg-warning/30 p-5 rounded-md flex items-center text-sm text-destructive gap-2">
                                    <FaExclamationTriangle/>
                                    <p>{error}</p>
                                </div>
                            )}
                            <div className="flex justify-center mt-4">
                                <a href="/user-signUp" className="">
                                    <p>Don&apos;t Have a Account?<span className="text-blue-500"> Sign Up</span></p>
                                </a>
                            </div>
                        </fieldset>

                    </div>
                </div>

            </div>
        </>
    );
}