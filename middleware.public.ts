import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextMiddleware, NextResponse } from "next/server";
import { availableScopes } from "scopes";

const secret = process.env.SECRET;
const BASE_URL = process.env.NEXTAUTH_URL;

export const middleware: NextMiddleware = async (req: NextRequest) => {
  const token = await getToken({
    req,
    secret,
  });
  const scopes = availableScopes;

  let userScopes: string[];

  const startsWith = (path: string) => req.nextUrl.pathname.startsWith(path);
  const redirect = (path: string) =>
    NextResponse.redirect(new URL(path, req.url));
  const rewrite = (path: string) =>
    NextResponse.rewrite(new URL(path, req.url));

  if (token) {
    userScopes = token.scopes as string[];

    if (
      userScopes.includes(scopes.create_username) &&
      !startsWith("/select-username")
    ) {
      return redirect("/select-username");
    } else if (
      !userScopes.includes(scopes.create_username) &&
      startsWith("/select-username")
    ) {
      return redirect("/");
    }

    if (
      userScopes.includes(scopes.create_profile) &&
      !startsWith("/create-profile")
    ) {
      return redirect("/create-profile");
    } else if (
      !userScopes.includes(scopes.create_profile) &&
      startsWith("/create-profile")
    ) {
      return redirect("/");
    }

    if (startsWith("/settings")) {
      return rewrite("/settings/profile");
    }
  }

  if (!token) {
    if (startsWith("/select-username")) {
      return redirect("/");
    }

    if (startsWith("/create-profile")) {
      return redirect("/");
    }

    if (startsWith("/settings")) {
      return redirect("/auth/signin");
    }
  }
};

export const config = {
  matcher: [
    "/",
    "/select-username",
    "/create-profile",
    "/settings/:path*",
    "/user/:path*",
  ],
};
