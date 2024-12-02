import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { getAllOrder } from "../../services/orderService";
import "./OrderHistoryUser.css"


const OrderHistoryUser = () => {

      const [allOrderUser, setAllOrder] = useState([]);

      const storedUser = localStorage.getItem("dataUser");
      const user = storedUser ? JSON.parse(storedUser) : null;
      console.log('check allOrderUser', allOrderUser)
      const fetchOrderUser = async () => {
            try {
                  const response = await getAllOrder();
                  const filteredOrders = response.carts?.filter(order => order.userId === user?.id) || [];
                  filteredOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                  setAllOrder(filteredOrders || []);
            } catch (error) {
                  console.log("fetch cart error", error);
            }
      };

      useEffect(() => {
            fetchOrderUser();
      }, []);

      return (
            <>
                  <Navbar />

                  <div>
                        <h1>Lịch sử đơn hàng</h1>
                        <p>Hiển thị danh sách đơn hàng tại đây.</p>
                  </div>

                  {allOrderUser.length === 0 ? (
                        <p>Không có đơn hàng nào.</p>
                  ) : (
                        <div className="orders">
                              <h2>Số lượng đơn hàng: {allOrderUser.length}</h2> {/* Hiển thị số lượng đơn hàng */}
                              {allOrderUser.reverse().map((order, index) => (
                                    <div key={order._id} className="order-card">
                                          <div className="order-header">
                                                <span className="order-number">Đơn hàng {index + 1}</span> {/* Số đơn hàng */}
                                                <h2>Mã đơn hàng: {order._id}</h2>
                                          </div>
                                          <p>
                                                Trạng thái:{" "}
                                                <span
                                                      className={
                                                            order.status === "Chưa thanh toán"
                                                                  ? "status-pending"
                                                                  : "status-paid"
                                                      }
                                                >
                                                      {order.status}
                                                </span>
                                          </p>
                                          <p>Cách thức thanh toán: {order.method}</p>
                                          <p>Ngày đặt: {new Date(order.createdAt).toLocaleString()}</p>
                                          <div className="products">
                                                {order.products.map((product) => (
                                                      <div key={product._id} className="product">
                                                            <img
                                                                  src={product.imageProduct}
                                                                  alt={product.nameProduct}
                                                                  className="product-image"
                                                            />
                                                            <div className="product-details">
                                                                  <h3>{product.nameProduct}</h3>
                                                                  <p>Giá: {product.priceProduct.toLocaleString()} VND</p>
                                                                  <p>Số lượng: {product.number}</p>
                                                            </div>
                                                      </div>
                                                ))}
                                          </div>
                                          {order.side_dishes && order.side_dishes.length > 0 ? (
                                                order.side_dishes.map((side_dish) => (
                                                      <div key={side_dish._id} className="product">
                                                            <img
                                                                  src={side_dish.image}
                                                                  alt={side_dish.name}
                                                                  className="product-image"
                                                            />
                                                            <div className="product-details">
                                                                  <h3>{side_dish.name}</h3>
                                                                  <p>Giá: {side_dish.price.toLocaleString()} VND</p>
                                                                  <p>Số lượng: {side_dish.number}</p>
                                                            </div>
                                                      </div>
                                                ))
                                          ) : (
                                                <p>Món thêm: không có</p>
                                          )}

                                    </div>
                              ))}
                        </div>
                  )}

            </>

      );
};

export default OrderHistoryUser;
