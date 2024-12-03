// components/Navbar.tsx
'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import AvatarMenu from './AvatarMenu'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar: React.FC = () => {
    const [navOpen, setNavOpen] = useState(false)

    const toggleNav = () => {
        setNavOpen(!navOpen)
    }

    return (
        <nav className="bg-white border-b border-gray-200 fixed w-full z-20 top-0 left-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <span className="text-2xl font-bold text-blue-600 hover:text-blue-800 cursor-pointer">
                                AdCopyGen
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/form">
                            <span className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition duration-200">
                                Generate Ad Copy
                            </span>
                        </Link>
                        <Link href="/ad-copies">
                            <span className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition duration-200">
                                Ad Copies
                            </span>
                        </Link>
                        {/* Additional Links */}
                        {/* <AvatarMenu /> */}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleNav}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-blue-600 focus:outline-none"
                            aria-controls="mobile-menu"
                            aria-expanded={navOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {navOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu with Animation */}
            <AnimatePresence>
                {navOpen && (
                    <motion.div
                        className="md:hidden"
                        id="mobile-menu"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <Link href="/form">
                                <span
                                    className="block text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium cursor-pointer transition duration-200"
                                    onClick={toggleNav}
                                >
                                    Generate Ad Copy
                                </span>
                            </Link>
                            <Link href="/ad-copies">
                                <span
                                    className="block text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium cursor-pointer transition duration-200"
                                    onClick={toggleNav}
                                >
                                    Ad Copies
                                </span>
                            </Link>
                            {/* Additional Links */}
                            <div className="border-t border-gray-200 mt-2 pt-2">
                                <AvatarMenu mobile toggleNav={toggleNav} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Navbar
