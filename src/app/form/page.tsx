'use client'
import React, { useState } from 'react'
import InputField from '../components/InputField'
import TextAreaField from '../components/TextAreaField'
import axios from 'axios'
import AdCopyPreview from '../components/AdCopyPreview'
import Button from '../components/Button'

interface FormData {
    description: string
    image: string
    price: string
    stars: string
    numberOfReviews: string
    numberOfOrders: string
    shipmentPrice: string
    shipmentEstimate: string
    discount: string
    originalPrice: string
    brand: string
    affiliateLink: string
}

const initialFormData: FormData = {
    description: '',
    image: '',
    price: '',
    stars: '',
    numberOfReviews: '',
    numberOfOrders: '',
    shipmentPrice: '',
    shipmentEstimate: '',
    discount: '',
    originalPrice: '',
    brand: '',
    affiliateLink: '',
}

const Form: React.FC = () => {
    const [formData, setFormData] = useState<FormData>(initialFormData)
    const [generatedTemplate, setGeneratedTemplate] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Generate the prompt for the GPT API
        const prompt = `
        Create an engaging ad copy for the following product in Hebrew, using HTML format, and include an HTML <a> tag for the affiliate link.
      Telegram supports a limited set of HTML tags: <b>, <strong>, <i>, <em>, <u>, <ins>, <s>, <strike>, <del>, <a>, <code>, <pre>.
      no ul or li tags 
      html before the tags are not needed
        Brand: ${formData.brand}
        Description: ${formData.description}
        Price: ${formData.price}
        Original Price: ${formData.originalPrice}
        Discount: ${formData.discount}
        Rating: ${formData.stars} stars from ${formData.numberOfReviews} reviews
        Number of Orders: ${formData.numberOfOrders}
        Shipping: ${formData.shipmentPrice}, Estimated Delivery: ${formData.shipmentEstimate}
        Affiliate Link: ${formData.affiliateLink}
      
        The ad copy should end with a call-to-action containing the affiliate link, using an HTML <a href="${formData.affiliateLink}"> ${formData.affiliateLink} </a>".
        📲 הצטרפו לערוץ הטלגרם שלנו למבצעים חמים בטניס - https://t.me/+YSjL72WwEGlkNzk0
        the links should be visible
      `

        try {
            const generatedContent = await axios.post('/api/generateAdCopy', {
                prompt,
            })

            setGeneratedTemplate(generatedContent.data.result)

            // const res = await axios.post('/api/sendToTelegram', {
            //     prompt: generatedContent.data.result,
            //     imageUrl: formData.image,
            // })
        } catch (error) {
            console.error('Error:', error)
        }

        setLoading(false)
    }

    const handleSave = async (generatedContent: string) => {
        await axios.post('/api/saveToDb', {
            content: generatedContent,
            imageUrl: formData.image,
        })
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Ad Copy Generator</h1>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                        <div className="md:col-span-4">
                            <TextAreaField
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter product description"
                            />
                        </div>
                        <InputField
                            label="Image URL"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="Enter image URL"
                        />
                        <InputField
                            label="Affiliate link"
                            name="affiliateLink"
                            value={formData.affiliateLink}
                            onChange={handleChange}
                            placeholder="Enter affiliate link"
                        />
                        <InputField
                            label="Price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Enter price"
                        />
                        <InputField
                            label="Original Price"
                            name="originalPrice"
                            value={formData.originalPrice}
                            onChange={handleChange}
                            placeholder="Enter original price"
                        />
                        <InputField
                            label="Discount"
                            name="discount"
                            value={formData.discount}
                            onChange={handleChange}
                            placeholder="Enter discount percentage"
                        />
                        <InputField
                            label="Stars"
                            name="stars"
                            value={formData.stars}
                            onChange={handleChange}
                            placeholder="Enter star rating"
                        />
                        <InputField
                            label="Number of Reviews"
                            name="numberOfReviews"
                            value={formData.numberOfReviews}
                            onChange={handleChange}
                            placeholder="Enter number of reviews"
                        />
                        <InputField
                            label="Number of Orders"
                            name="numberOfOrders"
                            value={formData.numberOfOrders}
                            onChange={handleChange}
                            placeholder="Enter number of orders"
                        />
                        <InputField
                            label="Shipment Price"
                            name="shipmentPrice"
                            value={formData.shipmentPrice}
                            onChange={handleChange}
                            placeholder="Enter shipment price"
                        />
                        <InputField
                            label="Shipment Estimate"
                            name="shipmentEstimate"
                            value={formData.shipmentEstimate}
                            onChange={handleChange}
                            placeholder="Enter shipment estimate"
                        />
                        <InputField
                            label="Brand"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            placeholder="Enter brand name"
                        />
                    </div>
                    <div className="mt-6">
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Generating...' : 'Generate Ad Copy'}
                        </Button>
                    </div>
                </form>

                {generatedTemplate && (
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">Generated Ad Copy:</h2>
                        <AdCopyPreview
                            imageUrl={formData.image}
                            content={generatedTemplate}
                            onSave={() => handleSave(generatedTemplate)}
                            showSaveButton={true}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Form
