import { AxiosResponse } from "axios";
import { laedsApiInstance, LaedsDefaultResponse } from ".";
import { LaedsUser, LaedsUsersProfiles } from "./interfaces";
import { UpdateUserProfile } from "./types";

export const laedsGetUserScope = async (access_token: string) => {
  const response = await laedsApiInstance.get("/user/scope", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return checkResponse(response);
};

export const laedsGetUserProfile = async (access_token: string) => {
  const response = await laedsApiInstance.get("/user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const laedsResponse = await checkResponse(response);

  return laedsResponse.data as LaedsUser;
};

export const laedsGetUsernames = async () => {
  const response = await laedsApiInstance.get("/user/usernames");

  const laedsResponse = await checkResponse(response);

  return laedsResponse.data as {
    username: string;
  }[];
};

export const laedsGetUser = async (username: string) => {
  const response = await laedsApiInstance.get(`/user/${username}`);

  const laedsResponse = await checkResponse(response);

  return laedsResponse.data as LaedsUser;
};

export const laedsFindUsernameOrEmail = async (username: string) => {
  const response = await laedsApiInstance.get(
    `/user/username-email/${username}`
  );

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

export const laedsPostSignin = async (username: string, password: string) => {
  const response = await laedsApiInstance.post("/auth/signin", {
    username,
    password,
  });
  const laedsResponse = await checkResponse(response);

  return laedsResponse.data;
};

export const laedsGetUsersProfiles = async () => {
  const response = await laedsApiInstance.get("/user/profiles");

  const laedsResponse = await checkResponse(response);

  return laedsResponse.data as LaedsUsersProfiles[];
};

const checkResponse = async (response: AxiosResponse) => {
  if (response.status >= 200 && response.status <= 299) {
    return (await response.data) as LaedsDefaultResponse;
  } else {
    throw new Error(response.data);
  }
};
