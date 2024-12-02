import axios from "../axios";

const getAllCart = () => {
  return axios.get(`/api/get-all-cart`);
};

const createNewCart = (data) => {
  return axios.post("/api/create-new-cart", data);
};

const deleteCart = (cartId) => {
  return axios.delete("/api/delete-cart", {
    data: {
      id: cartId,
    },
  });
};
const updateCart = (data) => {
  return axios.put("/api/update-cart", data);
};
export { createNewCart, deleteCart, getAllCart, updateCart };
