import axios from "../axios";

const getAllOrder = () => {
  return axios.get(`/api/get-all-order`);
};

const createNewOrder = (data) => {
  return axios.post("/api/create-new-order", data);
};
const updateStatusOrder = (orderId) => {
  return axios.post(`/api/update-status-order/${orderId}`);
};

export { createNewOrder, getAllOrder, updateStatusOrder };
