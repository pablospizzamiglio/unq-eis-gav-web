import axios from "axios";

const baseURL = "http://localhost:7070";

const API = {
  getAssistances: () => axios.get(`${baseURL}/assistances`),
};

export default API;
