"use server";

import { addUser } from "@/app/_controller/user";
import { revalidatePath } from "next/cache";
import { lucia, purgeRemainingSessions } from "./_auth/lucia";
import { cookies } from "next/headers";

export interface returnData {
  userOutput?: any;
  status?: number;
}

export async function signUp(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = "user";
  try {
    const res = await addUser({ email, password, role });
    revalidatePath("/");
    if (!res?.userOutput) {
      return res
    }
    // await purgeRemainingSessions();
    const session = await lucia.createSession(res.userOutput.id, {
      email,
      role,
    });
    return res
  } catch (err: any) {
    return {
      userOutput: null,
      status: 500,
    };
  }
}
