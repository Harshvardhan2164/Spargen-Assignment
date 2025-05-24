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

// import { useContext, useEffect, useState } from "react";
// import { Link, Outlet, useLocation } from "react-router-dom";
// import { AuthContext } from "../../context/authContext";
// import API from "../../services/api";
// import { 
//   Menu, 
//   X, 
//   Home, 
//   Users, 
//   Package, 
//   ShoppingCart, 
//   BarChart3,
//   Settings,
//   ChevronLeft
// } from "lucide-react";

// const AdminPanel = () => {
//   const { user } = useContext(AuthContext);
//   const [users, setUsers] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const location = useLocation();

//   if (!user?.isAdmin) {
//     return (
//       <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-background)' }}>
//         <div className="max-w-md w-full card-container rounded-lg shadow-md p-8 text-center">
//           <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
//             <X className="w-8 h-8 text-red-600" />
//           </div>
//           <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text)' }}>Access Denied</h2>
//           <p className="text-gray-600 mb-6">You do not have access to this page.</p>
//           <Link 
//             to="/" 
//             className="btn-primary inline-flex items-center rounded-md transition-all"
//             style={{ 
//               backgroundColor: 'var(--color-primary)',
//               color: 'white',
//               padding: '0.75rem 1.5rem',
//               textDecoration: 'none'
//             }}
//           >
//             <Home className="w-4 h-4 mr-2" />
//             Back to Home
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const menuItems = [
//     { path: "/admin", icon: BarChart3, label: "Dashboard", exact: true },
//     { path: "/admin/users", icon: Users, label: "Users" },
//     { path: "/admin/products", icon: Package, label: "Products" },
//     { path: "/admin/orders", icon: ShoppingCart, label: "Orders" },
//     { path: "/admin/settings", icon: Settings, label: "Settings" }
//   ];

//   const isActiveRoute = (path, exact = false) => {
//     if (exact) {
//       return location.pathname === path;
//     }
//     return location.pathname.startsWith(path);
//   };

//   const fetchUsers = async () => {
//     try{
//         const { data } = await API.get("/user/");
//         setUsers(data);
//     } catch(error){
//         console.error("Error fetching users");
//     }
//   };

//   const fetchOrders = async () => {
//     try{
//         const { data } = await API.get("/order/");
//         setOrders(data);
//     } catch(error){
//         console.error("Error fetching orders");
//     }
//   };

//   const fetchProducts = async () => {
//     try{
//         const { data } = await API.get("/product/");
//         setProducts(data);
//     } catch(error){
//         console.error("Error fetching products");
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//     fetchProducts();
//     fetchUsers();
//   }, []);

//   const sidebarWidth = sidebarCollapsed ? '80px' : '280px';

//   return (
//     <div className="min-h-screen flex" style={{ backgroundColor: 'var(--color-background)' }}>
//       {/* Sidebar */}
//       <div 
//         className="card-container dark:bg-gray-900 shadow-lg flex flex-col fixed left-0 top-0 h-full z-20"
//         style={{ 
//           width: sidebarWidth,
//           transition: 'width var(--transition-normal) ease',
//           backgroundColor: 'var(--color-card-bg)',
//           borderRight: '1px solid rgba(0, 0, 0, 0.1)'
//         }}
//       >
//         {/* Header */}
//         <div className="p-4 border-b border-gray-200">
//           <div className="flex items-center justify-between">
//             {!sidebarCollapsed && (
//               <h2 
//                 className="text-xl font-bold navbar-logo"
//                 style={{ color: 'var(--color-primary)' }}
//               >
//                 Admin Panel
//               </h2>
//             )}
//             <button
//               onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
//               className="icon-btn p-2 rounded-md transition-all"
//               style={{ 
//                 backgroundColor: 'transparent',
//                 color: 'var(--color-text)',
//                 border: 'none'
//               }}
//             >
//               {sidebarCollapsed ? 
//                 <Menu className="w-6 h-6" /> : 
//                 <ChevronLeft className="w-6 h-6" />
//               }
//             </button>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 p-4">
//           <ul className="space-y-3">
//             {menuItems.map((item) => {
//               const Icon = item.icon;
//               const isActive = isActiveRoute(item.path, item.exact);
              
//               return (
//                 <li key={item.path}>
//                   <Link
//                     to={item.path}
//                     className={`flex items-center rounded-md text-sm font-medium transition-all navbar-category-link relative ${
//                       sidebarCollapsed ? 'justify-center p-3' : 'px-4 py-3'
//                     }`}
//                     style={{
//                       backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
//                       color: isActive ? 'white' : 'var(--color-text)',
//                       textDecoration: 'none',
//                       minHeight: '48px'
//                     }}
//                     title={sidebarCollapsed ? item.label : ''}
//                   >
//                     <Icon 
//                       className={sidebarCollapsed ? 'w-6 h-6' : 'w-5 h-5 mr-3'} 
//                       style={{ 
//                         minWidth: sidebarCollapsed ? '24px' : '20px',
//                         flexShrink: 0 
//                       }} 
//                     />
//                     {!sidebarCollapsed && (
//                       <span className="font-medium">{item.label}</span>
//                     )}
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>

//         {/* Back to Home Button */}
//         <div className="p-4 border-t border-gray-200">
//           <Link
//             to="/"
//             className={`flex items-center rounded-md text-sm font-medium transition-all ${
//               sidebarCollapsed ? 'justify-center p-3' : 'px-4 py-3'
//             }`}
//             style={{
//               backgroundColor: 'transparent',
//               color: 'var(--color-text)',
//               textDecoration: 'none',
//               minHeight: '48px'
//             }}
//             title={sidebarCollapsed ? 'Back to Home' : ''}
//           >
//             <Home 
//               className={sidebarCollapsed ? 'w-6 h-6' : 'w-5 h-5 mr-3'} 
//               style={{ 
//                 minWidth: sidebarCollapsed ? '24px' : '20px',
//                 flexShrink: 0 
//               }} 
//             />
//             {!sidebarCollapsed && <span className="font-medium">Back to Home</span>}
//           </Link>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div 
//         className="flex-1 flex flex-col"
//         style={{ 
//           marginLeft: sidebarWidth,
//           transition: 'margin-left var(--transition-normal) ease'
//         }}
//       >
//         {/* Top Bar */}
//         <header 
//           className="card-container shadow-sm border-b px-6 py-4"
//           style={{ 
//             backgroundColor: 'var(--color-card-bg)',
//             borderBottomColor: 'rgba(0, 0, 0, 0.1)'
//           }}
//         >
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 
//                 className="text-2xl font-semibold"
//                 style={{ color: 'var(--color-text)' }}
//               >
//                 {location.pathname === '/admin' ? 'Dashboard' : 
//                  location.pathname === '/admin/users' ? 'User Management' :
//                  location.pathname === '/admin/products' ? 'Product Management' :
//                  location.pathname === '/admin/orders' ? 'Order Management' :
//                  location.pathname === '/admin/settings' ? 'Settings' : 'Admin Panel'}
//               </h1>
//               <p className="text-sm text-gray-500 mt-1">Welcome back, {user?.name || 'Admin'}</p>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="text-sm text-gray-500">
//                 {new Date().toLocaleDateString('en-US', { 
//                   weekday: 'long', 
//                   year: 'numeric', 
//                   month: 'long', 
//                   day: 'numeric' 
//                 })}
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Main Content Area */}
//         <main className="flex-1 overflow-y-auto p-6">
//           {location.pathname === '/admin' ? (
//             // Dashboard Overview
//             <div className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <Link 
//                   to="/admin/users"
//                   className="card-container p-6 rounded-lg shadow-sm border border-gray-200 transition-all group block"
//                   style={{ 
//                     textDecoration: 'none',
//                     color: 'inherit',
//                     borderColor: 'rgba(0, 0, 0, 0.1)'
//                   }}
//                 >
//                   <div className="flex items-center">
//                     <div 
//                       className="p-3 rounded-lg transition-colors"
//                       style={{ 
//                         backgroundColor: 'rgba(0, 88, 163, 0.1)',
//                         color: 'var(--color-primary)'
//                       }}
//                     >
//                       <Users className="w-6 h-6" />
//                     </div>
//                     <div className="ml-4">
//                       <h3 
//                         className="text-lg font-semibold"
//                         style={{ color: 'var(--color-text)' }}
//                       >
//                         Users
//                       </h3>
//                       <p className="text-sm text-gray-500">Manage user accounts</p>
//                       <p 
//                         className="text-2xl font-bold mt-2"
//                         style={{ color: 'var(--color-primary)' }}
//                       >
//                         {users.length}
//                       </p>
//                     </div>
//                   </div>
//                 </Link>

