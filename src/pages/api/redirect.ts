import { NextResponse, type NextRequest } from "next/server";

export default function handler(req: NextRequest, res: NextResponse) {
  return NextResponse.redirect("https://nextjs.org/docs");
}
