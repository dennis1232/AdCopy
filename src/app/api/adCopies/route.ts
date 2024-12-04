import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import AdCopy from '@/models/AdCopy'

type AdCopyFilters = {
    $text?: { $search: string } // For text search
    category?: string // For category filtering
}

export async function GET(req: Request) {
    try {
        // Parse URL parameters
        const url = new URL(req.url)
        const searchText = url.searchParams.get('searchText') || ''
        const category = url.searchParams.get('category') || ''
        const sortField = url.searchParams.get('sortField') || 'date'
        const sortOrder = url.searchParams.get('sortOrder') === 'asc' ? 1 : -1
        const page = parseInt(url.searchParams.get('page') || '1', 10) // Default to page 1
        const limit = parseInt(url.searchParams.get('limit') || '10', 10) // Default to 10 items per page

        await dbConnect()

        const filters: Record<string, AdCopyFilters> = {}

        // Search Text Filter
        if (searchText.trim()) {
            filters.$text = { $search: searchText }
        }

        // Category Filter
        if (category) {
            filters.category = category
        }

        // Sorting Options
        const sortOptions: Record<string, 1 | -1> = {
            [sortField]: sortOrder,
        }

        // Pagination
        const skip = (page - 1) * limit

        // Fetch filtered and paginated data
        const total = await AdCopy.countDocuments(filters) // Total number of documents matching filters
        const adCopies = await AdCopy.find(filters).sort(sortOptions).skip(skip).limit(limit)

        return NextResponse.json({
            adCopies,
            total,
            page,
            pages: Math.ceil(total / limit),
        })
    } catch (error) {
        console.error('Error fetching ad copies:', error)
        return NextResponse.json({ error: 'Failed to fetch ad copies' }, { status: 500 })
    }
}
