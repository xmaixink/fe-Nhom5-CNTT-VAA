import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/MainSection.css';
import { getAllProductService } from '../services/productService'; // Đảm bảo import đúng

const banners = [
  "https://i.pinimg.com/736x/a8/26/fa/a826fac4a148fdfbede3f61e6d657a2c.jpg",
  "https://i.pinimg.com/736x/07/ab/b4/07abb4972e2427dfcee62b1ccca5bdbf.jpg",
  "https://i.pinimg.com/736x/f6/fc/12/f6fc126d6d49974460a6f3a51a2134c0.jpg",
  "https://i.pinimg.com/736x/1d/ca/e2/1dcae24d4745985753e71e2595f1d4a2.jpg",
  "https://i.pinimg.com/736x/bf/f6/32/bff63222d48e859aeda74f4405a04d39.jpg"
];

const MainSection = () => {
  const [fetchProductData, setFetchProductData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getAllProductService('ALL');
        setFetchProductData(response.products);
      } catch (error) {
        console.log('Fetch product error:', error);
      }
    };

    fetchProduct();
  }, []);

  const handleOrderNow = () => {
    navigate('/product');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <section className="main-section">
      <div className="banner-container">
        <div className="banner-wrapper" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {banners.map((src, index) => (
            <img key={index} src={src} alt={`Banner ${index + 1}`} />
          ))}
        </div>
      </div>

      <div className="content">
        <h2>FOOD E-CO</h2>
        <p>
          Thức ăn không chỉ là sự kết hợp của nguyên liệu mà còn là nghệ thuật và văn hóa. Những món ăn được bày biện tỉ mỉ, từ món khai vị nhẹ nhàng đến các món chính phong phú, mỗi món đều mang một hương vị riêng biệt.
        </p>
      </div>

      <div className="product-list">
        {fetchProductData.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price} VND</p>
          </div>
        ))}
      </div>
      <button onClick={handleOrderNow}>Xem thêm</button>
    </section>
  );
};

export default MainSection;