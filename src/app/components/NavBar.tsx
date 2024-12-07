'use client'

import React from 'react'
import Link from 'next/link'
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Menu,
    MenuItem,
    useTheme,
    useMediaQuery,
    Box,
} from '@mui/material'
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material'

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
        <AppBar
            position="sticky"
            color="inherit"
            elevation={1}
            sx={{
                bgcolor: theme.palette.background.paper,
                borderBottom: `1px solid ${theme.palette.divider}`,
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', paddingX: theme.spacing(2) }}>
                {/* Logo */}
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        flexGrow: 1,
                        fontWeight: 700,
                        fontSize: '1.5rem',
                        fontFamily: 'Inter, sans-serif',
                        color: theme.palette.primary.main,
                    }}
                >
                    <Link href="/" passHref>
                        <Button color="inherit" sx={{ textTransform: 'none', fontSize: 'inherit', p: 0 }}>
                            AdCopyGen
                        </Button>
                    </Link>
                </Typography>

                {/* Desktop Menu */}
                {!isMobile && (
                    <Box sx={{ display: 'flex', gap: theme.spacing(2) }}>
                        <Link href="/form" passHref>
                            <Button color="primary" variant="text" sx={{ textTransform: 'none' }}>
                                Generate Ad Copy
                            </Button>
                        </Link>
                        <Link href="/ad-copies" passHref>
                            <Button color="primary" variant="text" sx={{ textTransform: 'none' }}>
                                Ad Copies
                            </Button>
                        </Link>
                    </Box>
                )}

                {/* Mobile Menu */}
                {isMobile && (
                    <>
                        <IconButton edge="end" color="primary" aria-label="menu" onClick={handleMenu} sx={{ ml: 2 }}>
                            {anchorEl ? <CloseIcon /> : <MenuIcon />}
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            PaperProps={{
                                sx: {
                                    bgcolor: theme.palette.background.paper,
                                    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
                                    borderRadius: '8px',
                                },
                            }}
                        >
                            <MenuItem onClick={handleClose}>
                                <Link href="/form" passHref>
                                    <Button
                                        fullWidth
                                        sx={{
                                            textTransform: 'none',
                                            justifyContent: 'flex-start',
                                            color: theme.palette.text.primary,
                                        }}
                                    >
                                        Generate Ad Copy
                                    </Button>
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <Link href="/ad-copies" passHref>
                                    <Button
                                        fullWidth
                                        sx={{
                                            textTransform: 'none',
                                            justifyContent: 'flex-start',
                                            color: theme.palette.text.primary,
                                        }}
                                    >
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
