'use client'

import React, { useCallback, useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import AdCopyPreview from '../components/AdCopyPreview'
import useToast from '@/hooks/useToast'
import { APIEndpoints, ToastMessages } from '@/utils/constants'
import { Container, Typography, Grid, CircularProgress, Box, Button } from '@mui/material'
import AdCopyFilters from '@/app/components/AdCopyFilters'
import { IAdCopy } from '@/models/AdCopy'

interface AdCopy {
    _id: string
    content: string
    imageUrl: string
    date: string
    category: string
}

const categoryOptions = [
    { label: 'All Categories', value: '' },
    { label: 'Wedding', value: 'wedding' },
    { label: 'Tennis', value: 'tennis' },
]

const AdCopiesPage: React.FC = () => {
    const [adCopies, setAdCopies] = useState<AdCopy[]>([])
    const [loadingAdCopies, setLoadingAdCopies] = useState<boolean>(true)
    const [actionLoading, setActionLoading] = useState<{ [key: string]: boolean }>({})

    const [searchText, setSearchText] = useState<string>('')
    const [selectedCategory, setSelectedCategory] = useState<string>('')

    const { showSuccess, showError } = useToast()

    const fetchAdCopies = useCallback(async () => {
        try {
            setLoadingAdCopies(true)
            const { data } = await axios.get(APIEndpoints.fetchAdCopies)
            setAdCopies(data)
        } catch (error) {
            console.error('Error fetching ad copies:', error)
            showError(ToastMessages.fetchAdCopiesFailed)
        } finally {
            setLoadingAdCopies(false)
        }
    }, [showError])

    useEffect(() => {
        fetchAdCopies()
    }, [])

    const filteredAdCopies = useMemo(() => {
        return adCopies.filter((ad) => {
            const matchesSearch = searchText.trim()
                ? ad.content.toLowerCase().includes(searchText.trim().toLowerCase())
                : true
            const matchesCategory = selectedCategory ? ad.category === selectedCategory : true
            return matchesSearch && matchesCategory
        })
    }, [adCopies, searchText, selectedCategory])

    const handleSaveEditedCopy = async (adCopyId: string, content: IAdCopy['content']) => {
        const adCopy = adCopies.find((ad) => ad._id === adCopyId)
        if (!adCopy) {
            showError(ToastMessages.adCopyNotFound)
            return
        }

        try {
            setActionLoading((prev) => ({ ...prev, [adCopyId]: true }))
            await axios.post(APIEndpoints.saveAdCopy, { content: content || adCopy.content, adCopyId })
            setAdCopies((prev) =>
                prev.map((ad) => (ad._id === adCopyId ? { ...ad, content: content || adCopy.content } : ad))
            )
            showSuccess(ToastMessages.adCopySaved)
        } catch (error) {
            console.error('Error saving ad copy:', error)
            showError(ToastMessages.adCopySaveFailed)
        } finally {
            setActionLoading((prev) => ({ ...prev, [adCopyId]: false }))
        }
    }

    const onDeleteAdCopy = async (id: string) => {
        try {
            setActionLoading((prev) => ({ ...prev, [id]: true }))
            await axios.post(APIEndpoints.deleteAdCopy, { adCopyId: id })
            setAdCopies((prev) => prev.filter((ad) => ad._id !== id))
            showSuccess(ToastMessages.adCopyRemoved)
        } catch (error) {
            console.error('Error deleting ad copy:', error)
            showError(ToastMessages.adCopyRemovedFailed)
        } finally {
            setActionLoading((prev) => ({ ...prev, [id]: false }))
        }
    }

    const clearFilters = () => {
        setSearchText('')
        setSelectedCategory('')
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
            <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
                Your Ad Copies
            </Typography>
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
                                onEdit={(content) => handleSaveEditedCopy(adCopy._id, content)}
                                onDelete={() => onDeleteAdCopy(adCopy._id)}
                                date={adCopy.date}
                                loading={actionLoading[adCopy._id] || false}
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <EmptyState message="No ad copies found." actionHref="/form" actionLabel="Generate Ad Copy" />
            )}
        </Container>
    )
}

const EmptyState: React.FC<{ message: string; actionHref: string; actionLabel: string }> = ({
    message,
    actionHref,
    actionLabel,
}) => (
    <Box sx={{ mt: 12, textAlign: 'center' }}>
        <Typography variant="h6" color="textSecondary">
            {message}
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }} href={actionHref}>
            {actionLabel}
        </Button>
    </Box>
)

export default React.memo(AdCopiesPage)
