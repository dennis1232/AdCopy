'use client'

import React, { useState } from 'react'
import { Box, Button, Typography, CircularProgress } from '@mui/material'
import axios from 'axios'
import AdCopyPreview from '@/app/components/AdCopyPreview'
import useToast from '@/hooks/useToast'
import { ToastMessages, APIEndpoints } from '@/utils/constants'
import { FormData } from '@/types'
import { CHANNEL_OPTIONS } from '@/lib/adTemplates'

import ScrapeModal from '@/app/components/ScrapeModal'
import FormFields from '@/app/components/FormFields'
import { SelectChangeEvent } from '@mui/material'
import { handleScraping } from '@/utils/apify'

// Add interface for the scraped data structure
interface ScrapedProduct {
    url: string
    pageTitle: string
    h1: string
    price: string
    description: string
    originalPrice: string
    discount: string
    stars: string
    numberOfOrders: string
    numberOfReviews: string
    shipmentEstimate: string
    shipmentPrice: string
    image: string
    first_h2: string
    random_text_from_the_page: string
}

const initialFormData: FormData = {
    description: '',
    image: '',
    price: '',
    stars: '',
    numberOfReviews: '',
    numberOfOrders: '',
    shipmentPrice: '',
    shipmentEstimate: '',
    discount: '',
    originalPrice: '',
    brand: '',
    affiliateLink: '',
    category: '',
}

const Form: React.FC = () => {
    const [formData, setFormData] = useState<FormData>(initialFormData)
    const [scrapeInput, setScrapeInput] = useState<string>('')
    const [generatedTemplate, setGeneratedTemplate] = useState<string>('')

    const [generatingLoading, setGeneratingLoading] = useState<boolean>(false)
    const [saveLoading, setSaveLoading] = useState<boolean>(false)
    const [scrapingLoading, setScrapingLoading] = useState<boolean>(false)
    const [scrapeModalOpen, setScrapeModalOpen] = useState<boolean>(false)

    const { showSuccess, showError } = useToast()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setGeneratingLoading(true)

        try {
            const response = await axios.post(APIEndpoints.generateAdCopy, {
                formData,
                category: formData.category,
            })
            showSuccess(ToastMessages.adCopyGenerated)
            setGeneratedTemplate(response.data.result)
        } catch (error) {
            console.error('Error:', error)
            showError(ToastMessages.adCopyGenerationFailed)
        }

        setGeneratingLoading(false)
    }

    const handleSave = async (generatedContent: string) => {
        setSaveLoading(true)
        try {
            await axios.post(APIEndpoints.saveAdCopy, {
                content: generatedContent,
                formData,
            })
            showSuccess(ToastMessages.adCopySaved)
        } catch {
            showError(ToastMessages.adCopySaveFailed)
        }
        setSaveLoading(false)
    }

    const scrapeProduct = async (e: React.FormEvent) => {
        e.preventDefault()
        setScrapingLoading(true)
        try {
            const data = await handleScraping(scrapeInput)

            // Type guard to ensure data exists and has the correct shape
            if (Array.isArray(data) && data.length > 0) {
                const scrapedData = data[0] as ScrapedProduct

                // Map scraped data to form data structure
                setFormData((prev) => ({
                    ...prev,
                    description: scrapedData.description || '',
                    image: scrapedData.image || '',
                    price: scrapedData.price?.replace(/\$(\d+\.\d+)\$\d+\.\d+/, '$1') || '', // Clean up duplicated price
                    stars: scrapedData.stars || '',
                    numberOfReviews: scrapedData.numberOfReviews || '',
                    numberOfOrders: scrapedData.numberOfOrders || '',
                    shipmentPrice: scrapedData.shipmentPrice || '',
                    shipmentEstimate: scrapedData.shipmentEstimate || '',
                    discount: scrapedData.discount?.replace(/(\d+% off)\d+% off/, '$1') || '', // Clean up duplicated discount
                    originalPrice: scrapedData.originalPrice?.replace(/\$(\d+\.\d+)\$\d+\.\d+/, '$1') || '', // Clean up duplicated price
                    affiliateLink: scrapeInput,
                    // Keep existing values for brand and category as they're not in scraped data
                    brand: prev.brand,
                    category: prev.category,
                }))
            }

            showSuccess('Product data scraped successfully.')
        } catch (err) {
            console.error(err)
            showError('Failed to scrape product data.')
        }
        setScrapingLoading(false)
        setScrapeModalOpen(false)
    }

    return (
        <Box sx={{ minHeight: '100vh', py: 4, bgcolor: 'background.default' }}>
            <ScrapeModal
                isOpen={scrapeModalOpen}
                onClose={() => setScrapeModalOpen(false)}
                onScrape={scrapeProduct}
                scrapeInput={scrapeInput}
                setScrapeInput={setScrapeInput}
                scrapingLoading={scrapingLoading}
            />

            <Box
                sx={{
                    maxWidth: 800,
                    mx: 'auto',
                    bgcolor: 'background.paper',
                    p: 4,
                    borderRadius: 1,
                    boxShadow: 2,
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => setScrapeModalOpen(true)}
                    sx={{ mb: 3 }}
                >
                    Scrape By URL
                </Button>
                <Typography variant="h4" component="h1" gutterBottom>
                    Ad Copy Generator
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <FormFields formData={formData} handleChange={handleChange} categoryOptions={CHANNEL_OPTIONS} />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        disabled={generatingLoading}
                        sx={{ mt: 3 }}
                    >
                        {generatingLoading ? <CircularProgress size={24} color="inherit" /> : 'Generate Ad Copy'}
                    </Button>
                </Box>

                {generatedTemplate && (
                    <Box sx={{ mt: 6 }}>
                        <Typography variant="h5" gutterBottom>
                            Generated Ad Copy for eilam:
                        </Typography>
                        <AdCopyPreview
                            loading={saveLoading}
                            imageUrl={formData.image}
                            content={generatedTemplate}
                            onSave={() => handleSave(generatedTemplate)}
                            showSaveButton={true}
                            date={new Date().toISOString()}
                        />
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default Form
