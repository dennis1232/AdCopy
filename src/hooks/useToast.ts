'use client'

import { toast, ToastOptions } from 'react-hot-toast'

interface UseToastReturn {
    showSuccess: (message: string, options?: ToastOptions) => string
    showError: (message: string, options?: ToastOptions) => string
    showLoading: (message: string, options?: ToastOptions) => string
    dismissToast: (toastId?: string) => void
}

const useToast = (): UseToastReturn => {
    const showSuccess = (message: string, options?: ToastOptions): string => {
        return toast.success(message, options)
    }

    const showError = (message: string, options?: ToastOptions): string => {
        return toast.error(message, options)
    }

    const showLoading = (message: string, options?: ToastOptions): string => {
        return toast.loading(message, options)
    }

    const dismissToast = (toastId?: string) => {
        toast.dismiss(toastId)
    }

    return { showSuccess, showError, showLoading, dismissToast }
}

export default useToast
