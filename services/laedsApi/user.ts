import { AxiosResponse } from "axios";
import { laedsApiInstance } from ".";

export const laedsGetUserScope = async () => {
  const response = await laedsApiInstance.get("/user/scope");

  return checkResponse(response);
};

export const laedsSetUsername = async (username: string) => {
  const response = await laedsApiInstance.put("/user/set-username", {
    username,
  });

  return checkResponse(response);
};

const checkResponse = async (response: AxiosResponse) => {
  if (response.status >= 200 && response.status <= 299) {
    return await response.data;
  } else {
    throw new Error();
  }
};
