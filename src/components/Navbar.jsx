// src/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = ({ setSearchQuery }) => {
  const location = useLocation(); // Lấy thông tin URL hiện tại
  const [user, setUser] = useState(null); // State lưu thông tin người dùng

  useEffect(() => {
    const storedUser = localStorage.getItem("dataUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Cập nhật state từ localStorage
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("dataUser"); // Xóa dữ liệu khỏi localStorage
    setUser(null); // Reset state
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/product">Products</Link>
        <Link to="/contactpage">Contact</Link>
      </div>

      {location.pathname === "/product" && (
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
        </div>
      )}

      <div className="user-info">
        {user ? (
          <>
            <span>Xin chào, {user.name}</span>
            <Link to="/order-history-user">
              <div className="history-user">
                <i class="fa-solid fa-briefcase"></i>
                Lịch sử đơn hàng
              </div>

            </Link> 
            <button onClick={handleLogout}>Đăng xuất</button>
          </>
        ) : (
          <Link to="/login">Đăng nhập</Link>
        )}
      </div>

      <div>
        <Link to="/cart" className="cart-link">
          <i className="fas fa-shopping-cart"></i>
        </Link>
      </div>

    </nav>
  );
};

export default Navbar;
