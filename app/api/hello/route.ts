import { NextResponse } from "next/server";

export async function GET(request: Request, response: NextResponse) {
  const currentTime = new Date().toLocaleTimeString();

  return new NextResponse(`Hello from API route at ${currentTime}`);
}
