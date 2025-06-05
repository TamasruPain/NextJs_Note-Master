import type {Metadata} from "next";
import "@/app/Admin/globalsDashboard.css";
import {ReactNode} from "react";
import AppSidebar from "../../components/Admin/App-Sidebar";


export const metadata: Metadata = {
    title: "Note Master - Admin",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {
    return (
        <div className="flex h-screen">
            <div>
                <AppSidebar/>
            </div>
            <div className="w-full float-right">
                {children}
            </div>
        </div>
    );
}


