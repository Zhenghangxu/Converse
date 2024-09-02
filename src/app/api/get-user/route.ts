import { getUserbyId } from "@/app/_controller/user";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const result = await getUserbyId(email);
  if (!result.Item) {
    return NextResponse.json(
      { user: null, error: "User not found" },
      { status: 404 }
    );
  }
  return NextResponse.json({ ...result.Item });
}
