import { useState, useEffect } from "react";
import API from "../../services/api";
import toast from "react-hot-toast"; 

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        name: "",
        price: 0,
        category: "",
        description: "",
    })

    const fetchProducts = async () => {
        try{
            const { data } = await API.get("/product/");
            setProducts(data.products); 
        } catch(error){
            console.error("Error fetching products");
        }
    };

    const createProduct = async () => {
        try{
            const res = await API.post("/product/add", form);
            toast.success("Product Added");
            fetchProducts();
            setForm({ name: "", price: 0, category: "", description: "" });
        } catch(error){
            toast.error("Failed to add product")
        }
    };
    
    const updateProduct = async (id) => {
        try{
            await API.put(`/product/update/${id}`, form);
            toast.success("Product updated");
            fetchProducts();
            setForm({ name: "", price: 0, category: "", description: "" });
        } catch(error){
            toast.error("Failed to update product");
        }
    };

    const deleteProduct = async (id) => {
        try{
            await API.delete(`/product/delete/${id}`)
            toast.success("Product deleted");
            fetchProducts();
        } catch(error){
            toast.error("Failed to delete product");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>

            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded mb-6">
                <h3 className="text-lg font-semibold mb-2">Add New Product</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="p-2 rounded border dark:bg-gray-700"
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="p-2 rounded border dark:bg-gray-700"
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="p-2 rounded border dark:bg-gray-700"
                />
                <textarea
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="p-2 rounded border dark:bg-gray-700 col-span-full"
                />
                </div>
                <button onClick={createProduct} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
                Add Product
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full table-auto text-left">
                <thead>
                    <tr>
                    <th className="p-2 border-b">Name</th>
                    <th className="p-2 border-b">Price</th>
                    <th className="p-2 border-b">Category</th>
                    <th className="p-2 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p) => (
                    <tr key={p._id} className="hover:bg-gray-200 dark:hover:bg-gray-700">
                        <td className="p-2">{p.name}</td>
                        <td className="p-2">${p.price}</td>
                        <td className="p-2">{p.category}</td>
                        <td className="p-2">
                        {/* You can add an edit modal here */}
                        <button
                            onClick={() => updateProduct(p._id)}
                            className="bg-yellow-500 text-white px-2 py-1 rounded"
                        >
                            Update
                        </button>
                        <button
                            onClick={() => deleteProduct(p._id)}
                            className="bg-red-600 text-white px-2 py-1 rounded"
                        >
                            Delete
                        </button>
                        </td>
                    </tr>
                    ))}
                    {products.length === 0 && (
                    <tr>
                        <td colSpan="4" className="text-center p-4">No products found.</td>
                    </tr>
                    )}
                </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProducts;