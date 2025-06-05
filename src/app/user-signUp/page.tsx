"use client"

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FaExclamationTriangle } from 'react-icons/fa';
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useState } from "react";

export default function UserSignUpPage() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "user",
    })
    const [pending, setPending] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPending(true);
        try {
            const res = await fetch('/api/auth/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            })
            const data = await res.json();

            if (res.ok) {
                console.log(data);
                setPending(false);
                toast.success("Account created successfully");
                router.push("/user-signIn")
            } else if (res.status === 400) {
                setError(data.message);
                setPending(false);
                toast.error(data.message);
            } else if (res.status === 500) {
                setError(data.message);
                setPending(false);
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div>
                    <div className="flex justify-end mb-4">
                        <Link href="/" className="btn btn-soft hover:shadow-md shadow-green-200">
                            <FontAwesomeIcon icon={faCircleLeft} /> Home
                        </Link>
                    </div>
                    <div
                        className="backdrop-blur-xl font-bold rounded-box w-xs hover:shadow-lg shadow-sky-400">

                        <fieldset className="fieldset p-5">

                            <legend className="fieldset-legend text-2xl mb-6">Sign Up</legend>
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-8">
                                    <label className="floating-label">
                                        <span>Name</span>
                                        <input className="input input-md"
                                            id="Name"
                                            type="text"
                                            placeholder="Full Name"
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            disabled={pending}
                                            required
                                        />
                                    </label>
                                    <label className="floating-label">
                                        <span>Email</span>
                                        <input className="input validator input-md"
                                            id="email"
                                            type="email"
                                            placeholder="abc@example.com"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                                            value={form.password}
                                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                                            disabled={pending}
                                            required
                                        />
                                    </label>
                                    <label className="floating-label">
                                        <span>Confirm Password</span>
                                        <input className="input validator input-md"
                                            id="confrm password"
                                            type="password"
                                            placeholder="Confrm Password"
                                            value={form.confirmPassword}
                                            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                                            disabled={pending}
                                            required
                                        />
                                    </label>
                                    <input
                                        type="text"
                                        name="role"
                                        defaultValue="user" // or let user choose "admin", etc.
                                        hidden
                                    />

                                </div>
                                <button type="submit" className="btn btn-soft mt-10 w-full mb-5 hover:shadow-md shadow-green-200"
                                    disabled={pending}
                                >
                                    Submit
                                </button>
                            </form>
                            {!!error && (
                                <div className="bg-warning/30 p-5 rounded-md flex items-center text-sm text-destructive">
                                    <FaExclamationTriangle />
                                    <p>{error}</p>
                                </div>
                            )}
                            <div className="flex justify-center mt-4">
                                <a href="/user-signIn" className="">
                                    <p>Already have an account?<span className="text-blue-400 m-2">login</span></p>
                                </a>
                            </div>
                        </fieldset>

                    </div>
                </div>

            </div >
        </>
    );
}