//                 <Link 
//                   to="/admin/products"
//                   className="card-container p-6 rounded-lg shadow-sm border border-gray-200 transition-all group block"
//                   style={{ 
//                     textDecoration: 'none',
//                     color: 'inherit',
//                     borderColor: 'rgba(0, 0, 0, 0.1)'
//                   }}
//                 >
//                   <div className="flex items-center">
//                     <div 
//                       className="p-3 rounded-lg transition-colors"
//                       style={{ 
//                         backgroundColor: 'rgba(34, 197, 94, 0.1)',
//                         color: '#22c55e'
//                       }}
//                     >
//                       <Package className="w-6 h-6" />
//                     </div>
//                     <div className="ml-4">
//                       <h3 
//                         className="text-lg font-semibold"
//                         style={{ color: 'var(--color-text)' }}
//                       >
//                         Products
//                       </h3>
//                       <p className="text-sm text-gray-500">Manage inventory</p>
//                       <p 
//                         className="text-2xl font-bold mt-2"
//                         style={{ color: '#22c55e' }}
//                       >
//                         {products.length}
//                       </p>
//                     </div>
//                   </div>
//                 </Link>

//                 <Link 
//                   to="/admin/orders"
//                   className="card-container p-6 rounded-lg shadow-sm border border-gray-200 transition-all group block"
//                   style={{ 
//                     textDecoration: 'none',
//                     color: 'inherit',
//                     borderColor: 'rgba(0, 0, 0, 0.1)'
//                   }}
//                 >
//                   <div className="flex items-center">
//                     <div 
//                       className="p-3 rounded-lg transition-colors"
//                       style={{ 
//                         backgroundColor: 'rgba(168, 85, 247, 0.1)',
//                         color: '#a855f7'
//                       }}
//                     >
//                       <ShoppingCart className="w-6 h-6" />
//                     </div>
//                     <div className="ml-4">
//                       <h3 
//                         className="text-lg font-semibold"
//                         style={{ color: 'var(--color-text)' }}
//                       >
//                         Orders
//                       </h3>
//                       <p className="text-sm text-gray-500">Track and manage orders</p>
//                       <p 
//                         className="text-2xl font-bold mt-2"
//                         style={{ color: '#a855f7' }}
//                       >
//                         {orders.length}
//                       </p>
//                     </div>
//                   </div>
//                 </Link>
//               </div>

