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
  createAssistanceOrder: (
    assistanceId,
    street,
    betweenStreets,
    city,
    province,
    phoneNumber
  ) =>
    axios.post(`${baseURL}/order`, {
      assistanceId,
      street,
      betweenStreets,
      city,
      province,
      phoneNumber,
    }),
    updateAssistanceOrder: (
      orderId,
      status,
      password
    ) =>
      axios.put(`${baseURL}/order`, {
        orderId,
        status,
        password
      }),
};

export default API;
