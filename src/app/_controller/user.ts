import { UserType } from "../_schema/user";
import {
  GetItemCommand,
  GetItemCommandInput,
  PutItemCommand,
  PutItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import { DDClient } from "./database";
import { uuid } from "../lib/uuid";
const bcrypt = require("bcrypt");

export const saltRounds = 10;

export const addUser = async (user: UserType) => {
  const inputItemInput: PutItemCommandInput = {
    Item: {
      id: {
        S: uuid(),
      },
      email: {
        S: user.email,
      },
      password: {
        S: await bcrypt.hash(user.password, saltRounds),
      },
      name: {
        S: user.name || "",
      },
      role: {
        S: user.role,
      },
      createAt: {
        S: new Date().getTime().toString(),
      },
    },
    ConditionExpression:
      "attribute_not_exists(id) AND attribute_not_exists(email)",
    TableName: process.env.NEXT_PUBLIC_DYNAMODB_TABLE_NAME,
  };
  const command = new PutItemCommand(inputItemInput);
  const response = await DDClient.send(command);
  return response;
};

export const removeUser = async (uuid: string) => {};

export const logIn = async ({ email, password }: UserType) => {
  // 1. get user by email
  // 2. compared against hashed Pswd
  // 3. return result with a session id
};

export const getUser = async (uuid: string) => {
  // 1. get user by uuid
  // 2. return user
  const inputItemInput: GetItemCommandInput = {
    Key: {
      id: {
        S: uuid,
      },
    },
    TableName: process.env.NEXT_PUBLIC_DYNAMODB_TABLE_NAME,
  };
  const command = new GetItemCommand(inputItemInput);
  const response = await DDClient.send(command);
  return response;
};
