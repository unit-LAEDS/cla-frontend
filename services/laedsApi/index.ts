import axios from "axios";
import { getSession } from "next-auth/react";

export const laedsApiInstance = axios.create({
  baseURL: process.env.LAEDS_API,
});

// https://github.com/nextauthjs/next-auth/discussions/3550
laedsApiInstance.interceptors.request.use(async config => {
  const session = await getSession();

  if (session) {
    config.headers!.Authorization = `Bearer ${session.accessToken}`;
  }

  return config;
});

export interface LaedsDefaultResponse {
  code: number;
  message: string;
  data: any;
}

export * from "./auth";
export * from "./user";
export * from "./interfaces";
