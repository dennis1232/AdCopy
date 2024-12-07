'use client'

import { Box, CircularProgress, Container } from '@mui/material'
import ProfileClient from './profileClient'
import { useSession } from 'next-auth/react'

export default function ProfilePage() {
    const { data: session, status } = useSession()
    console.log(status)

    if (status === 'loading') {
        return (
            <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        )
    }

    if (status === 'unauthenticated') {
        return <p>You need to log in to view this page.</p>
    }

    return (
        <Container>
            <ProfileClient session={session} />
        </Container>
    )
}
