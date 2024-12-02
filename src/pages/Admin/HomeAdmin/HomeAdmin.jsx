import React, { useEffect, useState } from "react";
import './HomeAdmin.css'

const HomeAdmin = () => {

	return (
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
	);
};

export default HomeAdmin;
