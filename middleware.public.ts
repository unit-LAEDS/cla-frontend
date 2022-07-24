import { NextMiddleware, NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware: NextMiddleware = async (request: NextRequest) => {
  if (request.nextUrl.pathname.startsWith("/settings")) {
    return NextResponse.rewrite(new URL("/settings/profile", request.url));
  }
};
