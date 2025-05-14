import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const register = async (req, res) => {
    const { name, email, password, isAdmin } = req.body;

    try{
        const exists = await User.findOne({ email });

        if(exists) return res.status(400).json({ message: 'User already exists' });

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashed, isAdmin });
        res.status(201).json({ message: 'User registered successfully' });
    } catch(error){
        console.log(error);
        res.status(500).json({ message: 'Error registering user' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try{
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({ message: 'Invalid credentials. Please register first.' });

        const valid = await bcrypt.compare(password, user.password);
        if(!valid) return res.status(400).json({ message: 'Incorrect password. Please try again.' });

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.json({ token, user: { name: user.name, email: user.email, isAdmin: user.isAdmin } });
    } catch(error){
        console.log(error);
        res.status(500).json({ message: 'Login failed' });
    }
};

export const forgotPass = async (req, res) => {
    const { email, password } = req.body;
    
    try{
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({ message: 'User not found. Please enter valid email.' })
            
            const hashed = await bcrypt.hash(password, 10);
            await user.updateOne({ password: hashed });
            
            res.status(201).json({ message: 'Password reset successful' });
        } catch(error){
            console.log(error);
            res.status(500).json({ message: 'Password reset failed' });
        }
};