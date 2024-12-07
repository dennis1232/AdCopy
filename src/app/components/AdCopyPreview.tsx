'use client'

import React, { useState, useCallback } from 'react'
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
    Stack,
} from '@mui/material'
import { Button } from '@/app/components'
import { Edit, Save, Delete, Send } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import { IAdCopy } from '@/models/AdCopy'

interface AdCopyPreviewProps {
    imageUrl?: string
    content: string
    onSave?: () => void
    showSaveButton?: boolean
    date?: string
    loading?: boolean
    onDelete?: () => void
    onEdit?: (content: IAdCopy['content']) => void
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
    onDelete,
    loading = false,
}) => {
    const [sendLoading, setSendLoading] = useState<boolean>(false)
    const [selectedChannel, setSelectedChannel] = useState<string>(channelOptions[0].value)
    const { showSuccess, showError } = useToast()
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [editedAdCopy, setEditedAdCopy] = useState<IAdCopy['content']>('')
    const theme = useTheme()

    const handleSend = useCallback(async () => {
        setSendLoading(true)
        try {
            await axios.post(APIEndpoints.sendToTelegram, {
                imageUrl,
                message: content,
                channel: selectedChannel,
            })
            showSuccess(ToastMessages.adCopySentToTelegram)
        } catch (error) {
            showError(ToastMessages.adCopySentToChannelFailed)
            console.error('Send to Telegram failed:', error) // Optional detailed error logging
        } finally {
            setSendLoading(false)
        }
    }, [imageUrl, content, selectedChannel, showSuccess, showError])

    const toggleEdit = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation()
            if (isEdit && onEdit) {
                onEdit(editedAdCopy)
                setEditedAdCopy('')
            }
            setIsEdit((prev) => !prev)
        },
        [isEdit, onEdit, editedAdCopy]
    )

    const editButtonText = isEdit ? 'Save Edit' : 'Edit'

    return (
        <Card
            sx={{
                '&:hover': { boxShadow: theme.shadows[4] },
                position: 'relative',
            }}
        >
            {imageUrl && <CardMedia component="img" image={imageUrl} alt="Product Image" sx={{ objectFit: 'cover' }} />}

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
                {isEdit ? (
                    <TextField
                        multiline
                        rows={6}
                        onChange={(e) => setEditedAdCopy(e.target.value)}
                        value={editedAdCopy || content}
                        label="Edit Content"
                        variant="outlined"
                        fullWidth
                        name="editable-content"
                        aria-label="Edit ad copy content"
                    />
                ) : (
                    <ReactMarkdown rehypePlugins={[rehypeSanitize]}>{content}</ReactMarkdown>
                )}
            </CardContent>

            <CardActions
                sx={{
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 2,
                    padding: theme.spacing(1),
                }}
            >
                {onSave && (
                    <Button fullWidth variant="outlined" onClick={onSave} startIcon={<Save />} isLoading={loading}>
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
                    >
                        {editButtonText}
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
                    >
                        Delete
                    </Button>
                )}
                <Stack direction={'row'} flex={1} gap={1}>
                    <FormControl variant="outlined" size="small" fullWidth>
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

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={(e) => {
                            e.stopPropagation()
                            handleSend()
                        }}
                        isLoading={sendLoading}
                        startIcon={<Send />}
                    >
                        Send
                    </Button>
                </Stack>
            </CardActions>
        </Card>
    )
}

export default AdCopyPreview
