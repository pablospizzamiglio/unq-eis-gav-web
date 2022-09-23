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
};

export default API;
