import React from 'react'
import {
    Box,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Button,
    InputAdornment,
    IconButton,
    Stack,
} from '@mui/material'
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material'
import { CategoryOption } from '@/types'

interface AdCopyFiltersProps {
    searchText: string
    setSearchText: (value: string) => void
    selectedCategory: string
    setSelectedCategory: (value: string) => void
    categoryOptions: CategoryOption[]
    clearFilters: () => void
}

const AdCopyFilters: React.FC<AdCopyFiltersProps> = ({
    searchText,
    setSearchText,
    selectedCategory,
    setSelectedCategory,
    categoryOptions,
    clearFilters,
}) => {
    return (
        <Box
            sx={{
                mb: 4,
                p: 2,
                bgcolor: 'background.paper',
                borderRadius: 1,
                boxShadow: 1,
            }}
        >
            <Stack
                direction={{ xs: 'column', sm: 'row' }} // Column for small screens, row for larger screens
                spacing={2}
                alignItems="center"
            >
                {/* Search Text */}
                <TextField
                    label="Search"
                    variant="outlined"
                    fullWidth
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {searchText ? (
                                    <IconButton onClick={() => setSearchText('')}>
                                        <ClearIcon />
                                    </IconButton>
                                ) : (
                                    <SearchIcon />
                                )}
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Category Filter */}
                <FormControl variant="outlined" fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                        label="Category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {categoryOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Clear Filters Button */}
                <Button variant="contained" onClick={clearFilters} sx={{ whiteSpace: 'wrap' }}>
                    Clear Filters
                </Button>
            </Stack>
        </Box>
    )
}

export default AdCopyFilters
