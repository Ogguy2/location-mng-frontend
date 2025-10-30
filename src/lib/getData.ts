import axios, { AxiosResponse } from "axios";

const API_BASE_URL = "http://localhost:8081/api/v1";
const SUCCESS_CODE = 200;
const CREATED_CODE = 201;

interface fetchPrpos {
  endpoint: string;
  data?: any;
  method?: "GET" | "POST" | "PATCH" | "DELETE";
}

export const getData = async (endpoint: fetchPrpos): Promise<any> => {
  // const token = await verifyTokenExiste();
  return axios({
    method: endpoint.method || "GET",
    url: API_BASE_URL + endpoint.endpoint,
    headers: {
      "Content-Type": "application/json",
    },
    data: endpoint.data || {},
  })
    .then((res) => {
      return successResponse(res);
    })
    .catch((err) => {
      console.error("Error in getData:", err);
      return errorResponse(err);
    });
};

export const fetchSuccess = (status: number) => {
  return [SUCCESS_CODE, CREATED_CODE].includes(status);
};
export default getData;

const successResponse = (res: AxiosResponse) => {
  return {
    status: res.status,
    data: res.data,
  };
};

const errorResponse = (err: any) => {
  return {
    status: err.response?.status,
    error: err.response?.data,
  };
};
