export interface LaedsUser {
  image: string;
  name: string;
  bio: string;
  about: string | null;
  SocialMediaLinks: SocialMediaLink[];
}

export interface SocialMediaLink {
  id: string;
  name: string;
  value: string;
}
