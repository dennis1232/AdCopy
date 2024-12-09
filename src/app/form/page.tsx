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
            // const res = await axios.post(APIEndpoints.scrape, {
            //     productUrl: scrapeInput,
            // })
            const res = await handleScraping(scrapeInput)
            console.log(res)

            // setFormData({ ...formData, ...res.data, affiliateLink: scrapeInput })

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
                            Generated Ad Copy:
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
