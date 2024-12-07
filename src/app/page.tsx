'use client'

import React from 'react'
import Link from 'next/link'
import { Box, Button, Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material'
import { styled } from '@mui/material/styles'
import { motion } from 'framer-motion'

const HeroSection = styled(Box)(({ theme }) => ({
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.light})`,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(12, 2),
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
}))

const FeatureSection = styled(Box)(({ theme }) => ({
    padding: theme.spacing(8, 2),
    backgroundColor: theme.palette.background.default,
}))

const SampleAdSection = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 2),
    color: theme.palette.text.primary,
}))

const features = [
    {
        title: 'Easy to Use',
        description: 'Generate engaging ad copies effortlessly with a user-friendly interface.',
        image: '/images/easy_to_use.webp',
    },
    {
        title: 'Customizable Templates',
        description: 'Access templates tailored to your business needs.',
        image: '/images/customizable_templates.webp',
    },
    {
        title: 'Save & Manage',
        description: 'Save and organize your ad copies in a centralized dashboard.',
        image: '/images/save_manage.webp',
    },
]

const sampleAds = [
    {
        image: '/images/sample_ad_1.webp',
        content: '✨ Discover the ultimate wedding accessory for your special day!',
    },
    {
        image: '/images/sample_ad_2.webp',
        content: '🎾 Boost your game with premium tennis equipment!',
    },
    {
        image: '/images/sample_ad_3.webp',
        content: '🌟 Elevate your lifestyle with our premium brand offerings.',
    },
]

export default function HomePage() {
    return (
        <>
            {/* Hero Section */}
            <HeroSection>
                <Container maxWidth="md">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <Typography
                            variant="h2"
                            component="h1"
                            gutterBottom
                            sx={{
                                fontWeight: 700,
                                fontSize: { xs: '2rem', sm: '3rem' },
                                fontFamily: 'Inter, sans-serif',
                            }}
                        >
                            Welcome to Ad Copy Generator
                        </Typography>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5 }}
                    >
                        <Typography
                            variant="body1"
                            component="p"
                            gutterBottom
                            sx={{
                                fontSize: { xs: '1rem', sm: '1.25rem' },
                                color: (theme) => theme.palette.text.primary,
                            }}
                        >
                            Simplify your ad creation process with powerful tools and templates.
                        </Typography>
                    </motion.div>
                    <Box sx={{ mt: 4 }}>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link href="/form" passHref>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    sx={{
                                        mr: 2,
                                        px: 4,
                                        fontSize: '1rem',
                                        borderRadius: '8px',
                                    }}
                                >
                                    Get Started
                                </Button>
                            </Link>
                        </motion.div>
                    </Box>
                </Container>
            </HeroSection>

            {/* Feature Section */}
            <FeatureSection>
                <Container maxWidth="lg">
                    <Typography
                        variant="h4"
                        component="h2"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: 600, fontFamily: 'Inter, sans-serif' }}
                    >
                        How It Works
                    </Typography>
                    <Grid container spacing={4} sx={{ mt: 4 }}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                >
                                    <Card
                                        sx={{
                                            backgroundColor: (theme) => theme.palette.background.paper,
                                            borderRadius: '12px',
                                            overflow: 'hidden',
                                            boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            image={feature.image}
                                            alt={feature.title}
                                            sx={{ height: 150, objectFit: 'cover' }}
                                        />
                                        <CardContent>
                                            <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                                                {feature.title}
                                            </Typography>
                                            <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                                                {feature.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </FeatureSection>

            {/* Sample Ad Copies Section */}
            <SampleAdSection>
                <Container maxWidth="lg">
                    <Typography
                        variant="h4"
                        component="h2"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: 600, fontFamily: 'Inter, sans-serif' }}
                    >
                        Sample Ad Copies
                    </Typography>
                    <Grid container spacing={4} sx={{ mt: 4 }}>
                        {sampleAds.map((ad, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                >
                                    <Card
                                        sx={{
                                            backgroundColor: (theme) => theme.palette.background.paper,
                                            borderRadius: '12px',
                                            overflow: 'hidden',
                                            boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            image={ad.image}
                                            alt={ad.content}
                                            sx={{ height: 150, objectFit: 'cover' }}
                                        />
                                        <CardContent>
                                            <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary' }}>
                                                {ad.content}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </SampleAdSection>
        </>
    )
}
