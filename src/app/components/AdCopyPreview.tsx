// components/AdCopyPreview.tsx
'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'
import axios from 'axios'
import Button from './Button'
import { APIEndpoints, ToastMessages } from '@/utils/constants'
import useToast from '@/hooks/useToast'
import TextAreaField from './TextAreaField'
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions as MuiDialogActions,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

interface AdCopyPreviewProps {
    imageUrl?: string
    content: string
    onSave?: () => void
    showSaveButton?: boolean
    date?: string
    loading?: boolean
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    onDelete?: () => void
    onEdit?: () => void
}

const AdCopyPreview: React.FC<AdCopyPreviewProps> = ({
    imageUrl,
    content,
    date,
    onSave,
    onEdit,
    onChange,
    onDelete,
    loading = false,
}) => {
    const [sendLoading, setSendLoading] = useState<boolean>(false)
    const { showSuccess, showError } = useToast()
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const theme = useTheme()
    // const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const onSend = async () => {
        setSendLoading(true)
        try {
            await axios.post(APIEndpoints.sendToTelegram, { imageUrl, message: content, channel: 'wedding' })
            showSuccess(ToastMessages.adCopySentToTelegram)
        } catch {
            showError(ToastMessages.adCopySentToChannelFailed)
        }
        setSendLoading(false)
    }

    return (
        <>
            <Card
                className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6 cursor-pointer"
                // onClick={() => setIsModalOpen(true)}
                sx={{
                    '&:hover': {
                        boxShadow: theme.shadows[4],
                    },
                }}
            >
                {imageUrl && (
                    <CardMedia
                        component="img"
                        image={imageUrl}
                        alt="Product Image"
                        sx={{
                            height: { xs: 200, sm: 250, md: 300 },
                            objectFit: 'cover',
                        }}
                    />
                )}
                <CardContent
                    className="text-right"
                    dir="rtl"
                    sx={{
                        paddingTop: theme.spacing(2),
                        paddingBottom: theme.spacing(2),
                    }}
                >
                    {date && (
                        <Typography
                            variant="caption"
                            color="textSecondary"
                            sx={{ display: 'block', marginBottom: theme.spacing(1) }}
                        >
                            נוצר בתאריך: {new Date(date).toLocaleString('he-IL')}
                        </Typography>
                    )}
                    {onChange && isEdit ? (
                        <TextAreaField
                            rows={6}
                            onChange={onChange}
                            value={content}
                            label="Edit Content"
                            name="editable-content"
                        />
                    ) : (
                        <Typography
                            variant="body1"
                            component="div"
                            sx={{
                                fontSize: { xs: '0.9rem', sm: '1rem' },
                                color: 'text.primary',
                            }}
                        >
                            <ReactMarkdown rehypePlugins={[rehypeSanitize]}>{content}</ReactMarkdown>
                        </Typography>
                    )}
                </CardContent>
                <CardActions
                    sx={{
                        justifyContent: 'space-between',
                    }}
                >
                    {onSave && (
                        <Button variant="outlined" onClick={onSave} isLoading={loading}>
                            Save
                        </Button>
                    )}
                    {onEdit && (
                        <Button
                            variant="outlined"
                            onClick={(e) => {
                                e.stopPropagation()
                                setIsEdit(!isEdit)
                                if (isEdit && onEdit) onEdit()
                            }}
                            isLoading={loading}
                        >
                            {isEdit ? 'Save Edit' : 'Edit'}
                        </Button>
                    )}
                    <Button
                        onClick={(e) => {
                            e.stopPropagation()
                            onSend()
                        }}
                        isLoading={sendLoading}
                    >
                        Send to Channel
                    </Button>
                    {!onSave && onDelete && (
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: 'red' }}
                            onClick={(e) => {
                                e.stopPropagation()
                                onDelete()
                            }}
                            isLoading={loading}
                        >
                            Delete
                        </Button>
                    )}
                </CardActions>
            </Card>

            {/* Detailed Preview Modal */}
            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} fullWidth maxWidth="md">
                <DialogTitle>Ad Copy Details</DialogTitle>
                <DialogContent dividers>
                    {imageUrl && (
                        <Image
                            src={imageUrl}
                            alt="Product Image"
                            width={500}
                            height={500}
                            className="object-cover rounded-lg mb-4 w-full"
                        />
                    )}
                    <Typography
                        variant="body1"
                        component="div"
                        sx={{
                            fontSize: { xs: '0.9rem', sm: '1rem', direction: 'rtl' },
                            color: 'text.primary',
                        }}
                    >
                        <ReactMarkdown rehypePlugins={[rehypeSanitize]}>{content}</ReactMarkdown>
                    </Typography>
                    {date && (
                        <Typography variant="caption" color="textSecondary" sx={{ marginTop: theme.spacing(2) }}>
                            נוצר בתאריך: {new Date(date).toLocaleString('he-IL')}
                        </Typography>
                    )}
                </DialogContent>
                <MuiDialogActions>
                    <Button onClick={() => setIsModalOpen(false)}>Close</Button>
                </MuiDialogActions>
            </Dialog>
        </>
    )
}

export default AdCopyPreview
