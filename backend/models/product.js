import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    price: { type: Number, required: true },
    images: [{ type: String }],
    category: { type: String, required: true },
    brand: { type: String },
    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviews: [{ type: String }],
    numReviews: { type: Number, default: 0 },
    tags: [{ type: String }],
}, { timestamps: true });

export default mongoose.model('Product', productSchema);