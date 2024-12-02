import React, { useEffect, useState } from "react";
import { getAllOrder, updateStatusOrder } from "../../services/orderService";
import "./OrderHistory.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function OrderHistory() {
	const [allOrder, setAllOrder] = useState([]);

	const [selectPayment, setSelectPayment] = useState({
		id: "",
		startDate: "",
		endDate: "",
		userId: "",
	});

	const [originalOrders, setOriginalOrders] = useState([]);

	const searchParams = new URLSearchParams(window.location.search);
	const type = searchParams.get("type");
	const navigator = useNavigate();
	const fetchOrder = async () => {
		try {
			const response = await getAllOrder();
			console.log('check response', response.carts)
			if (response.errCode === 0 && type === "success") {
				await updateStatusOrder(response.carts[response.carts?.length - 1]._id);
				navigator("/");
				toast.success("Đã thanh toán thành công");
			}

			const sortedOrders = response.carts || [];

			// Sắp xếp theo createdAt, mới nhất lên đầu
			sortedOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
			setAllOrder(sortedOrders);
			setOriginalOrders(response.carts || []); // Lưu danh sách gốc
		} catch (error) {
			console.log("fetch cart error", error);
		}
	};

	let onChangeInput = (event, id) => {
		let copyState = { ...selectPayment };
		copyState[id] = event.target.value;
		console.log('check copyState', copyState)
		setSelectPayment({
			...copyState
		})
	}

	useEffect(() => {
		fetchOrder();
	}, [type]);

	const handleSearch = () => {
		const { startDate, endDate, id, userId } = selectPayment;

		if (id) {
			const filteredOrders = allOrder.filter(order => order._id.includes(id));
			setAllOrder(filteredOrders);
			return;
		}

		if (userId) {
			const filteredOrders = allOrder.filter(order => order.userId.includes(userId));
			setAllOrder(filteredOrders);
			return;
		}

		// Nếu người dùng chọn ngày
		if (startDate && endDate) {
			const filteredOrders = allOrder.filter(order => {
				const orderDate = new Date(order.createdAt);
				const start = new Date(startDate);
				const end = new Date(endDate);
				return orderDate >= start && orderDate <= end;
			});
			setAllOrder(filteredOrders);
			return;
		}

		alert("Vui lòng nhập mã đơn hàng, mã người dùng hoặc chọn khoảng thời gian!");
	};

	const handleTodayOrders = () => {
		const today = new Date();
		const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
		const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

		const todayOrders = originalOrders.filter(order => {
			const orderDate = new Date(order.createdAt);
			return orderDate >= startOfDay && orderDate < endOfDay;
		});

		setAllOrder(todayOrders);
	};

	return (

		<>
			<div className="home-container">
				<div className="home-wrapper">
					<h1>Trang chủ quản lý </h1>
					<div class="button-container">
						<a href="manageuser">
							<button class="custom-button">Quản lý người dùng</button>
						</a>
						<a href="product">
							<button class="custom-button">Quản lý sản phẩm </button>
						</a>
						<a href="payment">
							<button class="custom-button">Quản lý doanh thu, đơn hàng</button>
						</a>
					</div>
				</div>
			</div>

			<div className="select-payment">
				<div>
					<label>Từ ngày: </label>
					<input type="date" name="startDate" value={selectPayment.startDate}
						onChange={(event) => onChangeInput(event, 'startDate')}
					/>
					<label>Đến ngày: </label>
					<input type="date" name="endDate" value={selectPayment.endDate}
						onChange={(event) => onChangeInput(event, 'endDate')}
					/>
				</div>
				<div class="form-group">
					<label for="userId">Mã Người dùng</label>
					<input type="text" id="userId" placeholder="Nhập mã người dùng" userId="userId" value={selectPayment.userId}
						onChange={(event) => onChangeInput(event, 'userId')}
					/>
				</div>
				<div class="form-group">
					<label for="id">Mã đơn hàng</label>
					<input type="text" id="id" placeholder="Nhập mã đơn hàng" name="id" value={selectPayment.id}
						onChange={(event) => onChangeInput(event, 'id')}

					/>
				</div>
				<button className="search-button" onClick={handleSearch}>Tìm kiếm</button>

			</div>

			<div className="order-history">
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<button
						onClick={() => window.history.back()}
						style={{
							padding: "8px 16px",
							backgroundColor: "#4CAF50",
							color: "white",
							border: "none",
							borderRadius: "5px",
							cursor: "pointer",
						}}
					>
						Trở về
					</button>

					<h1>Lịch sử đơn hàng</h1>

					<button
						onClick={handleTodayOrders}
						style={{
							padding: "8px 16px",
							backgroundColor: "#2196F3",
							color: "white",
							border: "none",
							borderRadius: "5px",
							cursor: "pointer",
						}}
					>
						Xem đơn hàng hôm nay
					</button>

					<div />
				</div>

				{allOrder.length === 0 ? (
					<p>Không có đơn hàng nào.</p>
				) : (
					<div className="orders">
						{allOrder.map((order) => (
							<div key={order._id} className="order-card">
								<h2>Mã người đặt: {order.userId}</h2>
								<h2>Mã đơn hàng: {order._id}</h2>
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

								<div>

								</div>

								<h2>Món thêm</h2>

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

								<h2>Ghi chú: nhiều rau không hành</h2>

							</div>
						))}
					</div>
				)}
			</div>
		</>

	);
}

export default OrderHistory;
