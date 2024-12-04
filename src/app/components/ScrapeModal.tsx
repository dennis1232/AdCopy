// components/ScrapeModal.tsx
import React from 'react'
import { Modal, Box, Typography, TextField, Button, CircularProgress } from '@mui/material'

interface ScrapeModalProps {
    isOpen: boolean
    onClose: () => void
    onScrape: (e: React.FormEvent) => void
    scrapeInput: string
    setScrapeInput: React.Dispatch<React.SetStateAction<string>>
    scrapingLoading: boolean
}

const ScrapeModal: React.FC<ScrapeModalProps> = ({
    isOpen,
    onClose,
    onScrape,
    scrapeInput,
    setScrapeInput,
    scrapingLoading,
}) => {
    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box
                component="form"
                onSubmit={onScrape}
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
    )
}

export default ScrapeModal
