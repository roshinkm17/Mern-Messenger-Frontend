import axios from "./axios";

const initializeBackendForUser = (email) => {
    axios
      .post("/", { email: email })
      .then((res) => {})
      .catch((e) => console.log(e));
}

export {
    initializeBackendForUser,
}