export interface LaedsUser {
  username: string;
  image: string;
  name: string;
  email: string;
  bio: string;
  about: string | null;
  SocialMediaLinks: SocialMediaLink[];
}

export interface LaedsUsersProfiles {
  image: string;
  username: string;
  name: string;
  bio: string;
}

export interface SocialMediaLink {
  id: string;
  name: string;
  value: string;
}