//               {/* Quick Stats */}
//               <div 
//                 className="card-container rounded-lg shadow-sm border p-6"
//                 style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}
//               >
//                 <h3 
//                   className="text-lg font-semibold mb-4"
//                   style={{ color: 'var(--color-text)' }}
//                 >
//                   Quick Overview
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div 
//                     className="text-center p-6 rounded-lg"
//                     style={{ 
//                       backgroundColor: 'rgba(0, 88, 163, 0.05)',
//                       border: '1px solid rgba(0, 88, 163, 0.1)'
//                     }}
//                   >
//                     <div 
//                       className="text-3xl font-bold mb-2"
//                       style={{ color: 'var(--color-primary)' }}
//                     >
//                       {users.length}
//                     </div>
//                     <div className="text-sm text-gray-500 font-medium">Total Users</div>
//                   </div>
//                   <div 
//                     className="text-center p-6 rounded-lg"
//                     style={{ 
//                       backgroundColor: 'rgba(34, 197, 94, 0.05)',
//                       border: '1px solid rgba(34, 197, 94, 0.1)'
//                     }}
//                   >
//                     <div 
//                       className="text-3xl font-bold mb-2"
//                       style={{ color: '#22c55e' }}
//                     >
//                       {products.length}
//                     </div>
//                     <div className="text-sm text-gray-500 font-medium">Total Products</div>
//                   </div>
//                   <div 
//                     className="text-center p-6 rounded-lg"
//                     style={{ 
//                       backgroundColor: 'rgba(168, 85, 247, 0.05)',
//                       border: '1px solid rgba(168, 85, 247, 0.1)'
//                     }}
//                   >
//                     <div 
//                       className="text-3xl font-bold mb-2"
//                       style={{ color: '#a855f7' }}
//                     >
//                       {orders.length}
//                     </div>
//                     <div className="text-sm text-gray-500 font-medium">Total Orders</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             // Render child routes
//             <Outlet />
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;

