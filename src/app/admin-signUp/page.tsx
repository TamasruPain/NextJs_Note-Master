"use client"

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FaExclamationTriangle } from 'react-icons/fa';
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import React, { useState } from "react";

export default function AdminSignUpPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "admin",
    })
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPending(true);

        if (form.password !== form.confirmPassword) {
            toast.error("Passwords do not match");
            setError("Passwords do not match");
            setPending(false);
            return;
        }

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
                setPending(false);
                toast.success("Admin account created successfully");
                router.push("/admin-login")
            } else {
                setError(data.message);
                setPending(false);
                toast.error(data.message);
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong");
            }
            setPending(false);
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

                            <legend className="fieldset-legend text-2xl mb-6">Admin Sign Up</legend>
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
                                            placeholder="admin@example.com"
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
                                            id="confirm-password"
                                            type="password"
                                            placeholder="Confirm Password"
                                            value={form.confirmPassword}
                                            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                                            disabled={pending}
                                            required
                                        />
                                    </label>
                                    <input
                                        type="text"
                                        name="role"
                                        value="admin"
                                        hidden
                                    />

                                </div>
                                <button type="submit"
                                    className="btn btn-soft mt-10 w-full mb-5 hover:shadow-md shadow-green-200"
                                    disabled={pending}
                                >
                                    {pending ? "Submitting..." : "Submit"}
                                </button>
                            </form>
                            {!!error && (
                                <div
                                    className="bg-warning/30 p-5 rounded-md flex items-center text-sm text-destructive">
                                    <FaExclamationTriangle className="mr-2" />
                                    <p>{error}</p>
                                </div>
                            )}
                            <div className="flex justify-center mt-4">
                                <a href="/admin-login" className="">
                                    <p>Already have an admin account?<span className="text-blue-400 m-2">Login</span>
                                    </p>
                                </a>
                            </div>
                        </fieldset>

                    </div>
                </div>

            </div>
        </>
    );
} 