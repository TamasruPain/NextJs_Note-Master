"use client"

import { useEffect, useState } from "react";

export default function TotalUsers() {
    const [count, setCount] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCount = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/admin/users-count");
                if (!res.ok) throw new Error("Failed to fetch user count");
                const data = await res.json();
                setCount(data.count);
            } catch (err: any) {
                setError(err.message || "Error fetching user count");
            } finally {
                setLoading(false);
            }
        };
        fetchCount();
    }, []);

    return (
        <div className="card bg-primary text-primary-content w-96">
            <div className="card-body">
                <h2 className="card-title">Total Users</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-200">{error}</p>
                ) : (
                    <p className="text-3xl font-bold">{count}</p>
                )}
            </div>
        </div>
    );
}