import axios from "axios";

const instance = axios.create({
  baseURL: "https://mernstackwhatsapp.herokuapp.com",
});

export default instance;