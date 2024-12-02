import axios from "../axios";

const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};

const getUserService = (userId) => {
  return axios.get(`/api/get-all-users/?id=${userId}`);
};

const deleteUserService = (userId) => {
  console.log('check userId', userId)
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};

const updateUser = (inputData) => {
  return axios.put("/api/update-user", inputData);
};

const getVendorService = (vendorId) => {
  return axios.get(`/api/get-all-vendors/?id=${vendorId}`);
};
const userLogin = (formData) => {
  return axios.post("/api/login", formData);
};
const userRegister = (formData) => {
  return axios.post("/api/register", formData);
};
export {
  createNewUserService, deleteUserService, getUserService, getVendorService, updateUser, userLogin,
  userRegister
};

