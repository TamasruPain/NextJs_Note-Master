"use client"

import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleLeft} from "@fortawesome/free-solid-svg-icons";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import React, {useState} from "react";
import {FaExclamationTriangle} from "react-icons/fa";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pending, setPending] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPending(true);
        setError("");
        try {
            const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });
            if (res?.ok) {
                router.push("/Admin/dashboard");
                toast.success("Admin login successful");
            } else {
                toast.error("Login failed");
                setPending(false);
                setError("Login failed");
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred");
            }
            setPending(false);
        }
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen"
                 style={{
                     backgroundImage: "url('/images/3480914.jpg')",
                     backgroundSize: "cover",
                     backgroundPosition: "center",
                 }}
            >
                <div>
                    <div className="flex justify-end mb-4">
                        <Link href="/" className="btn btn-soft hover:shadow-md shadow-green-200">
                            <FontAwesomeIcon icon={faCircleLeft}/> Home
                        </Link>
                    </div>
                    <div
                        className="backdrop-blur-xl font-bold rounded-box w-xs hover:shadow-lg shadow-sky-400">

                        <form onSubmit={handleSubmit}>
                            <fieldset className="fieldset p-5">

                                <legend className="fieldset-legend text-2xl mb-8">Admin Login</legend>

                                <div className="flex flex-col gap-6">
                                    <label className="floating-label">
                                        <span>Email</span>
                                        <input className="input validator input-md" type="email" required
                                               placeholder="mail@site.com"
                                               value={email}
                                               onChange={e => setEmail(e.target.value)}
                                               disabled={pending}
                                        />
                                    </label>
                                    <label className="floating-label">
                                        <span>Password</span>
                                        <input type="password" className="input validator input-md" required
                                               placeholder="Password"
                                               value={password}
                                               onChange={e => setPassword(e.target.value)}
                                               disabled={pending}
                                        />

                                    </label>
                                </div>

                                <button type="submit"
                                        className="btn btn-soft mt-10 mb-5 hover:shadow-md shadow-green-200"
                                        disabled={pending}
                                >
                                    {pending ? "Logging in..." : "Login"}
                                </button>

                                {/* // <div className="flex justify-center mt-4">
                                //     <a href="/forgot-password" className="">
                                //         <p>Forgot Password?<span className="text-blue-800"> Click here</span></p>
                                //     </a>
                                // </div>
                                */}
                            </fieldset>
                        </form>
                        {!!error && (
                            <div
                                className="bg-warning/30 p-5 rounded-md flex items-center text-sm text-destructive gap-2">
                                <FaExclamationTriangle/>
                                <p>{error}</p>
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </>
    );
}