'use client';

import { useState, useEffect, Fragment } from 'react';
import Image from "next/image";
import { useAppDispatch } from '@/lib/hook';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { clearTokens } from '@/lib/features/user/userSlice';

export default function Navigation() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        dispatch(clearTokens());
        router.push('/');
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Ensure the sidebar state is only toggled on the client side
    useEffect(() => {
        // This effect runs only on the client side
    }, []);

 

    return (
        <>
            {/* Header */}
            <div className="flex justify-between items-center p-4 bg-gray-100 shadow-md lg:hidden">
                <button onClick={toggleSidebar}>
                    ☰
                </button>
                <div className="flex justify-center items-center">
                    <Image
                        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                        src="/logo.png"
                        alt="Next.js Logo"
                        width={48.7}
                        height={34.78}
                    />
                </div>
            </div>

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 min-h-screen bg-[#D9D9D9] w-full lg:w-64 shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:flex lg:flex-col z-50`}>
                {/* Close Button */}
                {isSidebarOpen && (
                    <div className="lg:hidden p-4 flex justify-end">
                        <button onClick={toggleSidebar}>
                            ✕
                        </button>
                    </div>
                )}
                {/* Logo */}
                <div className="hidden lg:flex justify-center items-center p-4">
                    <Image
                        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                        src="/logo.png"
                        alt="Next.js Logo"
                        width={48.7}
                        height={34.78}
                    />
                </div>
                {/* Navigation */}
                <ul className="flex flex-col items-center lg:items-start">
                    <li className="px-4 py-1">
                        <Link href="/profile" onClick={toggleSidebar}>
                            Posts
                        </Link>
                    </li>
                    <li className="px-4 py-1">
                        <button
                            onClick={() => {
                                if (confirm("Are you sure?")) {
                                    handleLogout();
                                    toggleSidebar();
                                }
                            }}
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </aside>
        </>
    );
}