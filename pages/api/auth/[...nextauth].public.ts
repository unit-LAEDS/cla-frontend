import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { laedsGithubSignIn } from "services";

export default NextAuth({
  providers: [
    GithubProvider({
      id: "GitHubProvider",
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      id: "CredentialsProvider",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = { id: 1, name: "J Smith", email: "jsmith@example.com" };

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "GitHubProvider") {
        try {
          const response = await laedsGithubSignIn({
            id: user.id,
            name: user.name!,
            email: user.email!,
            image: user.image!,
            access_token: account.access_token!,
          });

          let access_token = response.data.access_token;

          account.access_token = access_token;

          return true;
        } catch (error) {
          return false;
        }
      }

      return false;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;

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
});
