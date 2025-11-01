"use server";
// import { API_BASE_URL } from "@/app/constants/httpCode";
import { decrypt } from "@/app/libs/session";
import axios, { AxiosResponse } from "axios";
import { cookies } from "next/headers";

const SUCCESS_CODE = 200;
const CREATED_CODE = 201;

interface fetchPrpos {
  endpoint: string;
  data?: any;
  method?: "GET" | "POST" | "PATCH" | "DELETE";
}

export const getData = async (endpoint: fetchPrpos): Promise<any> => {
  const token = await verifyTokenExiste();
  return axios({
    method: endpoint.method || "GET",
    url: process.env.NEXT_PUBLIC_API_URL + endpoint.endpoint,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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

export const successResponse = async (res) => {
  return {
    status: res.status,
    data: res.data,
  };
};

const errorResponse = (err) => {
  if (err.code === "ECONNREFUSED") {
    return {
      status: 503,
      data: "",
    };
  }
  if (err.status == 401) deleteUserSession(err.response);
  return {
    status: err.response?.status,
    error: err.response?.data,
  };
};

const verifyTokenExiste = async () => {
  const cookie = (await cookies()).get("session")?.value;
  const { user } = await decrypt(cookie);
  return user?.access_token;
};

const deleteUserSession = async (response: any) => {
  if (response.status == 401) (await cookies()).delete("session");
};

export default getData;
