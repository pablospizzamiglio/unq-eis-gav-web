import axios from "axios";

const baseURL = "http://localhost:7070";

const API = {
  getAssistances: (kind) => {
    if (!kind) {
      return axios.get(`${baseURL}/assistance`);
    } else {
      return axios.get(`${baseURL}/assistance?kind=${kind}`);
    }
  },
  getUser: (id) => {
    return axios.get(`${baseURL}/users/${id}`);
  },
  createUser: (firstName, lastName, type, emailAddress, telephoneNumber) =>
    axios.post(`${baseURL}/users`, {
      firstName,
      lastName,
      type,
      emailAddress,
      telephoneNumber,
    }),
  createAssistanceOrder: (
    assistanceId,
    street,
    betweenStreets,
    city,
    province,
    phoneNumber,
    userId
  ) =>
    axios.post(`${baseURL}/orders`, {
      assistanceId,
      street,
      betweenStreets,
      city,
      province,
      phoneNumber,
      userId,
    }),
  updateAssistanceOrder: (orderId, status, kmTraveled, password) =>
    axios.put(`${baseURL}/orders`, {
      orderId,
      status,
      kmTraveled,
      password,
    }),
  getOrder: (id) => {
    return axios.get(`${baseURL}/orders/${id}`);
  },
  getOrders: (status) => {
    if (!status) {
      return axios.get(`${baseURL}/orders`);
    } else {
      return axios.get(`${baseURL}/orders?status=${status.join(",")}`);
    }
  },
};

export default API;
