import React from 'react'
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material'
import { CategoryOption, FormData } from '@/types'

interface FormFieldsProps {
    formData: FormData
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => void
    categoryOptions: CategoryOption[]
}

const FormFields: React.FC<FormFieldsProps> = ({ formData, handleChange, categoryOptions }) => {
    return (
        <Box component="form" noValidate autoComplete="off">
            {/* Description Field */}
            <TextField
                label="Description"
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                placeholder="Enter product description"
                fullWidth
                required
                multiline
                rows={4}
                aria-required="true"
                sx={{ mb: 2 }}
            />

            {/* Category Field */}
            <FormControl fullWidth required sx={{ mb: 2 }}>
                <InputLabel>Category</InputLabel>
                <Select
                    label="Category"
                    name="category"
                    value={formData.category || ''}
                    onChange={handleChange}
                    aria-required="true"
                >
                    {categoryOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Grouped Fields: Image URL and Affiliate Link */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    mb: 2,
                }}
            >
                <TextField
                    label="Image URL"
                    name="image"
                    type="url"
                    value={formData.image || ''}
                    onChange={handleChange}
                    placeholder="Enter image URL"
                    fullWidth
                    required
                    aria-required="true"
                    sx={{ flex: '1 1 300px' }}
                />
                <TextField
                    label="Affiliate Link"
                    name="affiliateLink"
                    type="url"
                    value={formData.affiliateLink || ''}
                    onChange={handleChange}
                    placeholder="Enter affiliate link"
                    fullWidth
                    required
                    aria-required="true"
                    sx={{ flex: '1 1 300px' }}
                />
            </Box>

            {/* Price and Discount Fields */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    mb: 2,
                }}
            >
                <TextField
                    label="Price"
                    name="price"
                    type="number"
                    value={formData.price || ''}
                    onChange={handleChange}
                    placeholder="Enter price"
                    fullWidth
                    required
                    aria-required="true"
                    sx={{ flex: '1 1 200px' }}
                />
                <TextField
                    label="Original Price"
                    name="originalPrice"
                    type="number"
                    value={formData.originalPrice || ''}
                    onChange={handleChange}
                    placeholder="Enter original price"
                    fullWidth
                    sx={{ flex: '1 1 200px' }}
                />
                <TextField
                    label="Discount (%)"
                    name="discount"
                    type="number"
                    value={formData.discount || ''}
                    onChange={handleChange}
                    placeholder="Enter discount percentage"
                    fullWidth
                    sx={{ flex: '1 1 200px' }}
                />
            </Box>

            {/* Ratings and Reviews Fields */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    mb: 2,
                }}
            >
                <TextField
                    label="Stars"
                    name="stars"
                    type="number"
                    value={formData.stars || ''}
                    onChange={handleChange}
                    placeholder="Enter star rating"
                    fullWidth
                    sx={{ flex: '1 1 200px' }}
                />
                <TextField
                    label="Number of Reviews"
                    name="numberOfReviews"
                    type="number"
                    value={formData.numberOfReviews || ''}
                    onChange={handleChange}
                    placeholder="Enter number of reviews"
                    fullWidth
                    sx={{ flex: '1 1 200px' }}
                />
                <TextField
                    label="Number of Orders"
                    name="numberOfOrders"
                    type="number"
                    value={formData.numberOfOrders || ''}
                    onChange={handleChange}
                    placeholder="Enter number of orders"
                    fullWidth
                    sx={{ flex: '1 1 200px' }}
                />
            </Box>

            {/* Shipping and Brand Fields */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    mb: 2,
                }}
            >
                <TextField
                    label="Shipment Price"
                    name="shipmentPrice"
                    type="text"
                    value={formData.shipmentPrice || ''}
                    onChange={handleChange}
                    placeholder="Enter shipment price"
                    fullWidth
                    sx={{ flex: '1 1 200px' }}
                />
                <TextField
                    label="Shipment Estimate"
                    name="shipmentEstimate"
                    type="text"
                    value={formData.shipmentEstimate || ''}
                    onChange={handleChange}
                    placeholder="Enter shipment estimate"
                    fullWidth
                    sx={{ flex: '1 1 200px' }}
                />
                <TextField
                    label="Brand"
                    name="brand"
                    value={formData.brand || ''}
                    onChange={handleChange}
                    placeholder="Enter brand name"
                    fullWidth
                    required
                    aria-required="true"
                    sx={{ flex: '1 1 200px' }}
                />
            </Box>
        </Box>
    )
}

export default FormFields
