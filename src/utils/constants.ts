// utils/constants.ts

// Enums for Ad Categories
export enum AdCategories {
    Electronics = 'Electronics',
    Fashion = 'Fashion',
    HomeAppliances = 'Home Appliances',
    Books = 'Books',
    Sports = 'Sports',
    // Add more categories as needed
}

// Enums for Ad Types
export enum AdTypes {
    Discount = 'Discount',
    NewArrival = 'New Arrival',
    LimitedOffer = 'Limited Offer',
    BestSeller = 'Best Seller',
    Clearance = 'Clearance',
    // Add more types as needed
}

// Constants for Toast Messages
export const ToastMessages = {
    loginSuccess: 'Logged in successfully! Welcome back.',
    loginFailure: 'Login failed. Please check your email and password.',
    registrationSuccess: 'Account created successfully! Please log in.',
    registrationFailure: 'Registration failed. Email may already be in use.',
    adCopyGenerated: 'Ad copy generated successfully!',
    adCopyGenerationFailed: 'Failed to generate ad copy. Please try again.',
    adCopySaved: 'Ad copy saved successfully!',
    adCopySaveFailed: 'Failed to save ad copy. Please try again.',
    adCopySentToTelegram: 'Ad copy sent to the channel',
    adCopySentToChannelFailed: 'Failed to send Ad copy to the channel',
    adCopyRemoved: 'Ad copy deleted',
    adCopyRemovedFailed: 'Failed to delete Ad copy',
    fetchAdCopiesFailed: 'Failed to fetch ad copies',
    adCopyNotFound: 'Ad copy not found',
    // Add more messages as needed
}

// Constants for API Endpoints
export const APIEndpoints = {
    generateAdCopy: '/api/generateAdCopy',
    saveAdCopy: '/api/saveAdCopy',
    sendToTelegram: '/api/sendToTelegram',
    fetchAdCopies: '/api/adCopies',
    manageChannels: '/api/channels',
    deleteAdCopy: '/api/deleteAdCopy',
    scrapeProduct: '/api/scrapeProduct',
    // Add more endpoints as needed
}

// Enums for Toast Types
export enum ToastType {
    Success = 'success',
    Error = 'error',
    Loading = 'loading',
    Info = 'info',
}
