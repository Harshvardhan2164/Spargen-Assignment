import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import API from "../../services/api";
import { 
  Menu, 
  X, 
  Home, 
  Users, 
  Package, 
  ShoppingCart, 
  BarChart3,
  Settings,
  ChevronLeft
} from "lucide-react";

const AdminPanel = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <X className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">You do not have access to this page.</p>
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const menuItems = [
    { path: "/admin", icon: BarChart3, label: "Dashboard", exact: true },
    { path: "/admin/users", icon: Users, label: "Users" },
    { path: "/admin/products", icon: Package, label: "Products" },
    { path: "/admin/orders", icon: ShoppingCart, label: "Orders" },
    { path: "/admin/settings", icon: Settings, label: "Settings" }
  ];

  const isActiveRoute = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const fetchUsers = async () => {
    try{
        const { data } = await API.get("/user/");
        setUsers(data);
    } catch(error){
        console.error("Error fetching users");
    }
  };

  const fetchOrders = async () => {
    try{
        const { data } = await API.get("/order/");
        setOrders(data);
    } catch(error){
        console.error("Error fetching orders");
    }
  };

  const fetchProducts = async () => {
    try{
        const { data } = await API.get("/product/");
        setProducts(data.products);
    } catch(error){
        console.error("Error fetching products");
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchProducts();
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white text-black border-r border-gray-100 dark:border-gray-800 shadow-lg transition-all dark:bg-gray-900 dark:text-white duration-300 ${
        sidebarCollapsed ? 'w-18' : 'w-60'
      } flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-500">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="icon-btn p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              {sidebarCollapsed ? <Menu className="w-6 h-6" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveRoute(item.path, item.exact);
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                    title={sidebarCollapsed ? item.label : ''}
                  >
                    <Icon className={`w-5 h-5 ${sidebarCollapsed ? 'mx-auto' : 'mr-3'}`} />
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Back to Home Button */}
        <div className="p-4 border-t border-gray-500">
          <Link
            to="/"
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors ${
              sidebarCollapsed ? 'justify-center' : ''
            }`}
            title={sidebarCollapsed ? 'Back to Home' : ''}
          >
            <Home className={`w-5 h-5 ${sidebarCollapsed ? '' : 'mr-3'}`} />
            {!sidebarCollapsed && <span>Back to Home</span>}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white shadow-sm border-b border-gray-200 dark:border-gray-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {location.pathname === '/admin' ? 'Dashboard' : 
                 location.pathname === '/admin/users' ? 'User Management' :
                 location.pathname === '/admin/products' ? 'Product Management' :
                 location.pathname === '/admin/orders' ? 'Order Management' :
                 location.pathname === '/admin/settings' ? 'Settings' : 'Admin Panel'}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Welcome back, {user?.name || 'Admin'}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-white dark:bg-gray-800">
          {location.pathname === '/admin' ? (
            // Dashboard Overview
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link 
                  to="/admin/users"
                  className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md dark:hover:shadow-2xl transition-shadow group"
                >
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">Users</h3>
                      <p className="text-sm text-gray-500">Manage user accounts</p>
                    </div>
                  </div>
                </Link>

                <Link 
                  to="/admin/products"
                  className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md dark:hover:shadow-2xl transition-shadow group"
                >
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                      <Package className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">Products</h3>
                      <p className="text-sm text-gray-500">Manage inventory</p>
                    </div>
                  </div>
                </Link>

                <Link 
                  to="/admin/orders"
                  className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md dark:hover:shadow-2xl transition-shadow group"
                >
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                      <ShoppingCart className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">Orders</h3>
                      <p className="text-sm text-gray-500">Track and manage orders</p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm dark:shadow-2xl border border-gray-200 dark:border-gray-800 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-200">{users.length}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-300">Total Users</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-200">{products.length}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-300">Total Products</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-200">{orders.length}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-300">Pending Orders</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Render child routes
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;