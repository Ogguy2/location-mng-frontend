"use server";
// import { API_BASE_URL } from "@/app/constants/httpCode";
import { decrypt } from "@/app/libs/session";
import axios, { AxiosResponse } from "axios";
import EventEmitter from "events";
import { cookies } from "next/headers";

const SUCCESS_CODE = 200;
const CREATED_CODE = 201;

interface fetchPrpos {
  endpoint: string;
  data?: any;
  method?: any;
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
      return errorResponse(err);
    });
};

export const successResponse = async (res : any) => {
  console.log("red", res.data);
  return {
    status: res.status,
    data: res.data,
  };
};

const errorResponse = (err : any) => {
  if (err.code === "ECONNREFUSED") {
    return {
      status: 503,
      data: "",
    };
  }
  if (err.status == 401) deleteUserSession(err.response);
  console.log("err", err.response?.data);
  return {
    status: err.response?.status,
    error: err.response?.data,
  };
};

const verifyTokenExiste = async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  return (session?.user as any)?.access_token;
};

const deleteUserSession = async (response: any) => {
  if (response.status == 401) (await cookies()).delete("session");
};

export default getData;
