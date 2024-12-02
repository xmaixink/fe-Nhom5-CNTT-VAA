import axios from '../axios';

const getAllSideDishService = (id) => {
      return axios.get(`/api/get-all-side-dishes/?id=${id}`);
};

const createNewSideDishService = (data) => {
      return axios.post('/api/create-side-dish', data);
};
const deleteSideDishService = (id) => {
      return axios.delete(`/api/delete-side-dish/${id}`);
};

const updateSideDishService = (id, data) => {
      return axios.put(`/api/update-side-dish/${id}`, data);
};

export { createNewSideDishService, deleteSideDishService, getAllSideDishService, updateSideDishService };
