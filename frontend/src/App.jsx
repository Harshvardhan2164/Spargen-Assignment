import { Routes, Route } from 'react-router-dom';
import RegisterUser from "./pages/Register";
import Login from "./pages/Login";
import ForgotPass from "./pages/ForgotPassword";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<RegisterUser />} />

      <Route path="/forgot-password" element={<ForgotPass />} />

      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;