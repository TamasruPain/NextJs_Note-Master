"use client"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faEnvelopeOpenText,
    faHouseCrack,
    faSquareCaretRight,
    faUserAstronaut,
    faUsersLine
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function AppSidebar() {

    const items = [
        {
            title: "Dashboard",
            icon: <FontAwesomeIcon icon={faHouseCrack}/>,
            url: "/Admin/dashboard",
        },
        {
            title: "Users",
            icon: <FontAwesomeIcon icon={faUsersLine}/>,
            url: "/Admin/dashboard/users-list",
        },
        {
            title: "Profile",
            icon: <FontAwesomeIcon icon={faUserAstronaut}/>,
            url: "/Admin/dashboard/admin-profile"
        },
        {
            title: "Messages",
            icon: <FontAwesomeIcon icon={faEnvelopeOpenText} />,
            url:"/Admin/dashboard/messages",
        }
    ]

    return (
        <>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle"/>
                <div className="drawer-content bg-base-200 flex flex-col items-start justify-start p-2 h-screen w-15 lg:hidden">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-soft drawer-button lg:hidden">
                        <FontAwesomeIcon icon={faSquareCaretRight}/>
                    </label>

                    <div className="flex flex-col items-center justify-start lg:hidden">
                        {items.map((i) => (
                            <Link
                                className="p-4 lg:hidden"
                                href={i.url}
                                key={i.title}>
                                <div className="flex gap-2">
                                    <span>{i.icon}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="menu bg-base-200 text-base-content min-h-full w-50 p-4">
                        <div className="flex flex-col">
                            {items.map((i) => (
                                <Link
                                    className="p-4 hover:bg-base-300 rounded-lg transition-colors duration-200"
                                    href={i.url}
                                    key={i.title}>
                                    <div className="flex gap-2">
                                        <span>{i.icon}</span>
                                        <span>{i.title}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}