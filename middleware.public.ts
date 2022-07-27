import { NextMiddleware, NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.SECRET;

export const middleware: NextMiddleware = async (req: NextRequest) => {
  const token = await getToken({
    req,
    secret,
  });

  if (req.nextUrl.pathname.startsWith("/settings")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    return NextResponse.rewrite(new URL("/settings/profile", req.url));
  }
};
