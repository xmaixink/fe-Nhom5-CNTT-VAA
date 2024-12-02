import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Thêm useNavigate
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import { createNewCart } from "../../services/cartService";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const storedUser = localStorage.getItem("dataUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/get-all-product?id=${id}`
        );
        if (response.data.errCode === 0) {
          setProduct(response.data.products);
        } else {
          setError(response.data.errMessage || "Không có sản phẩm");
        }
      } catch (err) {
        setError("Lỗi khi tải chi tiết sản phẩm");
        console.error("API lỗi:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]); 

  const handleAddToCart = async () => {
    try {
      const res = await createNewCart({
        idUser: user.id,
        imageProduct: product.image,
        nameProduct: product.name,
        priceProduct: product.price,
      });
      if (res.errCode === 0) {
        toast.success(res.message);
      }
    } catch (error) {
      toast.error("Bạn phải đăng nhập ");
    }
  };

  

  return (
    <>
      <Navbar />
      <div className="product-detail">
        <h1>{product.name}</h1>
        <img src={product.image} alt={product.name} />
        <p>{product.description}</p>
        <p>
          <strong>Ingredients:</strong>{" "}
          {product.ingredients ? product.ingredients.join(", ") : "Không có thông tin"}
        </p>
        <p>
          <strong>Price:</strong> ${product.price}
        </p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </>
  );
};

export default ProductDetail;
