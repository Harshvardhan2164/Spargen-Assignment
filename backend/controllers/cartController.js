import mongoose from 'mongoose';
import Cart from '../models/cart.js';
import Product from '../models/product.js';
import Order from '../models/order.js';

export const getCart = async (req, res) => {
    try{
        const user = req.user.id;
        const cart = await Cart.findOne({ user }).populate('items.product');

        if(!cart) return res.status(400).json({ user, items: [] });

        res.status(200).json(cart);
    } catch(error){
        console.log(error);
        res.status(500).json({ message: 'Error fetching cart' });
    }
};

export const addToCart = async (req, res) => {
    try{
        const { productId, quantity } = req.body;
        const user = req.user.id;

        const product = await Product.findById(productId);
        if(!product) return res.status(400).json({ message: 'Product not found' });

        let cart = await Cart.findOne({ user });
        
        if(!cart){
            if(quantity > product.stock)
                return res.status(400).json({ message: `Only ${product.stock} item(s) in stock` });

            cart = await Cart.create({
                user,
                items: [{ product: productId, quantity }]
            });
        }
        else{
            const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

            if(itemIndex > -1)
                cart.items[itemIndex].quantity += quantity;

            else
                cart.items.push({ product: productId, quantity });

            await cart.save();
        }

        res.status(200).json(cart);
    } catch(error){
        console.log(error);
        res.status(500).json({ message: 'Error adding item to cart' });
    }
};

export const updateCartItem = async (req, res) => {
    try{
        const user = req.user.id;
        const { productId } = req.params;
        const { quantity } = req.body;
        const cart = await Cart.findOne({ user })

        if(!cart) return res.status(400).json({ message: "Cart not found" });

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if(itemIndex > -1){
            cart.items[itemIndex].quantity = quantity;
        }
        else{
            return res.status(400).json({ message: "Product not found in cart" });
        }

        cart.markModified("items");

        await cart.save();

        res.status(200).json({ message: "Cart updated successfully" });
    } catch(error){
        console.log(error);
        res.status(500).json({ message: "Error updating cart" });
    }
};

export const removeItem = async (req, res) => {
    try{
        const user = req.user.id;
        const { productId } = req.params;
        const cart = await Cart.findOne({ user });

        if(!cart) return res.status(400).json({ message: 'Cart not found' });

        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        await cart.save();

        res.status(200).json({ message: 'Item(s) removed successfully', cart });
    } catch(error){
        console.log(error);
        res.status(500).json({ message: 'Error removing the item' });
    }
};

export const clearCart = async (req, res) => {
    try{
        const user = req.user.id;
        const cart = await Cart.findOneAndUpdate(
            { user },
            { items: [] },
            { new: true }
        );

        res.status(200).json({ message: 'Cart cleared', cart });
    } catch(error){
        console.log(error);
        res.status(500).json({ message: 'Error clearing cart' });
    }
};

export const checkoutCart = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const user = req.user.id;
        const { shippingAddress, paymentMethod } = req.body;
        let status = 'Pending';

        const cart = await Cart.findOne({ user }).populate('items.product');
        
        if(!cart || cart.items.length === 0){
            await session.endSession();
            return res.status(400).json({ message: 'Cart is empty' });
        }
        
        let totalAmount = 0;
        const orderItems = [];
        if(paymentMethod !== 'COD')
            status = 'Paid';

        for(let item of cart.items){
            const product = await Product.findById(item.product._id).session(session);
            if(!product) throw new Error('Product not found during checkout');

            if(item.quantity > product.stock){
                throw new Error(`Not enough stock for ${product.name}. Available: ${product.stock}`);
            }

            product.stock -= item.quantity;
            await product.save({ session });

            orderItems.push({
                product: product._id,
                quantity: item.quantity
            });

            totalAmount += item.quantity * product.price;
        }

        const order = new Order({
            
            user,
            items: orderItems,
            shippingAddress,
            totalAmount,
            paymentMethod,
            paymentStatus: status,
        });

        await order.save({ session });

        cart.items = [];
        await cart.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(200).json(order);
    } catch(error){
        await session.abortTransaction();
        session.endSession();
        console.log(error);
        res.status(500).json({ message: 'Checkout failed' });
    }
};