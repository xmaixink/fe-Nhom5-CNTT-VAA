import React, { useState, useEffect } from "react";
import "./AdminProduct.css";
import { createNewProductService, getAllProductService, deleteProductService, updateProduct } from '../services/productService'
import '../pages/Admin/HomeAdmin/HomeAdmin.css'
import { toast } from "react-toastify";

function AdminProduct() {
	const [fetchProducts, setfetchProducts] = useState([]);
	const [product, setProduct] = useState({
		id: "",
		name: "",
		image: "",
		description: "",
		ingredients: "",
		price: "",
	});

	const [actionEdit, setActionEdit] = useState(false)

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await getAllProductService("ALL");
				setfetchProducts(response.products); // Lưu dữ liệu vào state
			} catch (error) {
				console.log('fetch User error', error)
			}

		}

		fetchProduct();

	}, [])


	let onChangeInput = (event, id) => {
		let copyState = { ...product };
		copyState[id] = event.target.value;
		setProduct({
			...copyState
		})
	}

	let checkValidateInput = () => {
		let isValid = true;
		let arrCheck = ['name', 'price', 'image', 'description', 'ingredients']
		for (let i = 0; i < arrCheck.length; i++) {
			if (!product[arrCheck[i]]) {
				isValid = false;
				alert('This input is required: ' + arrCheck[i])
				break;
			}
		}

		return isValid;
	}

	let handleSaveProductAndEdit = async () => {
		if (actionEdit === false) {
			let userValid = checkValidateInput();
			if (userValid === false) return;
			try {
				const response = await createNewProductService(product);
				console.log('check response', response)
				if (response && response.errCode === 0) {
					const getALLProduct = await getAllProductService("ALL");
					setfetchProducts(getALLProduct.products);
					setProduct({
						name: "",
						image: "",
						description: "",
						ingredients: "",
						price: "",
					});
					toast.success("Tạo sản phẩm thành công");

				}

			} catch (error) {
				console.error('Error adding user:', error);
			}
		} else {
			try {
				const response = await updateProduct(product);
				console.log('check response', response)
				if (response && response.errCode === 0) {
					const getALLProduct = await getAllProductService("ALL");
					setfetchProducts(getALLProduct.products);
					setProduct({
						name: "",
						image: "",
						description: "",
						ingredients: "",
						price: "",
					});
					toast.success("Sửa sản phẩm thành công");

				}
				setActionEdit(false);
			} catch (error) {
				console.error('Error saving user:', error);
			}
		}
	}

	let handleDeleteProduct = async (id) => {
		const deleteUser = deleteProductService(id);
		if (deleteUser) {
			setfetchProducts(prevProducts => prevProducts.filter(product => product._id !== id));
			toast.success("Xoá sản phẩm thành công");
		}
	}

	let handleEditProduct = (item) => {
		console.log('check item', item)
		setProduct({
			id: item._id,
			name: item.name,
			image: item.image,
			description: item.description,
			ingredients: item.ingredients,
			price: item.price,
		})
	}

	return (
		<>


			<div>

				<div className="admin-background"></div>
				<div className="admin-container">

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

					<h3 className="admin-title">THÊM MỚI SẢN PHẨM </h3>
					<div className="form-row">
						<input
							type="text"
							placeholder="Name product"
							name="name"
							value={product.name}
							onChange={(event) => { onChangeInput(event, 'name') }}
						/>
						<input
							type="text"
							placeholder="Image"
							name="image"
							value={product.image}
							onChange={(event) => { onChangeInput(event, 'image') }}

						/>
						<input
							type="text"
							placeholder="Description"
							name="description"
							value={product.description}
							onChange={(event) => { onChangeInput(event, 'description') }}

						/>
						<input
							type="text"
							placeholder="Ingredients"
							name="ingredients"
							value={product.ingredients}
							onChange={(event) => { onChangeInput(event, 'ingredients') }}

						/>
						<input
							type="number"
							placeholder="Price"
							name="price"
							value={product.price}
							onChange={(event) => { onChangeInput(event, 'price') }}

						/>
						<button type="submit" /*className="save-button" */
							className={actionEdit === true ? "edit-button" : "save-button"}
							onClick={() => handleSaveProductAndEdit()}
						>
							{actionEdit === false ? "Thêm mới" : " Sửa sản phẩm"}
						</button>
					</div>


					<table className="admin-table">
						<thead>
							<tr>
								<th>Name product</th>
								<th>Image</th>
								<th>Description</th>
								<th>Ingredients</th>
								<th>Price</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{fetchProducts.map((prod, index) => (
								<tr key={index}>
									<td>{prod.name}</td>
									<td>
										<img
											src={prod.image}
											alt={prod.name}
											style={{ width: "100px", height: "auto" }}
										/>
									</td>
									<td>{prod.description}</td>
									<td>{prod.ingredients}</td>
									<td>{prod.price}</td>
									<td>
										<div className="action-buttons">
											<button
												className="edit-button"
												onClick={() => {
													handleEditProduct(prod)
													setActionEdit(true)
												}}

											>
												Update
											</button>
											<button
												className="delete-button"
												onClick={() => handleDeleteProduct(prod._id)}
											>
												Delete
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>


		</>

	);
}

export default AdminProduct;
