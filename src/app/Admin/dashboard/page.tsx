"use client";

import TotalUsers from "../../../components/Admin/Total-Users";
import TotalNotes from "../../../components/Admin/Total-Notes";
import { useEffect, useState } from "react";

interface User {
    id: string;
    name: string;
    email: string;
}

export default function AdminDashboard() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/admin/users");
                if (!res.ok) throw new Error("Failed to fetch users");
                const data: User[] = await res.json();
                setUsers(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Error fetching users");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div>
            <div className="text-xl font-bold m-5">
                <h1>Admin Dashboard</h1>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 p-4">
                <TotalUsers />
                <TotalNotes />
            </div>
            <div className="w-full p-4">
                <h2 className="text-lg font-semibold mb-2">User List</h2>
                <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={3}>Loading...</td></tr>
                            ) : error ? (
                                <tr><td colSpan={3} className="text-red-500">{error}</td></tr>
                            ) : users.length === 0 ? (
                                <tr><td colSpan={3}>No users found.</td></tr>
                            ) : (
                                users.map((user, idx) => (
                                    <tr key={user.id}>
                                        <th>{idx + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
