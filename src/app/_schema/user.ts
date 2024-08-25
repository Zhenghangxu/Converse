import { type DatabaseUser } from "lucia";
export interface UserType {
  // observe how dynamo db assign metadata to the user object
  id?: string;
  name?: string;
  email: string;
  password: string;
  role: string;
  // createdAt: Date;
  // updatedAt: Date;
}

export interface UserInputType extends DatabaseUser {}
