'use client'

import React from 'react'
import Link from 'next/link'
import { Box, Button, Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material'
import { styled } from '@mui/material/styles'
import { motion } from 'framer-motion'

const HeroSection = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(8, 2),
    textAlign: 'center',
}))

const FeatureSection = styled(Box)(({ theme }) => ({
    padding: theme.spacing(8, 2),
}))

const SampleAdSection = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(8, 2),
}))

const features = [
    {
        title: 'Easy to Use',
        description: 'Generate engaging ad copies with a simple and intuitive interface.',
        image: '/images/easy_to_use.webp',
    },
    {
        title: 'Customizable Templates',
        description: 'Choose from various templates tailored to your industry.',
        image: '/images/customizable_templates.webp',
    },
    {
        title: 'Save & Manage',
        description: 'Save your ad copies and manage them in one place.',
        image: '/images/save_manage.webp',
    },
]

const sampleAds = [
    {
        image: '/images/sample_ad_1.webp',
        content: 'Discover the ultimate wedding accessory to make your special day unforgettable!',
    },
    {
        image: '/images/sample_ad_2.webp',
        content: 'Enhance your tennis game with our top-of-the-line equipment!',
    },
    {
        image: '/images/sample_ad_3.webp',
        content: 'Experience luxury and comfort with our premium brand offerings.',
    },
]

export default function HomePage() {
    return (
        <>
            {/* Hero Section */}
            <HeroSection>
                <Container maxWidth="md">
                    <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Welcome to Ad Copy Generator
                    </Typography>
                    <Typography variant="h5" component="p" gutterBottom>
                        Create engaging ad copies effortlessly.
                    </Typography>
                    <Box sx={{ mt: 4 }}>
                        <Link href="/form" passHref>
                            <Button variant="contained" color="primary" size="large" sx={{ mr: 2 }}>
                                Generate Ad Copy
                            </Button>
                        </Link>
                        <Link href="/ad-copies" passHref>
                            <Button variant="contained" color="primary" size="large">
                                View Ad Copies
                            </Button>
                        </Link>
                    </Box>
                </Container>
            </HeroSection>

            {/* Feature Section */}
            <FeatureSection>
                <Container maxWidth="lg">
                    <Typography variant="h4" component="h2" align="center" gutterBottom>
                        How It Works
                    </Typography>
                    <Typography variant="subtitle1" align="center" gutterBottom>
                        Generate professional ad copies in just a few steps.
                    </Typography>
                    <Grid container spacing={4} sx={{ mt: 4 }}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} sm={4} key={index}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.2 }}
                                    >
                                        <img src={feature.image} alt={feature.title} style={{ width: 'object-fit' }} />
                                        <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
                                            {feature.title}
                                        </Typography>
                                        <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
                                            {feature.description}
                                        </Typography>
                                    </motion.div>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </FeatureSection>

            {/* Sample Ad Copies Section */}
            <SampleAdSection>
                <Container maxWidth="lg">
                    <Typography variant="h4" component="h2" align="center" gutterBottom>
                        Sample Ad Copies
                    </Typography>
                    <Typography variant="subtitle1" align="center" gutterBottom>
                        See what you can create with our generator.
                    </Typography>
                    <Grid container spacing={4} sx={{ mt: 4 }}>
                        {sampleAds.map((ad, index) => (
                            <Grid item xs={12} sm={4} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                >
                                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <CardMedia
                                            component="img"
                                            image={ad.image}
                                            alt="Sample Ad"
                                            sx={{ height: 200, objectFit: 'cover' }}
                                        />
                                        <CardContent>
                                            <Typography variant="body1">{ad.content}</Typography>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </SampleAdSection>

            {/* Call to Action */}
            <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', py: 6, textAlign: 'center' }}>
                <Container maxWidth="md">
                    <Typography variant="h4" component="h2" gutterBottom>
                        Ready to Create Your Ad Copy?
                    </Typography>
                    <Link href="/form" passHref>
                        <Button variant="contained" color="secondary" size="large">
                            Get Started
                        </Button>
                    </Link>
                </Container>
            </Box>
        </>
    )
}