// import { useContext, useEffect, useState } from "react";
// import { Link, Outlet, useLocation } from "react-router-dom";
// import { AuthContext } from "../../context/authContext";
// import API from "../../services/api";
// import { 
//   Menu, 
//   X, 
//   Home, 
//   Users, 
//   Package, 
//   ShoppingCart, 
//   BarChart3,
//   Settings,
//   ChevronLeft,
//   Sun,
//   Moon,
//   Bell,
//   Search
// } from "lucide-react";

// const AdminPanel = () => {
//   const { user } = useContext(AuthContext);
//   const [users, setUsers] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const location = useLocation();

//   // Toggle dark mode
//   const toggleDarkMode = () => {
//     setIsDarkMode(!isDarkMode);
//     document.documentElement.classList.toggle('dark');
//   };

//   if (!user?.isAdmin) {
//     return (
//       <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: 'var(--color-background)'}}>
//         <div className="max-w-md w-full card-container rounded-lg shadow-md p-8 text-center">
//           <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
//             <X className="w-8 h-8 text-red-600" />
//           </div>
//           <h2 className="text-xl font-semibold mb-2" style={{color: 'var(--color-text)'}}>Access Denied</h2>
//           <p className="text-gray-600 mb-6">You do not have access to this page.</p>
//           <Link 
//             to="/" 
//             className="btn-primary inline-flex items-center rounded-md transition-colors"
//           >
//             <Home className="w-4 h-4 mr-2" />
//             Back to Home
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const menuItems = [
//     { path: "/admin", icon: BarChart3, label: "Dashboard", exact: true },
//     { path: "/admin/users", icon: Users, label: "Users" },
//     { path: "/admin/products", icon: Package, label: "Products" },
//     { path: "/admin/orders", icon: ShoppingCart, label: "Orders" },
//     { path: "/admin/settings", icon: Settings, label: "Settings" }
//   ];

//   const isActiveRoute = (path, exact = false) => {
//     if (exact) {
//       return location.pathname === path;
//     }
//     return location.pathname.startsWith(path);
//   };

//   const fetchUsers = async () => {
//     try{
//         const { data } = await API.get("/user/");
//         setUsers(data);
//     } catch(error){
//         console.error("Error fetching users");
//     }
//   };

//   const fetchOrders = async () => {
//     try{
//         const { data } = await API.get("/order/");
//         setOrders(data);
//     } catch(error){
//         console.error("Error fetching orders");
//     }
//   };

//   const fetchProducts = async () => {
//     try{
//         const { data } = await API.get("/product/");
//         setProducts(data);
//     } catch(error){
//         console.error("Error fetching products");
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//     fetchProducts();
//     fetchUsers();
//   }, []);

//   return (
//     <div className="min-h-screen flex" style={{backgroundColor: 'var(--color-background)', color: 'var(--color-text)'}}>
//       {/* Sidebar */}
//       <div className={`card-container shadow-lg transition-all duration-300 ${
//         sidebarCollapsed ? 'w-16' : 'w-64'
//       } flex flex-col border-r border-gray-200`}>
//         {/* Header */}
//         <div className="p-4 border-b border-gray-200">
//           <div className="flex items-center justify-between">
//             {!sidebarCollapsed && (
//               <h2 className="navbar-logo text-xl" style={{color: 'var(--color-primary)'}}>Admin Panel</h2>
//             )}
//             <button
//               onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
//               className="icon-btn hover:bg-gray-100 transition-colors"
//             >
//               {sidebarCollapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
//             </button>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 p-4">
//           <ul className="space-y-2">
//             {menuItems.map((item) => {
//               const Icon = item.icon;
//               const isActive = isActiveRoute(item.path, item.exact);
              
//               return (
//                 <li key={item.path}>
//                   <Link
//                     to={item.path}
//                     className={`navbar-category-link flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
//                       isActive
//                         ? 'text-white shadow-md'
//                         : 'hover:bg-gray-100'
//                     }`}
//                     style={isActive ? {
//                       backgroundColor: 'var(--color-primary)',
//                       transform: 'translateX(8px)'
//                     } : {}}
//                     title={sidebarCollapsed ? item.label : ''}
//                   >
//                     <Icon className={`w-5 h-5 ${sidebarCollapsed ? 'mx-auto' : 'mr-3'}`} />
//                     {!sidebarCollapsed && <span>{item.label}</span>}
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>

//         {/* Dark Mode Toggle & Back to Home */}
//         <div className="p-4 border-t border-gray-200 space-y-2">
//           {/* <button
//             onClick={toggleDarkMode}
//             className={`icon-btn w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors ${
//               sidebarCollapsed ? 'justify-center' : ''
//             }`}
//             title={sidebarCollapsed ? (isDarkMode ? 'Light Mode' : 'Dark Mode') : ''}
//           >
//             {isDarkMode ? <Sun className={`w-5 h-5 ${sidebarCollapsed ? '' : 'mr-3'}`} /> : <Moon className={`w-5 h-5 ${sidebarCollapsed ? '' : 'mr-3'}`} />}
//             {!sidebarCollapsed && <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>}
//           </button> */}
          
//           <Link
//             to="/"
//             className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors ${
//               sidebarCollapsed ? 'justify-center' : ''
//             }`}
//             title={sidebarCollapsed ? 'Back to Home' : ''}
//           >
//             <Home className={`w-5 h-5 ${sidebarCollapsed ? '' : 'mr-3'}`} />
//             {!sidebarCollapsed && <span>Back to Home</span>}
//           </Link>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Enhanced Top Bar */}
//         <header className="card-container shadow-sm border-b border-gray-200 px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-semibold" style={{color: 'var(--color-text)'}}>
//                 {location.pathname === '/admin' ? 'Dashboard' : 
//                  location.pathname === '/admin/users' ? 'User Management' :
//                  location.pathname === '/admin/products' ? 'Product Management' :
//                  location.pathname === '/admin/orders' ? 'Order Management' :
//                  location.pathname === '/admin/settings' ? 'Settings' : 'Admin Panel'}
//               </h1>
//               <p className="text-sm text-gray-500 mt-1">Welcome back, {user?.name || 'Admin'}</p>
//             </div>
            
//             <div className="flex items-center space-x-4">
//               {/* Search Bar */}
//               <div className="relative">
//                 <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input 
//                   type="text" 
//                   placeholder="Search..." 
//                   className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
//                 />
//               </div>
              
//               {/* Notifications */}
//               <button className="icon-btn relative hover:bg-gray-100">
//                 <Bell className="w-5 h-5" />
//                 <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
//               </button>
              
//               <div className="text-sm text-gray-500">
//                 {new Date().toLocaleDateString('en-US', { 
//                   weekday: 'long', 
//                   year: 'numeric', 
//                   month: 'long', 
//                   day: 'numeric' 
//                 })}
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Main Content Area */}
//         <main className="flex-1 overflow-y-auto p-6" style={{backgroundColor: 'var(--color-background)'}}>
//           {location.pathname === '/admin' ? (
//             // Enhanced Dashboard Overview
//             <div className="space-y-6 animated-bg">
//               {/* Stats Cards */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <Link 
//                   to="/admin/users"
//                   className="product-card card-container p-6 rounded-lg shadow-sm border border-gray-200 group"
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center">
//                       <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
//                         <Users className="w-6 h-6 text-blue-600" />
//                       </div>
//                       <div className="ml-4">
//                         <h3 className="text-lg font-semibold" style={{color: 'var(--color-text)'}}>Users</h3>
//                         <p className="text-sm text-gray-500">Manage user accounts</p>
//                       </div>
//                     </div>
//                     <div className="text-2xl font-bold price" style={{color: 'var(--color-primary)'}}>{users.length}</div>
//                   </div>
//                 </Link>

