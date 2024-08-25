import { UserType } from "@/app/_schema/user";

declare module "lucia" {
  interface User extends UserType {}
  interface DatabaseUser {
    id: string;
    attributes: UserType;
  }
  interface Register {
    Lucia: typeof lucia;
  }
}
