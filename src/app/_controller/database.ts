import { DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";
import { fromEnv } from "@aws-sdk/credential-providers"; // ES6 import

export const DDClient = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: fromEnv(),
});

export const TestConnection = async () => {
  const command = new ListTablesCommand({});
  const response = await DDClient
    .send(command)
    .then(() => {
      console.log("Connection To AWS Resource Successful!");
      console.log(response.TableNames?.join("\n"));
      return "success";
    })
    .catch((err) => err);
};