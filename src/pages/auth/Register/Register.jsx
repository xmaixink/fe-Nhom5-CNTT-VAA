import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import './Register.css';
const validationSchema = yup.object({
  email: yup
    .string()
    .email('Email không hợp lệ')
    .required('Email là bắt buộc'),
  name: yup.string().required('Tên là bắt buộc'),
  password: yup
    .string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .required('Mật khẩu là bắt buộc'),
  phoneNumber: yup.string().required('Số điện thoại là bắt buộc'),
});

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(localStorage.getItem("token"));

    if (token) {

      setIsLoggedIn(true);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      phoneNumber: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);

      setErrorMessage('');

      try {
        const response = await axios.post(
          `http://localhost:8080/api/register`,
          values
        );
        if (response.data.errCode === 0) {
          alert('Đăng ký thành công!');
          navigate('/login');
        } else {
          setErrorMessage(response.data.errMessage || 'Có lỗi xảy ra.');
        }
      } catch (error) {
        console.error('Đăng ký thất bại:', error);
        setErrorMessage('Có lỗi xảy ra. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    },
  });

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="register-page">
      <h2 className="title">Đăng Ký</h2>
      <div className="register-form">
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
            <label htmlFor="name">Tên:</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="error">{formik.errors.name}</div>
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

          <div>
            <label htmlFor="phoneNumber">Số điện thoại:</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <div className="error">{formik.errors.phoneNumber}</div>
            )}
          </div>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <button type="submit" disabled={loading}>
            {loading ? 'Đang đăng ký...' : 'Đăng Ký'}
          </button>
        </form>
      </div>
      {!isLoggedIn && (
        <div className="register-redirect">
          <span>Đã có tài khoản? </span>
          <button onClick={handleLoginRedirect}>Đăng Nhập</button>
        </div>
      )}
    </div>
  );
};

export default Register;
