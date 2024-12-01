// components/Modal.tsx
'use client'

import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import Button from './Button'
import { FaTimes } from 'react-icons/fa'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: React.ReactNode
    footer?: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                onClose()
            }
        }
        window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [isOpen, onClose])

    if (!isOpen) return null

    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            aria-modal="true"
            role="dialog"
        >
            <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-lg w-full">
                <Button onClick={onClose}>
                    <FaTimes size={24} />
                </Button>
                {title && (
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium">{title}</h3>
                    </div>
                )}
                <div className="px-6 py-4">{children}</div>
                {footer && <div className="px-6 py-4 border-t border-gray-200">{footer}</div>}
            </div>
        </div>,
        document.body
    )
}

export default Modal
