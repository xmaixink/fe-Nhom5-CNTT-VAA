import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCart } from "../../services/productService";
import './SideDishPage.css';
import { createNewOrder } from "../../services/orderService";
import axios from "axios";
import { toast } from "react-toastify";

const SideDishPage = () => {
  const [sideDishes, setSideDishes] = useState([]);
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const [quantityDishes, setQuantityDishes] = useState(1); // Lưu số lượng


  console.log('check selectedDishes', selectedDishes)

  const storedUser = localStorage.getItem("dataUser");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const fetchCart = async () => {
    try {

      // console.log('check user', user)

      if (user) {
        const response = await getAllCart();

        const userCarts = response.carts.filter(
          (cart) => cart.idUser === user.id
        );

        setCartItems(userCarts);
        const total = userCarts.reduce(
          (accumulator, cart) => accumulator + cart.priceProduct * cart.number,
          0
        );
        setTotal(total);
      }
      else {
        alert("Xin hãy đăng nhập")
      }

    } catch (error) {
      console.log("fetch cart error", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/get-all-side-dishes')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.sideDishes)) {
          setSideDishes(data.sideDishes);
        } else {
          setSideDishes([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching side dishes:', error);
        setError('Failed to fetch side dishes');
        setLoading(false);
      });
  }, []);

  const handleSelectDish = (sideDish) => {
    if (!selectedDishes.includes(sideDish)) {
      setSelectedDishes([...selectedDishes, sideDish]);
    } else {
      setSelectedDishes(selectedDishes.filter((dish) => dish !== sideDish));
    }
  };

  const gotoCart = () => {
    navigate('/cart');
  }

  async function handlePaymentVNPAY() {
    try {
      const newPayment = {
        amount: total,
        bankCode: null,
        language: "vn",
      };

      const response = await axios.post(
        "http://localhost:8080/api/v1/vnpay/create_payment_url",
        newPayment
      );

      if (response.status === 200 && response.data) {
        await createNewOrder({
          products: cartItems,
          side_dishes: selectedDishes,
          userId: user.id,
          method: "VnPay"
        });
        window.location.href = response.data;
      }
    } catch (error) {
      console.log("check error", error.message);
    }
  }

  const handlePaymentCash = async () => {
    try {

      await createNewOrder({
        products: cartItems,
        side_dishes: selectedDishes,
        userId: user.id,
        method: "Tiền mặc"
      });
      navigate('/');
      toast.success("Đặt hàng thành công");

    } catch (error) {
      console.log("check error", error.message);
    }
  }

  const calculateTotal = () => {
    const sideDishesTotal = selectedDishes.reduce((sum, dish) => sum + dish.price, 0);
    const cartItemsTotal = cartItems.reduce(
      (sum, item) => sum + item.priceProduct * item.number,
      0
    );
    return sideDishesTotal + cartItemsTotal;
  };

  useEffect(() => {
    setTotal(calculateTotal());
  }, [selectedDishes, cartItems]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="side-dish-container">
      <button
        onClick={() => gotoCart()}
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
        Trở về trang Cart
      </button>
      <h1>Món ăn kèm</h1>
      <div className="side-dish-grid">
        {sideDishes.map((sideDish, index) => (
          <div key={index} className="side-dish-item">
            <img
              src={sideDish.image}
              alt={sideDish.name}
              className="side-dish-image"
            />
            <h3>{sideDish.name}</h3>
            <p>Price: {sideDish.price} VND</p>
            <p>{sideDish.description}</p>
            <button
              onClick={() => handleSelectDish(sideDish)}
              // className={`select-button ${selectedDishes.includes(sideDish) ? 'selected' : ''}`}
              className={selectedDishes.includes(sideDish) ? 'selected' : 'not-selected'}
            >
              {selectedDishes.includes(sideDish) ? 'Bỏ chọn' : 'Chọn'}
            </button>
          </div>
        ))}
      </div>

      <h2>Danh sách món đã chọn</h2>
      {cartItems.map((item, index) => (
        <div key={index} className="cart-item">
          <img
            src={item.imageProduct}
            alt={item.nameProduct}
            className="item-image"
          />
          <div className="item-details">
            <h3 className="item-name">{item.nameProduct}</h3>
          </div>


          <div className="item-quantity">
            <span className="quantity">Số lượng: {item.number}</span>
          </div>
          <p className="item-price">
            {Number(item.priceProduct) * Number(item.number)} VND
          </p>
        </div>
      ))}

      <div className="selected-summary">
        <h2>Danh sách chọn món thêm</h2>
        {selectedDishes.length === 0 ? (
          <p>Chưa chọn món ăn kèm nào</p>
        ) : (
          selectedDishes.map((dish, index) => (
            <div key={index} className="selected-dish-item">
              <div className="dish-card">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="selected-dish-image"
                />
                <div className="dish-details">
                  <p className="dish-name">{dish.name}</p>
                </div>
              </div>
              <p className="dish-price">{dish.price} VND</p>
              <p>Tổng giá: {dish.price} VND</p>
            </div>
          ))
        )}
      </div>

      <div className="checkout-button-container">
        <div className="total-price">
          <h3>Tổng giá trị: {total.toLocaleString()} VND</h3>
        </div>
        <button
          type="button"
          className="checkout-button"
          onClick={() => handlePaymentCash()}
        >
          Thanh toán bằng tiền mặt
        </button>
        <button
          type="button"
          className="checkout-button"
          // onClick={() => handlePayment('VN Pay')}
          onClick={() => handlePaymentVNPAY()}
        >
          Thanh toán bằng VN Pay
        </button>
      </div>
    </div>
  );
};

export default SideDishPage;
