import { cookies } from "next/headers";
import type { Session, User } from "lucia";
import { lucia } from "./lucia";
import CacheRq from "../_context/cache";

export const validateRequest = async (): Promise<
  | { user: User; session: Session }
  | { user: null; session: null }
  | { user: "cache"; session: "cache" }
> => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  const cache = cookies().get("lastAuth");
  if (cache) {
    return {
      user: "cache",
      session: "cache",
    };
  }
  if (!sessionId) {
    // console.log("no session cookie");
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);
  // next.js throws when you attempt to set cookie when rendering page
  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
      // set a cookie called "lastAuth" to store the last time the user was authenticated
      cacheResult();
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch {}
  return result;
};

const cacheResult = () => {
  cookies().set("lastAuth", "auth", {
    // secure: true,
    expires: new Date(new Date().getTime() + 1000 * 15 * 60),
    httpOnly: true,
  });
};
