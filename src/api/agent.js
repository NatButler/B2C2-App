import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers = {
  Authorization: `${process.env.REACT_APP_API_TOKEN}`,
  Accept: "application/json",
};

axios.interceptors.response.use(undefined, (error) => {
  if (
    (error.message === "Network Error" && !error.response) ||
    error.response.status === 500
  ) {
    // Handle the situation
  }

  return Promise.reject(error);
});

const responseBody = (response) => response.data;

const requests = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
};

const quotes = {
  instruments: () => requests.get("/instruments/"),
  rfq: (payload) => requests.post("/request_for_quote/", payload),
  trade: (payload) => requests.post("/trade/", payload),
  balance: () => requests.get("/balance/"),
  ledger: () => requests.get("/trade/"),
};

export default {
  quotes,
};
