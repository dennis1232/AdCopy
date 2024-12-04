// app/components/Form.tsx
'use client'

import React, { useState } from 'react'
import {
    Box,
    Button,
    TextField,
    Typography,
    Grid,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    CircularProgress,
    Modal,
    SelectChangeEvent,
} from '@mui/material'
import axios from 'axios'
import AdCopyPreview from '@/app/components/AdCopyPreview'
import useToast from '@/hooks/useToast'
import { ToastMessages, APIEndpoints } from '@/utils/constants'
import { CategoryOption, FormData } from '@/types'

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

const categoryOptions: CategoryOption[] = [
    { label: 'Wedding', value: 'wedding' },
    { label: 'Tennis', value: 'tennis' },
]

const Form: React.FC = () => {
    const [formData, setFormData] = useState<FormData>(initialFormData)
    const [scrapeInput, setScrapeInput] = useState<string>('')
    const [generatedTemplate, setGeneratedTemplate] = useState<string>('')
    const [generatingLoading, setGeneratingLoading] = useState<boolean>(false)
    const [saveLoading, setSaveLoading] = useState<boolean>(false)
    const [scrapingLoading, setScrapingLoading] = useState<boolean>(false)
    const [scrapeModalOpen, setScrapeModalOpen] = useState<boolean>(false)

    const { showSuccess, showError } = useToast()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleCategoryChange = (e: SelectChangeEvent<string>) => {
        setFormData((prev) => ({
            ...prev,
            category: e.target.value as string,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.category) {
            showError('Please select a category.')
            return
        }

        setGeneratingLoading(true)

        try {
            const response = await axios.post(APIEndpoints.generateAdCopy, {
                formData,
                channel: formData.category,
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
                imageUrl: formData.image,
                category: formData.category,
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
            const res = await axios.post('/api/scrape', {
                productUrl: scrapeInput,
            })
            setFormData({ ...formData, ...res.data, affiliateLink: scrapeInput })

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
            {/* Scrape Modal */}
            <Modal open={scrapeModalOpen} onClose={() => setScrapeModalOpen(false)}>
                <Box
                    component="form"
                    onSubmit={scrapeProduct}
                    sx={{
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        mx: 'auto',
                        my: 'auto',
                        maxWidth: 400,
                        borderRadius: 1,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Scrape Data by URL
                    </Typography>
                    <TextField
                        label="Product URL"
                        name="scrapeUrl"
                        value={scrapeInput}
                        onChange={(e) => setScrapeInput(e.target.value)}
                        placeholder="Enter product URL"
                        fullWidth
                        required
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        disabled={scrapingLoading}
                        sx={{ mt: 2 }}
                    >
                        {scrapingLoading ? <CircularProgress size={24} color="inherit" /> : 'Scrape'}
                    </Button>
                </Box>
            </Modal>

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
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter product description"
                                fullWidth
                                required
                                multiline
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    label="Category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleCategoryChange}
                                >
                                    {categoryOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* Rest of the input fields */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Image URL"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="Enter image URL"
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Affiliate Link"
                                name="affiliateLink"
                                value={formData.affiliateLink}
                                onChange={handleChange}
                                placeholder="Enter affiliate link"
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Enter price"
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Original Price"
                                name="originalPrice"
                                value={formData.originalPrice}
                                onChange={handleChange}
                                placeholder="Enter original price"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Discount"
                                name="discount"
                                value={formData.discount}
                                onChange={handleChange}
                                placeholder="Enter discount percentage"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Stars"
                                name="stars"
                                value={formData.stars}
                                onChange={handleChange}
                                placeholder="Enter star rating"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Number of Reviews"
                                name="numberOfReviews"
                                value={formData.numberOfReviews}
                                onChange={handleChange}
                                placeholder="Enter number of reviews"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Number of Orders"
                                name="numberOfOrders"
                                onChange={handleChange}
                                value={formData.numberOfOrders}
                                placeholder="Enter number of orders"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Shipment Price"
                                name="shipmentPrice"
                                value={formData.shipmentPrice}
                                onChange={handleChange}
                                placeholder="Enter shipment price"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Shipment Estimate"
                                name="shipmentEstimate"
                                value={formData.shipmentEstimate}
                                onChange={handleChange}
                                placeholder="Enter shipment estimate"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Brand"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                placeholder="Enter brand name"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
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
