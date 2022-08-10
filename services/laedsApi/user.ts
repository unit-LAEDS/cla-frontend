import { AxiosResponse } from "axios";
import { laedsApiInstance } from ".";

export const laedsGetUserScope = async (access_token: string) => {
  const response = await laedsApiInstance.get("/user/scope", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return checkResponse(response);
};

export const laedsFindUsername = async (username: string) => {
  const response = await laedsApiInstance.get(`/user/username/${username}`);

  return checkResponse(response);
};

export const laedsSetUsername = async (username: string) => {
  const response = await laedsApiInstance.put("/user/select-username", {
    username,
  });

  return checkResponse(response);
};

const checkResponse = async (response: AxiosResponse) => {
  if (response.status >= 200 && response.status <= 299) {
    return await response.data;
  } else {
    throw new Error(response.data);
  }
};
