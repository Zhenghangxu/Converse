import { luciaInstance } from "@/app/_controller/lucia";
import { NextRequest, NextResponse } from "next/server";
export const POST = async (req: NextRequest) => {
  // 1. compare password
  // if password is correct
//   TODO

  const userId = "5dd6d34f-aea2-44c2-a1cd-a7b750d607d0";
  const userRole = "admin";
  const userEmail = "test@gmail.com";
  const session = await luciaInstance.createSession(userId, {
    email: userEmail,
    role: userRole,
  });
  return NextResponse.json(session);
};