//                 <Link 
//                   to="/admin/products"
//                   className="product-card card-container p-6 rounded-lg shadow-sm border border-gray-200 group"
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center">
//                       <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
//                         <Package className="w-6 h-6 text-green-600" />
//                       </div>
//                       <div className="ml-4">
//                         <h3 className="text-lg font-semibold" style={{color: 'var(--color-text)'}}>Products</h3>
//                         <p className="text-sm text-gray-500">Manage inventory</p>
//                       </div>
//                     </div>
//                     <div className="text-2xl font-bold price" style={{color: 'var(--color-primary)'}}>{products.length}</div>
//                   </div>
//                 </Link>

//                 <Link 
//                   to="/admin/orders"
//                   className="product-card card-container p-6 rounded-lg shadow-sm border border-gray-200 group"
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center">
//                       <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
//                         <ShoppingCart className="w-6 h-6 text-purple-600" />
//                       </div>
//                       <div className="ml-4">
//                         <h3 className="text-lg font-semibold" style={{color: 'var(--color-text)'}}>Orders</h3>
//                         <p className="text-sm text-gray-500">Track and manage orders</p>
//                       </div>
//                     </div>
//                     <div className="text-2xl font-bold price" style={{color: 'var(--color-primary)'}}>{orders.length}</div>
//                   </div>
//                 </Link>
//               </div>

