import Product from '../models/product.js';
import slugify from 'slugify';

// Admin Only
export const addProduct = async (req, res) => {
    try{
        const { name, description, price, category, brand, stock, tags, images } = req.body;

        const slug = slugify(name, { lower: true });
        const existing = await Product.findOne({ slug });

        if(existing) return res.status(400).json({ message: 'Product already exists' });

        const product = await Product.create({ name, slug, description, price, brand, stock, tags, images, category });
        res.status(201).json({ message: 'Product added successfully' });
    } catch(error){
        console.log(error);
        res.status(500).json({ message: 'Error adding product' });
    }
};

export const getAllProducts = async (req, res) => {
    try{
        const { category, minPrice, maxPrice, search, page = 1, limit = 8 } = req.query;

        let query = {};
        if (category) query.category = category;

        if (search) {
            const searchWords = search.trim().split(/\s+/);
            
            if (searchWords.length === 1) {
                query.$or = [
                    { name: { $regex: search, $options: 'i' } },
                    { category: { $regex: search, $options: 'i' } },
                    { tags: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } }
                ];
            } else {
                query.$and = searchWords.map(word => ({
                    $or: [
                        { name: { $regex: word, $options: 'i' } },
                        { category: { $regex: word, $options: 'i' } },
                        { tags: { $regex: word, $options: 'i' } },
                        { description: { $regex: word, $options: 'i' } }
                    ]
                }));
            }
        }

        if (minPrice || maxPrice) query.price = { ...(minPrice && { $gte: minPrice }), ...(maxPrice && { $lte: maxPrice }) };

        const skip = (page - 1) * limit;

        const [products, total] = await Promise.all([Product.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit), Product.countDocuments(query)]);
        res.status(200).json({ products, total, page: Number(page), pages: Math.ceil(total/limit) });
    } catch(error){
        console.log(error);
        res.status(500).json({ message: "Error fetching products" });
    }
};

export const getProduct = async (req, res) => {
    try{
        const product = await Product.findOne({ slug: req.params.slug });

        if(!product) return res.status(400).json({ message: 'Product not found' });

        res.status(200).json(product);
    } catch(error){
        console.log(error);
        res.status(500).json({ message: 'Error fetching product' });
    }
};

export const updateProduct = async (req, res) => {
    try{
        const slug = req.params.slug;
        const product = await Product.findOne({ slug });

        if(!product) return res.status(400).json({ message: 'Product not found' });

        const updates = req.body;

        if(updates.name) updates.slug = slugify(updates.name, { lower: true });
        if(updates.reviews) updates.numReviews = updates.reviews.length;

        const updated = await Product.findOneAndUpdate({ slug }, updates, { new: true });
        if(!updated) return res.status(400).json({ message: 'Product not found' });

        res.status(200).json(updated);
    } catch(error){
        console.log(error);
        res.status(500).json({ message: 'Error fetching product' });
    }
};

export const deleteProduct = async (req, res) => {
    try{
        const slug = req.params.slug;
        const deleted = await Product.findOneAndDelete({ slug });

        if(!deleted) return res.status(400).json({ message: 'Product not found' });

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch(error){
        console.log(error);
        res.status(500).json({ message: 'Error deleting product' });
    }
};