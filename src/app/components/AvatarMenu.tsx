// components/AvatarMenu.tsx
'use client'

import React, { useState, useRef, useEffect } from 'react'
import { signIn, signOut } from 'next-auth/react'
import { FaUserCircle } from 'react-icons/fa'
import { MdKeyboardArrowDown } from 'react-icons/md'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Button from './Button'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

interface AvatarMenuProps {
    mobile?: boolean
    toggleNav?: () => void
}

const AvatarMenu: React.FC<AvatarMenuProps> = ({ mobile = false, toggleNav }) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const { data: session, status } = useSession()
    console.log(session, status)

    const menuRef = useRef<HTMLDivElement>(null)

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    // Close the menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleSignOut = () => {
        signOut()
        setMenuOpen(false)
        if (toggleNav) toggleNav()
    }

    const handleSignIn = () => {
        signIn()
        setMenuOpen(false)
        if (toggleNav) toggleNav()
    }

    return (
        <div className="relative inline-block text-left" ref={menuRef}>
            <button onClick={toggleMenu} className="flex items-center space-x-1 focus:outline-none">
                {session?.user?.image ? (
                    <Image src={session.user.image} alt="User Avatar" width={32} height={32} className="rounded-full" />
                ) : (
                    <FaUserCircle size={24} className="text-gray-800 hover:text-blue-600 transition duration-200" />
                )}
                {!mobile && (
                    <MdKeyboardArrowDown
                        size={20}
                        className="text-gray-800 hover:text-blue-600 transition duration-200"
                    />
                )}
            </button>

            {/* Dropdown Menu with Animation */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0.2, scaleY: 0.9, transformOrigin: 'top' }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        exit={{ opacity: 0, scaleY: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${
                            mobile ? 'relative' : ''
                        }`}
                    >
                        <div className="py-1" role="menu" aria-orientation="vertical">
                            {session ? (
                                <>
                                    <Link href="/profile">
                                        <span
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition duration-200"
                                            role="menuitem"
                                            onClick={() => {
                                                setMenuOpen(false)
                                                if (mobile && toggleNav) toggleNav()
                                            }}
                                        >
                                            Profile
                                        </span>
                                    </Link>
                                    <Link href="/settings">
                                        <span
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition duration-200"
                                            role="menuitem"
                                            onClick={() => {
                                                setMenuOpen(false)
                                                if (mobile && toggleNav) toggleNav()
                                            }}
                                        >
                                            Settings
                                        </span>
                                    </Link>
                                    <Button
                                        onClick={handleSignOut}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-200"
                                        role="menuitem"
                                    >
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    onClick={handleSignIn}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-200"
                                    role="menuitem"
                                >
                                    Login
                                </Button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default AvatarMenu
