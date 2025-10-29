import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api/v1";
const SUCCESS_CODE = 200;
const CREATED_CODE = 201;

interface fetchPrpos {
  endpoint: string;
  data?: any;
}

export const getData = async (endpoint: fetchPrpos) => {
  // const token = await verifyTokenExiste();
  return axios({
    method: "GET",
    url: API_BASE_URL + endpoint.endpoint,
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return successResponse(res);
    })
    .catch((err) => {
      console.log("errorResponse", err);
      return errorResponse(err);
    });
};

export const fetchSuccess = (status: number) => {
  return [SUCCESS_CODE, CREATED_CODE].includes(status);
};
export default getData;

const successResponse = (res) => {
  console.log("successResponse", res.data);
  return {
    status: res.status,
    data: res.data,
  };
};

const errorResponse = (err) => {
  console.log("successResponse", err.response?.data);
  return {
    status: err.response?.status,
    error: err.response?.data,
  };
};
