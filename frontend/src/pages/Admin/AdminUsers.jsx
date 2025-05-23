import { useState, useEffect } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try{
            const { data } = await API.get("/user/");
            setUsers(data);
        } catch(error){
            console.error("Failed to fetch users");
        }
    };

    const toggleAdmin = async (id, current) => {
        try{
            await API.put(`/user/update/${id}`, { current });
            toast.success("Role updated");
            fetchUsers();
        } catch(error){
            toast.error("Failed to update role");
        }
    };

    const deleteUser = async (id) => {
        try{
            await API.delete(`/user/delete/${id}`);
            toast.success("User deleted");
            fetchUsers();
        } catch(error){
            toast.error("Failed to delete user");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
            <table className="w-full table-auto text-left">
                <thead>
                <tr>
                    <th className="p-2 border-b">Name</th>
                    <th className="p-2 border-b">Email</th>
                    <th className="p-2 border-b">Role</th>
                    <th className="p-2 border-b">Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-200 dark:hover:bg-gray-700">
                    <td className="p-2">{user._id}</td>
                    <td className="p-2">{user.name}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{user.isAdmin ? "Admin" : "User"}</td>
                    <td className="p-2 flex gap-2">
                        <button
                        onClick={() => toggleAdmin(user._id, user.isAdmin)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                        >
                        Toggle Role
                        </button>
                        <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-600 text-white px-2 py-1 rounded"
                        >
                        Delete
                        </button>
                    </td>
                    </tr>
                ))}
                {users.length === 0 && (
                    <tr>
                    <td colSpan="4" className="text-center p-4">No users found.</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUsers;