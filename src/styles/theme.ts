// src/theme.ts
import { createTheme } from '@mui/material/styles'

// Define your custom colors
const theme = createTheme({
    palette: {
        primary: {
            main: '#1d4ed8', // Blue-700
            light: '#3b82f6', // Blue-500
            dark: '#1e40af', // Blue-800
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#6b7280', // Gray-500
            light: '#9ca3af', // Gray-400
            dark: '#4b5563', // Gray-600
            contrastText: '#ffffff',
        },
        error: {
            main: '#dc2626', // Red-600
            light: '#ef4444', // Red-500
            dark: '#b91c1c', // Red-700
            contrastText: '#ffffff',
        },
        warning: {
            main: '#f59e0b', // Amber-500
            contrastText: '#ffffff',
        },
        info: {
            main: '#3b82f6', // Blue-500
            contrastText: '#ffffff',
        },
        success: {
            main: '#10b981', // Green-500
            contrastText: '#ffffff',
        },
        background: {
            default: '#f9fafb', // Gray-50
        },
        text: {
            primary: '#111827', // Gray-900
            secondary: '#6b7280', // Gray-500
        },
    },
    typography: {
        fontFamily: ['"Inter"', 'Roboto', 'Arial', 'sans-serif'].join(','),
        h1: {
            fontSize: '2.25rem', // Tailwind's text-4xl
            fontWeight: 700,
        },
        h2: {
            fontSize: '1.875rem', // Tailwind's text-3xl
            fontWeight: 700,
        },
        h3: {
            fontSize: '1.5rem', // Tailwind's text-2xl
            fontWeight: 600,
        },
        h4: {
            fontSize: '1.25rem', // Tailwind's text-xl
            fontWeight: 600,
        },
        h5: {
            fontSize: '1.125rem', // Tailwind's text-lg
            fontWeight: 500,
        },
        h6: {
            fontSize: '1rem', // Tailwind's text-base
            fontWeight: 500,
        },
        body1: {
            fontSize: '1rem', // Tailwind's text-base
        },
        body2: {
            fontSize: '0.875rem', // Tailwind's text-sm
        },
        button: {
            textTransform: 'none', // Disable uppercase transformation
            fontWeight: 500,
        },
    },
    components: {
        // Customize specific components if needed
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '0.375rem', // Tailwind's rounded-md
                    // Add other custom styles here
                },
            },
        },
    },
})

export default theme
