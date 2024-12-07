// theme.ts
import { createTheme, ThemeOptions } from '@mui/material/styles'

const themeOptions: ThemeOptions = {
    palette: {
        primary: {
            main: '#0D47A1', // Dark Blue
            light: '#5472D3',
            dark: '#002171',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#29B6F6', // Light Blue
            light: '#73E8FF',
            dark: '#0086C3',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#F5F7FA', // Light Gray Background
            paper: '#FFFFFF', // White Cards
        },
        text: {
            primary: '#2C3E50', // Dark Text
            secondary: '#7F8C8D', // Muted Text
        },
        error: {
            main: '#E74C3C', // Error Red
        },
        success: {
            main: '#2ECC71', // Success Green
        },
        warning: {
            main: '#F39C12', // Warning Orange
        },
    },
    typography: {
        fontFamily: "'Inter', sans-serif", // Modern SaaS Font
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            lineHeight: 1.2,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
            lineHeight: 1.3,
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 500,
            lineHeight: 1.4,
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 500,
            lineHeight: 1.5,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.6,
        },
        button: {
            textTransform: 'none', // Keep buttons professional
            fontWeight: 600,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px', // Slightly rounded buttons
                    padding: '0.5rem 1.5rem',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '12px', // Softer card edges
                    boxShadow: '0px 2px 10px rgba(0,0,0,0.1)', // Subtle shadow
                },
            },
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    padding: '24px', // Consistent container spacing
                },
            },
        },
    },
    shape: {
        borderRadius: 8,
    },
    spacing: 8,
}

const theme = createTheme(themeOptions)
export default theme
