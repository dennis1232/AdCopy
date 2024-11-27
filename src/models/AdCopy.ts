// models/AdCopy.ts

import { Schema, Document, models, model } from 'mongoose'

export interface IAdCopy extends Document {
    content: string
    imageUrl: string
    date: Date
}

const AdCopySchema: Schema = new Schema({
    content: { type: String, required: true },
    imageUrl: { type: String },
    date: { type: Date, default: Date.now },
})

export default models.AdCopy || model<IAdCopy>('AdCopy', AdCopySchema)
