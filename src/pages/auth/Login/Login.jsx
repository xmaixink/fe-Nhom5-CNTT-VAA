import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import './Login.css';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Email không hợp lệ')
    .required('Email là bắt buộc'),
  password: yup
    .string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .required('Mật khẩu là bắt buộc'),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setErrorMessage('');

      try {
        const response = await axios.post(
          `http://localhost:8080/api/login`,
          values
        );
        if (response.data.errCode === 0) {
          alert('Đăng nhập thành công!');
          const dataUser = response.data.user
          localStorage.setItem("dataUser", JSON.stringify(dataUser)); 
          console.log('check dataUser', dataUser)
          navigate('/');
        } else {
          setErrorMessage(response.data.errMessage || 'Có lỗi xảy ra.');
        }
      } catch (error) {
        console.error('Đăng nhập thất bại:', error);
        setErrorMessage('Có lỗi xảy ra. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    },
  });

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const gotoHome = () => {
    navigate('/');
  }

  return (
    <div className="login-page">

      <button
        onClick={() => gotoHome()}
        style={{
          padding: "20px 16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "20px"
        }}
      >
       Back to Home
      </button>

      <h2 className="title">Đăng Nhập</h2>
      <div className="login-form">
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error">{formik.errors.email}</div>
            )}
          </div>

          <div>
            <label htmlFor="password">Mật khẩu:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="error">{formik.errors.password}</div>
            )}
          </div>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <button type="submit" disabled={loading}>
            {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
          </button>
        </form>
      </div>
      <div className="register-link">
        <button onClick={handleRegisterClick}>Chưa có tài khoản? Đăng Ký</button>
      </div>
    </div>
  );
};

export default Login;
