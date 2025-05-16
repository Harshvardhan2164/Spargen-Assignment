import Wishlist from '../models/wishlist.js';
import Product from '../models/product.js';
import Cart from '../models/cart.js';

export const addToWishlist = async (req, res) => {
    try{
        const { productId } = req.body;
        const user = req.user.id;

        const product = await Product.findById(productId);

        if(!product) return res.status(400).json({ message: 'Product not found' });

        let wishlist = await Wishlist.findOne({ user });

        if(!wishlist){
            wishlist = new Wishlist({ user, items: [] });
        }

        const exists = wishlist.items.find(item => item.product.toString() === productId);

        if(exists){
            return res.status(400).json({ message: 'Product already in the wishlist' });
        }

        wishlist.items.push({ product: productId });
        await wishlist.save();

        res.status(200).json({ message: 'Product added to the wishlist', wishlist });
    } catch(error){
        console.log(error);
        res.status(500).json({ message: 'Error adding product to wishlist' });
    }
};

export const getWishlist = async (req, res) => {
    try{
        const user = req.user.id;
        const wishlist = await Wishlist.findOne({ user }).populate('items.product');

        if(!wishlist) return res.status(200).json({ items: [] });

        res.status(200).json(wishlist);
    } catch(error){
        console.log(error);
        res.status(500).json({ message: 'Error fetching wishlist' });
    }
};

export const removeFromWishlist = async (req, res) => {
    try{
        const user = req.user.id;
        const { productId } = req.params;

        const wishlist = await Wishlist.findOne({ user });

        if(!wishlist) return res.status(400).json({ message: 'Wishlist not found' });

        wishlist.items = wishlist.items.filter(item => item.product.toString() !== productId);
        await wishlist.save();

        const updated = await Wishlist.findById(wishlist._id).populate('items.product');

        res.status(200).json({ message: 'Product removed from wishlist' });
    } catch(error){
        console.log(error);
        res.status(500).json({ message: 'Error removing product from wishlist' });
    }
};

export const moveToCart = async (req, res) => {
    try{
        const user = req.user.id;
        const { productId } = req.body;

        const product = await Product.findById(productId);

        if(!product) return res.status(400).json({ message: 'Product not found' });

        const wishlist = await Wishlist.findOne({ user });
        if(wishlist){
            wishlist.items = wishlist.items.filter(item => item.product.toString() !== productId);
            await wishlist.save();
        }

        let cart = await Cart.findOne({ user });
        if(!cart){
            cart = new Cart({ user, items: [] });
        }

        const exists = cart.items.find(item => item.product.toString() === productId);
        if(exists){
            exists.quantity += 1;
        }
        else{
            cart.items.push({ product: productId, quantity: 1 });
        }

        await cart.save();

        res.status(200).json({ message: 'Moved to cart successfully' });
    } catch(error){
        console.log(error);
        res.status(500).json({ message: 'Error moving to cart' });
    }
};