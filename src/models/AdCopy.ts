import { Schema, Document, models, model } from 'mongoose'

export interface IAdCopy extends Document {
    content: string
    imageUrl: string
    date: Date
    category: string
    tags: string[]
    channel: string
}

const AdCopySchema: Schema = new Schema({
    content: { type: String, required: true },
    imageUrl: { type: String },
    date: { type: Date, default: Date.now },
    category: { type: String, required: true },
    channel: { type: String },
})

// Indexes
AdCopySchema.index({ category: 1 })
AdCopySchema.index({ date: -1 })
AdCopySchema.index({ content: 'text' }) // For full-text search

export default models.AdCopy || model<IAdCopy>('AdCopy', AdCopySchema)
