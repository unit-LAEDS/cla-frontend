import { AxiosResponse } from "axios";
import { laedsApiInstance, LaedsDefaultResponse } from ".";
import { UpdateUserProfile } from "./types";
import { LaedsUser } from "./interfaces";

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

export const laedsPostUpdateUserProfile = async (
  updateUserProfile: UpdateUserProfile
) => {
  const response = await laedsApiInstance.post("/user", updateUserProfile);

  return checkResponse(response);
};

export const laedsGetUser = async () => {
  const response = await laedsApiInstance.get("/user");
  const laedsResponse = await checkResponse(response);

  return laedsResponse.data as LaedsUser;
};

const checkResponse = async (response: AxiosResponse) => {
  if (response.status >= 200 && response.status <= 299) {
    return (await response.data) as LaedsDefaultResponse;
  } else {
    throw new Error(response.data);
  }
};
