import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import AuthProvider from './context/authContext.jsx';
import { Toaster } from 'react-hot-toast';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <Toaster position='top-right' reverseOrder={false} />
      <App />
    </AuthProvider>
  </BrowserRouter>
)
