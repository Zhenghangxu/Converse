import {
  DynamoDBClient,
  DynamoDBClientConfig,
  ListTablesCommand,
} from "@aws-sdk/client-dynamodb";

export const DDClient = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  } as DynamoDBClientConfig["credentials"],
});

export const TestConnection = async () => {
  const command = new ListTablesCommand({});
  const response = await DDClient.send(command)
    .then(() => {
      console.log("Connection To AWS Resource Successful!");
      console.log(response.TableNames?.join("\n"));
      return "success";
    })
    .catch((err) => err);
};
