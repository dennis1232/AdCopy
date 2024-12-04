// pages/AdCopiesPage.tsx
'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AdCopyPreview from '../components/AdCopyPreview'
import useToast from '@/hooks/useToast'
import { APIEndpoints, ToastMessages } from '@/utils/constants'
import { Container, Typography, Grid, CircularProgress, Box } from '@mui/material'
// import { useTheme } from '@mui/material/styles'

interface AdCopy {
    _id: string
    content: string
    imageUrl: string
    date: string
}

const AdCopiesPage: React.FC = () => {
    const [adCopies, setAdCopies] = useState<AdCopy[]>([])
    const [loadingAdCopies, setIsLoadingAdCopies] = useState<boolean>(true)
    const [actionLoading, setActionLoading] = useState<{ [key: string]: boolean }>({})

    const { showSuccess, showError } = useToast()
    // const theme = useTheme()
    // const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const fetchAdCopies = async () => {
        try {
            setIsLoadingAdCopies(true)
            const response = await axios.get(APIEndpoints.fetchAdCopies)
            setAdCopies(response.data)
            setIsLoadingAdCopies(false)
        } catch (error) {
            console.error('Error fetching ad copies:', error)
            showError(ToastMessages.fetchAdCopiesFailed)
            setIsLoadingAdCopies(false)
        }
    }

    useEffect(() => {
        fetchAdCopies()
    }, [])

    const updateAdCopyContent = (e: React.ChangeEvent<HTMLTextAreaElement>, adCopyId: string) => {
        const newContent = e.target.value
        setAdCopies((prevAdCopies) =>
            prevAdCopies.map((ad) => (ad._id === adCopyId ? { ...ad, content: newContent } : ad))
        )
    }

    const handleSaveEditedCopy = async (adCopyId: string) => {
        const adCopy = adCopies.find((ad) => ad._id === adCopyId)
        if (!adCopy) {
            showError(ToastMessages.adCopyNotFound)
            return
        }

        try {
            setActionLoading((prev) => ({ ...prev, [adCopyId]: true }))
            await axios.post(APIEndpoints.saveAdCopy, {
                ...adCopy,
            })

            showSuccess(ToastMessages.adCopySaved)
            setActionLoading((prev) => ({ ...prev, [adCopyId]: false }))
        } catch (error) {
            console.error('Error saving ad copy:', error)
            showError(ToastMessages.adCopySaveFailed)
            setActionLoading((prev) => ({ ...prev, [adCopyId]: false }))
        }
    }

    const onDeleteAdCopy = async (id: string) => {
        try {
            setActionLoading((prev) => ({ ...prev, [id]: true }))
            await axios.post(APIEndpoints.deleteAdCopy, { adCopyId: id })
            setAdCopies((prevAdCopies) => prevAdCopies.filter((ad) => ad._id !== id))
            showSuccess(ToastMessages.adCopyRemoved)
            setActionLoading((prev) => ({ ...prev, [id]: false }))
        } catch (error) {
            console.error('Error deleting ad copy:', error)
            showError(ToastMessages.adCopyRemovedFailed)
            setActionLoading((prev) => ({ ...prev, [id]: false }))
        }
    }

    if (loadingAdCopies) {
        return (
            <Box className="min-h-screen flex items-center justify-center">
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Container maxWidth="lg" className="min-h-screen bg-gray-50 py-8">
            <Typography
                variant="h4"
                component="h1"
                gutterBottom
                className="text-center"
                sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
            >
                Your Ad Copies
            </Typography>
            {adCopies.length > 0 ? (
                <Grid container spacing={4}>
                    {adCopies.map((adCopy) => (
                        <Grid item xs={12} sm={6} md={4} key={adCopy._id}>
                            <AdCopyPreview
                                imageUrl={adCopy.imageUrl}
                                content={adCopy.content}
                                onEdit={() => handleSaveEditedCopy(adCopy._id)}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                    updateAdCopyContent(e, adCopy._id)
                                }
                                onDelete={() => onDeleteAdCopy(adCopy._id)}
                                date={adCopy.date}
                                loading={actionLoading[adCopy._id] || false}
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Box className="mt-12 text-center">
                    <Typography variant="h6" color="textSecondary">
                        You have not generated any ad copies yet.
                    </Typography>
                </Box>
            )}
        </Container>
    )
}

export default AdCopiesPage