//               {/* Enhanced Quick Stats */}
//               <div className="card-container rounded-lg shadow-sm border border-gray-200 p-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <h3 className="text-lg font-semibold" style={{color: 'var(--color-text)'}}>Quick Overview</h3>
//                   <span className="badge badge-new">Live Data</span>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   <div className="text-center p-6 card-container rounded-lg border">
//                     <div className="text-3xl font-bold price mb-2" style={{color: 'var(--color-primary)'}}>{users.length}</div>
//                     <div className="text-sm text-gray-500 mb-3">Total Users</div>
//                     <div className="w-full bg-gray-200 rounded-full h-2">
//                       <div className="bg-blue-500 h-2 rounded-full" style={{width: '75%'}}></div>
//                     </div>
//                   </div>
//                   <div className="text-center p-6 card-container rounded-lg border">
//                     <div className="text-3xl font-bold price mb-2" style={{color: 'var(--color-primary)'}}>{products.length}</div>
//                     <div className="text-sm text-gray-500 mb-3">Total Products</div>
//                     <div className="w-full bg-gray-200 rounded-full h-2">
//                       <div className="bg-green-500 h-2 rounded-full" style={{width: '60%'}}></div>
//                     </div>
//                   </div>
//                   <div className="text-center p-6 card-container rounded-lg border">
//                     <div className="text-3xl font-bold price mb-2" style={{color: 'var(--color-primary)'}}>{orders.length}</div>
//                     <div className="text-sm text-gray-500 mb-3">Pending Orders</div>
//                     <div className="w-full bg-gray-200 rounded-full h-2">
//                       <div className="bg-purple-500 h-2 rounded-full" style={{width: '45%'}}></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Quick Actions */}
//               <div className="card-container rounded-lg shadow-sm border border-gray-200 p-6">
//                 <h3 className="text-lg font-semibold mb-4" style={{color: 'var(--color-text)'}}>Quick Actions</h3>
//                 <div className="flex flex-wrap gap-3">
//                   <button className="btn-primary rounded-lg">Add New Product</button>
//                   <button className="btn-secondary rounded-lg">Export Data</button>
//                   <button className="btn-primary rounded-lg">Generate Report</button>
//                   <button className="btn-secondary rounded-lg">System Settings</button>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             // Render child routes
//             <Outlet />
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;