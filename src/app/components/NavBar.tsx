// components/Navbar.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, useTheme, useMediaQuery } from '@mui/material'
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material'
// import AvatarMenu from './AvatarMenu'

const Navbar: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
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

                {/* Desktop Menu */}
                {!isMobile && (
                    <>
                        <Link href="/form" passHref>
                            <Button color="inherit">Generate Ad Copy</Button>
                        </Link>
                        <Link href="/ad-copies" passHref>
                            <Button color="inherit">Ad Copies</Button>
                        </Link>
                        {/* Additional Links */}
                        {/* <AvatarMenu /> */}
                    </>
                )}

                {/* Mobile Menu Button */}
                {isMobile && (
                    <>
                        <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleMenu}>
                            {anchorEl ? <CloseIcon /> : <MenuIcon />}
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            keepMounted
                            PaperProps={{
                                style: {
                                    width: '200px',
                                },
                            }}
                        >
                            <MenuItem onClick={handleClose}>
                                <Link href="/form" passHref>
                                    <Button color="inherit" fullWidth>
                                        Generate Ad Copy
                                    </Button>
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <Link href="/ad-copies" passHref>
                                    <Button color="inherit" fullWidth>
                                        Ad Copies
                                    </Button>
                                </Link>
                            </MenuItem>
                            {/* Additional Links */}
                            {/* <AvatarMenu mobile toggleNav={handleClose} /> */}
                        </Menu>
                    </>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
