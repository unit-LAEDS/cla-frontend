import { laedsApiInstance } from ".";

export const laedsGithubSignIn = async () => {
  const response = await laedsApiInstance.post("/auth/github", {});

  if (response.status >= 200 && response.status <= 299) {
    return await response.data;
  } else {
    throw new Error();
  }
};
