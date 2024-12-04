// components/AdCopyPreview.tsx
'use client'

import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'
import axios from 'axios'
import { APIEndpoints, ToastMessages } from '@/utils/constants'
import useToast from '@/hooks/useToast'
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    CircularProgress,
} from '@mui/material'
import { Button } from '@/app/components'
import { Edit, Save, Delete, Send } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'

interface AdCopyPreviewProps {
    imageUrl?: string
    content: string
    onSave?: () => void
    showSaveButton?: boolean
    date?: string
    loading?: boolean
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
    onDelete?: () => void
    onEdit?: () => void
}

const channelOptions = [
    { label: 'Wedding', value: 'wedding' },
    { label: 'Tennis', value: 'tennis' },
    // Add more channels as needed
]

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
    const [selectedChannel, setSelectedChannel] = useState<string>(channelOptions[0].value)
    const { showSuccess, showError } = useToast()
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const theme = useTheme()

    const handleSend = async () => {
        setSendLoading(true)
        try {
            await axios.post(APIEndpoints.sendToTelegram, {
                imageUrl,
                message: content,
                channel: selectedChannel,
            })
            showSuccess(ToastMessages.adCopySentToTelegram)
        } catch {
            showError(ToastMessages.adCopySentToChannelFailed)
        } finally {
            setSendLoading(false)
        }
    }

    const toggleEdit = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsEdit((prev) => !prev)
        if (isEdit && onEdit) onEdit()
    }

    return (
        <>
            <Card
                sx={{
                    '&:hover': {
                        boxShadow: theme.shadows[4],
                    },
                    position: 'relative',
                }}
            >
                {/* Image */}
                {imageUrl && (
                    <CardMedia component="img" image={imageUrl} alt="Product Image" sx={{ objectFit: 'cover' }} />
                )}

                {/* Content */}
                <CardContent
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
                        <TextField
                            multiline
                            rows={6}
                            onChange={onChange}
                            value={content}
                            label="Edit Content"
                            variant="outlined"
                            fullWidth
                            name="editable-content"
                        />
                    ) : (
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: { xs: '0.9rem', sm: '1rem' },
                                color: 'text.primary',
                            }}
                        >
                            <ReactMarkdown rehypePlugins={[rehypeSanitize]}>{content}</ReactMarkdown>
                        </Typography>
                    )}
                </CardContent>

                {/* Actions */}
                <CardActions
                    sx={{
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 2,
                        padding: theme.spacing(1),
                    }}
                >
                    {/* Left Actions */}
                    {onSave && (
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={onSave}
                            startIcon={<Save />}
                            isLoading={loading}
                            sx={{ marginRight: theme.spacing(1), position: 'relative' }}
                        >
                            Save
                        </Button>
                    )}
                    {onEdit && (
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={toggleEdit}
                            isLoading={loading}
                            startIcon={isEdit ? <Save /> : <Edit />}
                            sx={{ marginRight: theme.spacing(1), position: 'relative' }}
                        >
                            {isEdit ? 'Save Edit' : 'Edit'}
                        </Button>
                    )}
                    {!onSave && onDelete && (
                        <Button
                            fullWidth
                            variant="contained"
                            color="error"
                            onClick={(e) => {
                                e.stopPropagation()
                                onDelete()
                            }}
                            isLoading={loading}
                            startIcon={<Delete />}
                            sx={{ position: 'relative' }}
                        >
                            Delete
                        </Button>
                    )}

                    <FormControl variant="outlined" size="small" sx={{ marginRight: theme.spacing(1) }}>
                        <InputLabel>Channel</InputLabel>
                        <Select
                            sx={{ width: '100%' }}
                            label="Channel"
                            value={selectedChannel}
                            onChange={(e) => setSelectedChannel(e.target.value)}
                        >
                            {channelOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Send Button */}
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={(e) => {
                            e.stopPropagation()
                            handleSend()
                        }}
                        disabled={sendLoading}
                        startIcon={<Send />}
                        sx={{ position: 'relative' }}
                    >
                        Send
                        {sendLoading && (
                            <CircularProgress
                                size={24}
                                sx={{
                                    color: theme.palette.primary.contrastText,
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-12px',
                                    marginLeft: '-12px',
                                }}
                            />
                        )}
                    </Button>
                </CardActions>
            </Card>
        </>
    )
}

export default AdCopyPreview
