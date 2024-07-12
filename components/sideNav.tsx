import Link from 'next/link'
import React from 'react'
import NavLinks from './dashboard/nav-links'
import { PowerIcon } from '@heroicons/react/24/outline';
import Logo from './logo';
const SideNav = () => {
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <Link
                className="mb-2 flex h-20 items-center justify-start rounded-md bg-blue-600 p-4 md:h-40 gap-4"
                href="/"
            >
                <Logo />
                <div className="mt-2 text-4xl md:mt-14 text-white">
                    LenBg
                </div>
            </Link>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks />
                <div className="hidden h-auto w-full grow rounded-md bg-opacity-15 bg-gray-50 md:block"></div>
                <form>
                    <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-opacity-15 bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                        <PowerIcon className="w-6" />
                        <div className="hidden md:block">Sign Out</div>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SideNav