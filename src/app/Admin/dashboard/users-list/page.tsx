"use client";

import { useEffect, useState } from "react";

interface Users {
    id: string;
    name: string;
    email: string;
}

export default function UsersListPage() {
    const [users, setUsers] = useState<Users[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/admin/users");
                if (!res.ok) throw new Error("Failed to fetch users");
                const data: Users[] = await res.json();
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
        <div className="flex items-center justify-center">
            <div className="w-full p-4">
                <h2 className="text-lg font-semibold mb-2">User List</h2>
                <div className="rounded-box border border-base-content/5 bg-base-100">
                    <table className="table">
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
