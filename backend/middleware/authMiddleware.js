import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token) return res.status(401).json({ message: 'Unauthorized' });

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        
        next();
    } catch(error){
        res.status(500).json({ message: 'Invalid token' });
    }
};

export const adminOnly = (req, res, next) => {
    if(!req.user?.isAdmin) return res.status(401).json({ message: 'Access denied' });
    next();
};