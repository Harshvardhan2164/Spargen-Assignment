import User from "../models/user.js";

export const getAllUsers = async (req, res) => {
    try{
        const users = await User.find().select("name email isAdmin");

        res.status(200).json(users);
    } catch(error){
        console.log(error);
        res.status(500).json({ message: "Error fetching users" });
    }
};

export const updateRole = async (req, res) => {
    try{
        const { id } = req.params;
        const { role } = req.body;

        const updated = await User.findById(id);

        if(!updated) return res.status(400).json({ message: "User not found" });

        updated.isAdmin = !role === true;

        await updated.save();

        res.status(200).json(updated);
    } catch(error){
        console.log(error);
        res.status(500).json({ message: "Error updating user role" });
    }
};

export const deleteUser = async (req, res) => {
    try{
        const { id } = req.params;

        const user = await User.findOneAndDelete(id);

        if(!user) return res.status(400).json({ message: "User not found" });

        res.status(200).json({ message: "User deleted successfully" });
    } catch(error){
        console.log(error);
        res.status(500).json({ message: "Error deleting the user" });
    }
};