'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material'
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material'
import AvatarMenu from './AvatarMenu'

const Navbar: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    return (
        <AppBar position="fixed" color="inherit" elevation={1}>
            <Toolbar>
                {/* Logo */}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link href="/" passHref>
                        <Button color="inherit" sx={{ textTransform: 'none', fontSize: '1.25rem' }}>
                            AdCopyGen
                        </Button>
                    </Link>
                </Typography>

                {/* Desktop Navigation */}
                {!isMobile && (
                    <>
                        <Link href="/form" passHref>
                            <Button color="inherit">Generate Ad Copy</Button>
                        </Link>
                        <Link href="/ad-copies" passHref>
                            <Button color="inherit">Ad Copies</Button>
                        </Link>
                    </>
                )}

                {/* Avatar Menu */}
                <AvatarMenu />

                {/* Mobile Menu */}
                {isMobile && (
                    <>
                        <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
                            {anchorEl ? <CloseIcon /> : <MenuIcon />}
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            keepMounted
                            PaperProps={{
                                style: {
                                    width: '200px',
                                },
                            }}
                        >
                            <MenuItem onClick={handleMenuClose}>
                                <Link href="/form" passHref>
                                    <Button color="inherit" fullWidth>
                                        Generate Ad Copy
                                    </Button>
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={handleMenuClose}>
                                <Link href="/ad-copies" passHref>
                                    <Button color="inherit" fullWidth>
                                        Ad Copies
                                    </Button>
                                </Link>
                            </MenuItem>
                        </Menu>
                    </>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
