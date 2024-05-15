import axios from "axios";

const server = "https://crm.mangotech-api.com/api";


const instance = axios.create({
  baseURL: server,
});

instance.interceptors.request.use((request) => {
  let user = JSON.parse(localStorage.getItem("user"));
  let token = user?.token;
  request.headers = {
    Accept: "application/json, text/plain, */*",
    Authorization: `Bearer ${token}`,
  };
  return request;
});

instance.interceptors.response.use(
  (response) => {
    if (response) {
      return response;
    }
  },
  function (error) {
    // *For unAuthorized
    // if (error.response.status === 401) {
    //   localStorage.clear()
    // }
    return Promise.reject(error);
  }
);

export default instance;
