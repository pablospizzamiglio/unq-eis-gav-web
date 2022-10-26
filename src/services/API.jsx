import axios from "axios";

const baseURL = "http://localhost:7070";

const API = {
  getAssistances: (kind) => {
    if (!kind) {
      return axios.get(`${baseURL}/assistances`);
    } else {
      return axios.get(`${baseURL}/assistances?kind=${kind}`);
    }
  },
  getUser: (id) => {
    return axios.get(`${baseURL}/user/${id}`);
  },
  createUser: (
    firstName,
    lastName,
    type,
    emailAddress,
    telephoneNumber
  ) =>
    axios.post(`${baseURL}/user`, {
      firstName,
      lastName,
      type,
      emailAddress,
      telephoneNumber
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
    axios.post(`${baseURL}/order`, {
      assistanceId,
      street,
      betweenStreets,
      city,
      province,
      phoneNumber,
      userId
    }),
  updateAssistanceOrder: (orderId, status, password) =>
    axios.put(`${baseURL}/order`, {
      orderId,
      status,
      password,
    }),
    getOrder: (id) => {
      return axios.get(`${baseURL}/order/${id}`);
    },
};

export default API;
