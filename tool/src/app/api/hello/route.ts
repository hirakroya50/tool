import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello, world!---->form nextjs api" });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name } = body;

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  return NextResponse.json({
    message: `Hello -----> form nextjs api, ${name}!`,
  });
}
