import Order from '../models/order.js';

export const getOrders = async (req, res) => {
    try{
        const user = req.user.id;
        const orders = await Order.find({ user }).populate('items.product');

        res.status(200).json(orders);
    } catch(error){
        console.log(error);
        res.status(500).json({ message: 'Error fetching orders' });
    }
};

export const getAllOrders = async (req, res) => {
    try{
        const orders = await Order.find().populate('user', 'name email').populate('items.product');

        res.status(200).json(orders);
    } catch(error){
        console.log(error);
        res.status(500).json({ message: 'Error fetching orders' });
    }
};

export const updateStatusOrder = async (req, res) => {
    try{
        const { value, key } = req.body;
        const order = await Order.findById(req.params.id);

        if(!order) return res.status(400).json({ message: 'Order not found' });

        if(key === "status"){
            order.status = value;

            if(value === "Delivered"){
                order.deliveredAt = new Date();
            }
        }

        else{
            order.paymentStatus = value;
        }

        await order.save();

        res.status(200).json({ message: 'Order updated successfully' });
    } catch(error){
        console.log(error);
        res.status(500).json({ message: 'Error updating order' });
    }
};