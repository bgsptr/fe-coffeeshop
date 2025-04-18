import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";
import { Menu } from "./pages/Menu";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminTransaction } from "./pages/AdminTransaction";
import { AdminProduct } from "./pages/AdminProduct";
import Home from "./pages/Home";
import OrderHistory from "./pages/OrderHistory";
// import ProtectedRoutes from "./components/ProtectedRoute";
// import { Role } from "./components/types";

const Root = () => {
  return (
    <Suspense>
      <AuthProvider>
        <Routes>
          <Route path="/forbidden" element={<h2>Unauthorized</h2>} />
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart/:cart_id" element={<Cart />} />
          <Route path="/cart/checkout" element={<Checkout />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/transaction" element={<AdminTransaction />} />
          <Route path="/admin/product" element={<AdminProduct />} />
          <Route path="/order/history" element={<OrderHistory />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </AuthProvider>
    </Suspense>
  );
};

export default Root;
