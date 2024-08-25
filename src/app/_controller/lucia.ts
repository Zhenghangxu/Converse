import { Lucia } from "lucia";
import { adapter } from "./lucia-dynamodb-adapter";

export const luciaInstance = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      // secure: process.env.NODE_ENV === "production",
      secure: false,
    },
  },
});