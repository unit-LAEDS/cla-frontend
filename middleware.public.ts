import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextMiddleware, NextResponse } from "next/server";

const secret = process.env.SECRET;
const BASE_URL = process.env.NEXTAUTH_URL;

export const middleware: NextMiddleware = async (req: NextRequest) => {
  const token = await getToken({
    req,
    secret,
  });
  let scopes: string[];

  const startsWith = (path: string) => req.nextUrl.pathname.startsWith(path);
  const redirect = (path: string) =>
    NextResponse.redirect(new URL(path, req.url));
  const rewrite = (path: string) =>
    NextResponse.rewrite(new URL(path, req.url));

  if (token) {
    scopes = token.scopes as string[];

    if (scopes.includes("update:username") && !startsWith("/select-username")) {
      return redirect("/select-username");
    } else if (
      !scopes.includes("update:username") &&
      startsWith("/select-username")
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

    if (startsWith("/settings")) {
      return redirect("/auth/signin");
    }
  }
};

export const config = {
  matcher: ["/", "/select-username", "/settings/:path*", "/user/:path*"],
};
