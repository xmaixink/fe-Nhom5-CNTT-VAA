import React, { useState } from "react";
import "./Login.css";

function Login() {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [name, setName] = useState("");

      const handleLogin = (e) => {
            e.preventDefault();
            console.log("Email:", email, "Password:", password);
            // Thực hiện logic đăng nhập ở đây
      };

      return (
            <div className="login-container">
                  <form className="login-form" onSubmit={handleLogin}>
                        <h2>Welcome Back!</h2>
                        <div className="input-group">
                              <label>Tên đăng nhập</label>
                              <input
                                    type="email"
                                    placeholder="Enter your name"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                              />
                        </div>
                        <div className="input-group">
                              <label>Email</label>
                              <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                              />
                        </div>
                        <div className="input-group">
                              <label>Password</label>
                              <input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                              />
                        </div>
                        <div className="input-group">
                              <label>Role</label>
                              <select
                                    required
                              >
                                    <option value="" disabled>
                                          Select your role
                                    </option>
                                    <option value="admin">Admin</option>
                                    <option value="staff">Staff</option>
                              </select>
                        </div>
                        <button type="submit" className="login-btn">
                              Login
                        </button>
                  </form>
            </div>
      );
}

export default Login;
