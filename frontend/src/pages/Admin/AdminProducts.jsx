import { useState, useEffect } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";
import { Pencil, Trash2, Plus, Minus } from "lucide-react";
import { Dialog } from "@headlessui/react";

const initialFormState = {
  name: "",
  slug: "",
  brand: "",
  stock: 0,
  rating: 0,
  tags: [],
  images: [],
  price: 0,
  category: "",
  description: "",
};

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(initialFormState);
  const [editForm, setEditForm] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/product/");
      setProducts(data.products);
    } catch (error) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async () => {
    try {
      await API.post("/product/add", form);
      toast.success("Product added");
      setForm(initialFormState);
      setShowAddForm(false);
      fetchProducts();
    } catch {
      toast.error("Failed to add product");
    }
  };

  const openEditModal = (product) => {
    setEditForm({ ...product });
    setIsEditOpen(true);
  };

  const updateProduct = async () => {
    try {
      await API.put(`/product/update/${editForm.slug}`, editForm);
      toast.success("Product updated");
      setIsEditOpen(false);
      fetchProducts();
    } catch {
      toast.error("Failed to update product");
    }
  };

  const deleteProduct = async (slug) => {
    try {
      await API.delete(`/product/delete/${slug}`);
      toast.success("Product deleted");
      fetchProducts();
    } catch {
      toast.error("Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (field, value) => {
    if (field === "tags" || field === "images") {
      setForm({ ...form, [field]: value.split(",").map((v) => v.trim()) });
    } else {
      setForm({ ...form, [field]: value });
    }
  };

  const handleEditChange = (field, value) => {
    if (field === "tags" || field === "images") {
      setEditForm({ ...editForm, [field]: value.split(",").map((v) => v.trim()) });
    } else {
      setEditForm({ ...editForm, [field]: value });
    }
  };

  return (
    <div className="p-6">
      {/* Toggle Add Product Form */}
      {!showAddForm && (
          <button
            onClick={() => setShowAddForm((prev) => !prev)}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
          >
              <Plus size={18} />
              Add Product
          </button>
        )} 
        {showAddForm && (
          <button
            onClick={() => setShowAddForm((prev) => !prev)}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
            >
            <Minus size={18} />
            Close Form
          </button>
        )}

      {showAddForm && (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Name" value={form.name} onChange={(e) => handleChange("name", e.target.value)} className="p-2 rounded border bg-gray-100 dark:bg-gray-700" />
            <input type="text" placeholder="Slug" value={form.slug} onChange={(e) => handleChange("slug", e.target.value)} className="p-2 rounded border bg-gray-100 dark:bg-gray-700" />
            <input type="text" placeholder="Brand" value={form.brand} onChange={(e) => handleChange("brand", e.target.value)} className="p-2 rounded border bg-gray-100 dark:bg-gray-700" />
            <input type="number" placeholder="Price" value={form.price === 0 ? "" : form.price} onChange={(e) => handleChange("price", e.target.value)} className="p-2 rounded border bg-gray-100 dark:bg-gray-700" />
            <input type="number" placeholder="Stock" value={form.stock === 0 ? "" : form.stock} onChange={(e) => handleChange("stock", e.target.value)} className="p-2 rounded border bg-gray-100 dark:bg-gray-700" />
            <input type="number" placeholder="Rating" value={form.rating === 0 ? "" : form.rating} onChange={(e) => handleChange("rating", e.target.value)} className="p-2 rounded border bg-gray-100 dark:bg-gray-700" />
            <input type="text" placeholder="Tags (comma separated)" value={form.tags.join(", ")} onChange={(e) => handleChange("tags", e.target.value)} className="p-2 rounded border bg-gray-100 dark:bg-gray-700" />
            <input type="text" placeholder="Category" value={form.category} onChange={(e) => handleChange("category", e.target.value)} className="p-2 rounded border bg-gray-100 dark:bg-gray-700" />
            <textarea type="text" placeholder="Image URLs (comma separated)" value={form.images.join(", ")} onChange={(e) => handleChange("images", e.target.value)} className="p-2 rounded border bg-gray-100 dark:bg-gray-700 col-span-full" />
            <textarea placeholder="Description" value={form.description} onChange={(e) => handleChange("description", e.target.value)} className="p-2 rounded border bg-gray-100 dark:bg-gray-700 col-span-full" />
          </div>
          <button onClick={createProduct} className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Submit
          </button>
        </div>
      )}

      {/* Product Table */}
      <div className="overflow-x-auto rounded-lg shadow-sm">
        <table className="w-full table-auto text-center bg-white dark:bg-gray-900 rounded shadow">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Price</th>
              <th className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Category</th>
              <th className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              <tr><td colSpan="4" className="p-4 text-center">Loading...</td></tr>
            ) : products.length === 0 ? (
              <tr><td colSpan="4" className="p-4 text-center">No products found.</td></tr>
            ) : (
              products.map((p) => (
                <tr key={p._id} className="bg-white hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-950">
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">₹{p.price}</td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3 flex justify-center gap-2">
                    <button onClick={() => openEditModal(p)} className="text-yellow-500 hover:text-yellow-600"><Pencil size={18} /></button>
                    <button onClick={() => deleteProduct(p.slug)} className="text-red-600 hover:text-red-700"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <Dialog.Panel className="bg-white dark:bg-gray-900 p-6 rounded shadow-lg w-full max-w-2xl">
          <Dialog.Title className="text-lg font-semibold mb-4">Edit Product</Dialog.Title>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" value={editForm?.name || ""} onChange={(e) => handleEditChange("name", e.target.value)} className="p-2 rounded border bg-gray-100 dark:bg-gray-700" />
            <input type="text" value={editForm?.slug || ""} onChange={(e) => handleEditChange("slug", e.target.value)} className="p-2 rounded border bg-gray-100 dark:bg-gray-700" />
            <input type="text" value={editForm?.brand || ""} onChange={(e) => handleEditChange("brand", e.target.value)} className="p-2 rounded border bg-gray-100 dark:bg-gray-700" />
            <input type="number" value={editForm?.stock || 0} onChange={(e) => handleEditChange("stock", e.target.value)} className="p-2 rounded border bg-gray-100 dark:bg-gray-700" />
            <input type="number" value={editForm?.rating || 0} onChange={(e) => handleEditChange("rating", e.target.value)} className="p-2 rounded border bg-gray-100 dark:bg-gray-700" />
            <input type="text" value={(editForm?.tags || []).join(", ")} onChange={(e) => handleEditChange("tags", e.target.value)} className="p-2 rounded border bg-gray-100 dark:bg-gray-700" />
            <input type="text" value={(editForm?.images || []).join(", ")} onChange={(e) => handleEditChange("images", e.target.value)} className="p-2 rounded border bg-gray-100 dark:bg-gray-700" />
            <input type="number" value={editForm?.price || 0} onChange={(e) => handleEditChange("price", e.target.value)} className="p-2 rounded border bg-gray-100 dark:bg-gray-700" />
            <input type="text" value={editForm?.category || ""} onChange={(e) => handleEditChange("category", e.target.value)} className="p-2 rounded border bg-gray-100 dark:bg-gray-700" />
            <textarea value={editForm?.description || ""} onChange={(e) => handleEditChange("description", e.target.value)} className="p-2 rounded border bg-gray-100 dark:bg-gray-700 col-span-full" />
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button onClick={() => setIsEditOpen(false)} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 rounded">Cancel</button>
            <button onClick={updateProduct} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default AdminProducts;