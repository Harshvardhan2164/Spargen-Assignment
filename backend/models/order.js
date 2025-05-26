import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: { type: Number, required: true }
        }
    ],
    shippingAddress: {
        fullName: String,
        phoneNumber: Number,
        address: String,
        city: String,
        state: String,
        postalCode: Number,
        country: String
    },
    paymentMethod: {
        type: String,
        enum: ['COD', 'UPI', 'Credit Card', 'Debit Card'],
        default: 'COD'
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending'
    },
    totalAmount: Number,
    status: {
        type: String,
        enum: ['Processing', 'In-Transit', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Processing'
    },
    deliveredAt: Date
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);