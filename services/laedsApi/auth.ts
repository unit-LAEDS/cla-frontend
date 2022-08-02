import { AxiosResponse } from "axios";
import { laedsApiInstance } from ".";
import { SignupData } from "./types";

export const laedsGithubSignIn = async () => {
  const response = await laedsApiInstance.post("/auth/github", {});

  return checkResponse(response);
};

export const laedsSignup = async (signupData: SignupData) => {
  const response = await laedsApiInstance.post("/auth/signup", signupData);

  return checkResponse(response);
};

const checkResponse = async (response: AxiosResponse) => {
  if (response.status >= 200 && response.status <= 299) {
    return await response.data;
  } else {
    throw new Error();
  }
};
