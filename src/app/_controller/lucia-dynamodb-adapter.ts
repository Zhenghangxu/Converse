import { DatabaseUser, Lucia, Session, User } from "lucia";
import { DynamoDBAdapter } from "lucia-dynamodb-adapter";
import { getUser } from "./user";
import { DDClient } from "./database";

// Create a function to get a user from your own user table then pass it to the adapter as a Lucia user
async function getAUser(userId: string): Promise<DatabaseUser | null> {
  //Get the user from your own user table
  const result = await getUser(userId);
  const user = result.Item;

  //If the user does not exist, return null
  if (!user) {
    return null;
  }

  //Return the user as a Lucia user. This example assumes that the attributes field has been customised to include a username. See more in this tutorial https://lucia-auth.com/tutorials/username-and-password/
  return {
    id: (user.id) as unknown as string,
    attributes: {
      email: user.email,
      role: user.role,
    },
  };
}

//Create a new adapter with the required parameters
export const adapter = new DynamoDBAdapter({
  client: DDClient,
  sessionTableName: "converse-sessions",
  sessionUserIndexName: "converse-sessions-user-index",
  getUser: getAUser,
});

//Use the adapter with the 'lucia-auth' library as you would with any other adapter
