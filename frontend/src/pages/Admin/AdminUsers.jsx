// import { useState, useEffect } from "react";
// import API from "../../services/api";
// import toast from "react-hot-toast";

// const AdminUsers = () => {
//     const [users, setUsers] = useState([]);

//     const fetchUsers = async () => {
//         try{
//             const { data } = await API.get("/user/");
//             setUsers(data);
//         } catch(error){
//             console.error("Failed to fetch users");
//         }
//     };

//     const toggleAdmin = async (id, current) => {
//         try{
//             await API.put(`/user/update/${id}`, { current });
//             toast.success("Role updated");
//             fetchUsers();
//         } catch(error){
//             toast.error("Failed to update role");
//         }
//     };

//     const deleteUser = async (id) => {
//         try{
//             await API.delete(`/user/delete/${id}`);
//             toast.success("User deleted");
//             fetchUsers();
//         } catch(error){
//             toast.error("Failed to delete user");
//         }
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     return (
//         <div>
//             <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
//             <table className="w-full table-auto text-left">
//                 <thead>
//                 <tr>
//                     <th className="p-2 border-b">Name</th>
//                     <th className="p-2 border-b">Email</th>
//                     <th className="p-2 border-b">Role</th>
//                     <th className="p-2 border-b">Actions</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {users.map((user) => (
//                     <tr key={user._id} className="hover:bg-gray-200 dark:hover:bg-gray-700">
//                     <td className="p-2">{user.name}</td>
//                     <td className="p-2">{user.email}</td>
//                     <td className="p-2">{user.isAdmin ? "Admin" : "User"}</td>
//                     <td className="p-2 flex gap-2">
//                         <button
//                         onClick={() => toggleAdmin(user._id, user.isAdmin)}
//                         className="bg-yellow-500 text-white px-2 py-1 rounded"
//                         >
//                         Toggle Role
//                         </button>
//                         <button
//                         onClick={() => deleteUser(user._id)}
//                         className="bg-red-600 text-white px-2 py-1 rounded"
//                         >
//                         Delete
//                         </button>
//                     </td>
//                     </tr>
//                 ))}
//                 {users.length === 0 && (
//                     <tr>
//                     <td colSpan="4" className="text-center p-4">No users found.</td>
//                     </tr>
//                 )}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default AdminUsers;

import { useState, useEffect } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";
import { Trash2, Shield, ShieldOff } from "lucide-react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const { data } = await API.get("/user/");
      setUsers(data);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  const toggleAdmin = async (id, current) => {
    try {
      await API.put(`/user/update/${id}`, { current });
      toast.success("Role updated successfully");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  const deleteUser = async (id) => {
    try {
      await API.delete(`/user/delete/${id}`);
      toast.success("User deleted");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {/* <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
        User Management
      </h2> */}

      <div className="overflow-x-auto rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-center text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-center text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-center text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Role</th>
              <th className="px-4 py-3 text-center text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 text-center divide-y divide-gray-200 dark:divide-gray-700">
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-950">
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{user.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-300">{user.email}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      user.isAdmin
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                    }`}>
                      {user.isAdmin ? "Admin" : "User"}
                    </span>
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => toggleAdmin(user._id, user.isAdmin)}
                      className="inline-flex items-center px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                    >
                      {user.isAdmin ? (
                        <>
                          <ShieldOff className="w-4 h-4 mr-1" /> Revoke Admin
                        </>
                      ) : (
                        <>
                          <Shield className="w-4 h-4 mr-1" /> Make Admin
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="inline-flex items-center px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500 dark:text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;