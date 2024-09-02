"use server";

import { lucia } from "../_auth/lucia";
import { type returnData } from "./signUp";
import { cookies } from "next/headers";
import { validateRequest } from "../_auth/validate-request";

export async function SignOut(): Promise<returnData> {
  const emptyCookie = lucia.createBlankSessionCookie();
  let result:any;
  try {
   result = await validateRequest();
  } catch (error) {
    return { userOutput: null, status: 500 } as returnData;
  }
  if (cookies().get("lastAuth")) {
    cookies().delete("lastAuth");
  }
  if (result.session) {
    lucia.invalidateSession(result.session.id);
    cookies().set(emptyCookie.name, emptyCookie.value, emptyCookie.attributes);
  } else {
    return { userOutput: null, status: 401 } as returnData;
  }

  return {
    userOutput: result.user,
    status: 200,
  } as returnData;
}
