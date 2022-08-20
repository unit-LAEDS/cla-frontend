import NextAuth, { DefaultSession } from "next-auth";
import { SocialMediaLink } from "services";

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      bio: string;
      about: string | null;
      SocialMediaLinks: SocialMediaLink[];
      scopes: string[];
    } & DefaultSession["user"];
  }
}
