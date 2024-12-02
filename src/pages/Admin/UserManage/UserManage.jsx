import React, { useEffect, useState } from "react";
import './UserManage.css'
import { createNewUserService, getUserService, deleteUserService, updateUser } from '../../../services/userService.js'
import { toast } from "react-toastify";

const UserManage = () => {

      const [dataUser, setDataUser] = useState({
            idEditUser: '',
            id: "",
            email: '',
            password: '',
            name: '',
            address: ''
      });

      const [actionEdit, setActionEdit] = useState(false)

      const [fetchUserData, setFetchUserData] = useState([])

      useEffect(() => {
            // console.log('check fail')
            const fetchUser = async () => {
                  try {
                        const response = await getUserService("ALL");
                        setFetchUserData(response.users); // Lưu dữ liệu vào state
                  } catch (error) {
                        console.log('fetch User error', error)
                  }

            }

            fetchUser();

      }, [])

      let onChangeInput = (event, id) => {
            let copyState = { ...dataUser };
            copyState[id] = event.target.value;
            setDataUser({
                  ...copyState
            })
      }

      let checkValidateInput = () => {
            let isValid = true;
            let arrCheck = ['email', 'password', 'name', 'address']
            for (let i = 0; i < arrCheck.length; i++) {
                  if (!dataUser[arrCheck[i]]) {
                        isValid = false;
                        alert('This input is required: ' + arrCheck[i])
                        break;
                  }
            }

            return isValid;
      }

      let handleSaveUserAndEdit = async () => {
            console.log('check actionEdit', actionEdit)
            if (actionEdit === false) {
                  let userValid = checkValidateInput();

                  if (userValid === false) return;
                  try {
                        const response = await createNewUserService(dataUser);
                        console.log('check response', response)
                        if (response && response.errCode === 0) {
                              const getALLUser = await getUserService("ALL");
                              setFetchUserData([...fetchUserData, getALLUser.user]);
                              setDataUser({
                                    email: '',
                                    password: '',
                                    name: '',
                                    // address: ''
                              });
                        }

                  } catch (error) {
                        console.error('Error adding user:', error);
                  }
            } else {
                  try {
                        const response = await updateUser(dataUser);
                        console.log('check response', response)

                        setDataUser({
                              email: '',
                              password: '',
                              name: '',
                              // address: ''
                        });
                        setActionEdit(false);
                  } catch (error) {
                        console.error('Error saving user:', error);
                  }
            }

      }

      let handleDeleteUser = async (id) => {
            const deleteUser = await deleteUserService(id);
            console.log('check deleteUser', deleteUser)
            if (deleteUser) {
                  console.log('check ok')
                  setFetchUserData(prevProducts => prevProducts.filter(product => product._id !== id));
                  toast.success("Tạo sản phẩm thành công");
            }
      }

      let handleUpdateUser = async (item) => {
            console.log('check item', item)
            setDataUser({
                  id: item.id,
                  idEditUser: item.id,
                  email: item.email,
                  name: item.name,
                  // address: item.address,
            })
      }

      return (
            <>
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

                  {/* <div className='content-container'>
                              <div className='title' style={{ margin: "10px" }}>
                                    Thêm mới người dùng
                              </div>

                              <div className="user-body" style={{ margin: "10px 120px" }}>
                                    <div className="container">
                                          <div className="row">
                                                <div className="col-3 ">
                                                      <label> Email</label>
                                                      <input className='form-control' type="email"
                                                            value={dataUser.email}
                                                            onChange={(event) => { onChangeInput(event, 'email') }}
                                                      />
                                                </div>
                                                <div className="col-3">
                                                      <label> Mật khẩu</label>
                                                      <input className='form-control' type="text"
                                                            onChange={(event) => { onChangeInput(event, 'password') }}
                                                      />
                                                </div>
                                                <div className="col-3">
                                                      <label>Tên</label>
                                                      <input className='form-control' type="text"
                                                            value={dataUser.name}
                                                            onChange={(event) => { onChangeInput(event, 'name') }}
                                                      />
                                                </div>
                                                <div className="col-3">
                                                      <label>Address</label>
                                                      <input className='form-control' type="text"
                                                            value={dataUser.address}
                                                            onChange={(event) => { onChangeInput(event, 'address') }}
                                                      />
                                                </div>
                                                <div className="col-12 my-3">
                                                      <button
                                                            className={actionEdit === true ? "btn btn-warning" : "btn btn-primary"}
                                                            onClick={() => handleSaveUserAndEdit()}
                                                      >Lưu user</button>
                                                </div>
                                          </div>
                                    </div>
                              </div>


                        </div> */}

                  <table id="TableManageUser" >
                        <tbody>
                              <tr>
                                    <th>ID </th>
                                    <th>Email</th>
                                    <th>Name</th>
                                    <th>Phone Number</th>
                                    <th>Actions</th>
                              </tr>
                              {fetchUserData && fetchUserData.length > 0 &&
                                    fetchUserData.map((item, index) => {
                                          if (!item || !item.email || !item.name) {
                                                return null; // Bỏ qua nếu item không hợp lệ
                                          }
                                          return (
                                                <tr key={index}>
                                                      <td>{item._id}</td>
                                                      <td>{item.email}</td>
                                                      <td>{item.name}</td>
                                                      <td>{item.phoneNumber}</td>
                                                      {/* <td>{item.address}</td> */}
                                                      <td>
                                                            <button
                                                                  onClick={() => {
                                                                        handleUpdateUser(item);
                                                                        setActionEdit(true)
                                                                  }}
                                                                  className="btn-edit" > <i className="fas fa-edit"></i> </button>
                                                            <button
                                                                  onClick={() => handleDeleteUser(item._id)}
                                                                  className="btn-delete" > <i className="fas fa-trash"></i> </button>
                                                      </td>
                                                </tr>
                                          )
                                    })

                              }

                        </tbody>
                  </table >
            </>
      );
};

export default UserManage;
