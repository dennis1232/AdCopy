'use client'

import React, { useState } from 'react'
import { signIn, signOut } from 'next-auth/react'
import { FaUserCircle } from 'react-icons/fa'
import { MdKeyboardArrowDown } from 'react-icons/md'
import Link from 'next/link'
import { IconButton, Menu, MenuItem } from '@mui/material'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

interface AvatarMenuProps {
    mobile?: boolean
    toggleNav?: () => void
}

const AvatarMenu: React.FC<AvatarMenuProps> = ({ mobile = false, toggleNav }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const { data: session } = useSession()

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
        if (toggleNav) toggleNav()
    }

    const handleSignOut = () => {
        signOut()
        handleMenuClose()
    }

    const handleSignIn = () => {
        signIn()
        handleMenuClose()
    }

    return (
        <div>
            {/* Avatar Button */}
            <IconButton
                onClick={handleMenuOpen}
                size="small"
                aria-controls={anchorEl ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(anchorEl)}
                color="inherit"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}
            >
                {session?.user?.image ? (
                    <Image
                        src={session.user.image}
                        alt="User Avatar"
                        width={32}
                        height={32}
                        className="rounded-full"
                        style={{ borderRadius: '50%', objectFit: 'cover' }}
                    />
                ) : (
                    <FaUserCircle size={28} />
                )}
                {!mobile && <MdKeyboardArrowDown size={20} />}
            </IconButton>

            {/* Dropdown Menu */}
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    elevation: 4,
                    sx: {
                        mt: 1.5,
                        width: '200px',
                        borderRadius: '12px',
                        overflow: 'visible',
                        boxShadow: '0px 8px 16px rgba(0,0,0,0.2)',
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 16,
                            width: 12,
                            height: 12,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {session ? (
                    <>
                        <MenuItem onClick={handleMenuClose}>
                            <Link href="/profile">
                                <span style={{ width: '100%' }}>Profile</span>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleMenuClose}>
                            <Link href="/settings">
                                <span style={{ width: '100%' }}>Settings</span>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleSignOut}>
                            <span style={{ width: '100%' }}>Logout</span>
                        </MenuItem>
                    </>
                ) : (
                    <MenuItem onClick={handleSignIn}>
                        <span style={{ width: '100%' }}>Login</span>
                    </MenuItem>
                )}
            </Menu>
        </div>
    )
}

export default AvatarMenu
