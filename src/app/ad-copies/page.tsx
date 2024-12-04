// pages/AdCopiesPage.tsx
'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AdCopyPreview from '../components/AdCopyPreview'
import useToast from '@/hooks/useToast'
import { APIEndpoints, ToastMessages } from '@/utils/constants'
import { Container, Typography, Grid, CircularProgress, Box, Button } from '@mui/material'
import { CategoryOption } from '@/types'
import AdCopyFilters from '@/app/components/AdCopyFilters'
interface AdCopy {
    _id: string
    content: string
    imageUrl: string
    date: string
    category: string
}

const categoryOptions: CategoryOption[] = [
    { label: 'All Categories', value: '' },
    { label: 'Wedding', value: 'wedding' },
    { label: 'Tennis', value: 'tennis' },
    // Add more categories as needed
]

const AdCopiesPage: React.FC = () => {
    const [adCopies, setAdCopies] = useState<AdCopy[]>([])
    const [filteredAdCopies, setFilteredAdCopies] = useState<AdCopy[]>([])
    const [loadingAdCopies, setIsLoadingAdCopies] = useState<boolean>(true)
    const [actionLoading, setActionLoading] = useState<{ [key: string]: boolean }>({})

    const [searchText, setSearchText] = useState<string>('')
    const [selectedCategory, setSelectedCategory] = useState<string>('')
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)

    const { showSuccess, showError } = useToast()

    const fetchAdCopies = async () => {
        try {
            setIsLoadingAdCopies(true)
            const response = await axios.get(APIEndpoints.fetchAdCopies)
            setAdCopies(response.data.adCopies)
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

    // Filter ad copies whenever filters change
    useEffect(() => {
        applyFilters()
    }, [searchText, selectedCategory, startDate, endDate, adCopies])

    const applyFilters = () => {
        if (!adCopies) return
        let filtered = adCopies

        // Filter by search text
        if (searchText.trim()) {
            const searchLower = searchText.trim().toLowerCase()
            filtered = filtered.filter((ad) => ad.content.toLowerCase().includes(searchLower))
        }

        // Filter by category
        if (selectedCategory) {
            filtered = filtered.filter((ad) => ad.category === selectedCategory)
        }

        // Filter by date range
        if (startDate) {
            filtered = filtered.filter((ad) => new Date(ad.date) >= startDate)
        }
        if (endDate) {
            filtered = filtered.filter((ad) => new Date(ad.date) <= endDate)
        }

        setFilteredAdCopies(filtered)
    }

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

    const clearFilters = () => {
        setSearchText('')
        setSelectedCategory('')
        setStartDate(null)
        setEndDate(null)
    }

    if (loadingAdCopies) {
        return (
            <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Container maxWidth="lg" sx={{ minHeight: '80vh', py: 8 }}>
            <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{ textAlign: 'center', fontSize: { xs: '1.5rem', sm: '2rem' } }}
            >
                Your Ad Copies
            </Typography>
            {/* Filter Form */}
            <AdCopyFilters
                searchText={searchText}
                setSearchText={setSearchText}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categoryOptions={categoryOptions}
                clearFilters={clearFilters}
            />
            {filteredAdCopies.length > 0 ? (
                <Grid container spacing={2}>
                    {filteredAdCopies.map((adCopy) => (
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
                <Box sx={{ mt: 12, textAlign: 'center' }}>
                    <Typography variant="h6" color="textSecondary">
                        No ad copies found.
                    </Typography>
                    <Button variant="contained" color="primary" sx={{ mt: 2 }} href="/form">
                        Generate Ad Copy
                    </Button>
                </Box>
            )}
        </Container>
    )
}

export default AdCopiesPage
