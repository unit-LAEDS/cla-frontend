export type UpdateUserProfile = {
  name: string;
  bio: string;
  about: string;
  socialMediaLinks: socialMediaLink[];
};

type socialMediaLink = {
  name: string;
  value: string;
};
