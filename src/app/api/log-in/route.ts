import { addUser } from "@/app/_controller/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { email, password } = await req.json();
  const role = "user";
  return addUser({
    email,
    password,
    role,
  })
    .then((res) =>
      NextResponse.json({
        status: res.status,
      })
    )
    .catch((err) =>
      NextResponse.json({
        error: err.message,
      })
    );
}
