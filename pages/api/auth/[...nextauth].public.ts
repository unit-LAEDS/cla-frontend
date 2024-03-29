import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import {
  laedsGetUserProfile,
  laedsGetUserScope,
  laedsGithubSignIn,
  laedsPostSignin,
} from "services";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // const user = { id: 1, name: "J Smith", email: "jsmith@example.com" };
        const response: any = await laedsPostSignin(
          credentials?.username!,
          credentials?.password!
        );

        if (response) {
          return response;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "github") {
        try {
          const response = await laedsGithubSignIn({
            id: user.id,
            name: user.name!,
            email: user.email!,
            image: user.image!,
            access_token: account.access_token!,
            githubLink: profile.html_url as string,
            bio: profile.bio as string,
          });

          let access_token = response.data.access_token;

          account.access_token = access_token;

          return true;
        } catch (error) {
          return false;
        }
      }

      if (account.provider === "credentials") {
        account.access_token = user.access_token as string;

        return true;
      }
      return false;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }

      if (token.accessToken) {
        try {
          const access_token = token.accessToken as string;
          const response = await laedsGetUserScope(access_token);
          const scopes = response.data.scope as string[];

          token.scopes = scopes;
        } catch (error) {
          console.log(error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      let accessToken = token.accessToken as string;

      if (accessToken) {
        session.accessToken = accessToken;

        const laedsUser = await laedsGetUserProfile(accessToken);

        session.user = {
          username: laedsUser.username,
          name: laedsUser.name,
          email: laedsUser.email,
          image: laedsUser.image,
          bio: laedsUser.bio,
          about: laedsUser.about,
          SocialMediaLinks: laedsUser.SocialMediaLinks,
          scopes: token.scopes as string[],
        };
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET,
};

export default NextAuth(authOptions);
