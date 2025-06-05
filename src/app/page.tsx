"use client";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState, useRef } from "react";

export default function Home() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (rect) {
            setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                className="relative group card backdrop-blur-lg p-5 rounded-xl overflow-hidden transition duration-300"
            >
                {/* Glow effect that follows mouse */}
                <div
                    className="pointer-events-none absolute -inset-1 rounded-xl opacity-60 group-hover:opacity-100 transition duration-300"
                    style={{
                        background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.1), transparent 80%)`,
                    }}
                />

                <div className="flex flex-col items-center justify-center p-5 gap-5 text-center">
                    <h1 className="text-2xl font-bold">Welcome to Note Master</h1>
                    <label className="text-sm opacity-80">
                        A simple note app where you can save your notes with options for text formatting and PDF summarizing.
                    </label>
                </div>

                <div className="flex items-center justify-center">
                    <div className="w-50 p-5 mt-10">
                        <Link href={'/pages/notes'} className="btn btn-soft hover:shadow-md shadow-green-500 w-full">
                            Get Notes <FontAwesomeIcon icon={faArrowRight} style={{ width: "10%" }} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
