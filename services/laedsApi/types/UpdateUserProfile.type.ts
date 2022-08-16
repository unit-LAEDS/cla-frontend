export type UpdateUserProfile = {
  image?: string;
  name: string;
  bio: string;
  about: string;
  socialMediaLinks: socialMediaLink[];
};

type socialMediaLink = {
  name: string;
  value: string;
};
