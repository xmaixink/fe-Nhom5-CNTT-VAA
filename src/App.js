import "@fortawesome/fontawesome-free";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./css/App.css";
import Login from "./pages/auth/Login/Login";
import Register from "./pages/auth/Register/Register";
import Cart from "./pages/Cart/Cart";

import ContactPage from "./pages/Contactpage/Contactpage";
import HomePage from "./pages/HomePage/HomePage";
import ProductDetail from "./pages/Product Detail/ProductDetail";
import ProductPage from "./pages/ProductPage/ProductPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import OrderHistoryUser from "./pages/OrderHistoryUser/OrderHistoryUser";

// Admin
import HomeAdmin from "./pages/Admin/HomeAdmin/HomeAdmin"
import AdminProduct from "./admin/AdminProduct";
import UserManage from "./pages/Admin/UserManage/UserManage";
import LoginAdmin from "./pages/Admin/Auth/Login";
import SideDishPage from "./pages/SideDishPage/SideDishPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contactpage" element={<ContactPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/order-history-user" element={<OrderHistoryUser />} />

        {/* Admin */}
        <Route path="/admin/home" element={<HomeAdmin />} />
        <Route path="/admin/product" element={<AdminProduct />} />
        <Route path="/admin/manageuser" element={<UserManage />} />
        <Route path="/admin/payment" element={<OrderHistory />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/side-dish" element={<SideDishPage />} />
        <Route path="/order" element={<OrderHistory />} />
      </Route>
    )
  );

  return (
    <div className="container">
      <div className="navbar"></div>

      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
