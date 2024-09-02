import { type DatabaseUser, Lucia, Session, User } from "lucia";
import { DynamoDBAdapter } from "lucia-dynamodb-adapter";
import { getUserbyId } from "../_controller/user";
import { DDClient } from "../_controller/database";

// Create a function to get a user from your own user table then pass it to the adapter as a Lucia user
async function getAUser(email: string): Promise<DatabaseUser | null> {
  //Get the user from your own user table
  const results = await getUserbyId(email);
  const user = results?.Items?.[0] as DatabaseUser;

  //If the user does not exist, return null
  if (!user) {
    return null;
  }

  //Return the user as a Lucia user. This example assumes that the attributes field has been customised to include a username. See more in this tutorial https://lucia-auth.com/tutorials/username-and-password/
  return {
    id: user.id,
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
  sessionUserIndexName: "lucia-sessions-user-index",
  getUser: getAUser,
});

//Use the adapter with the 'lucia-auth' library as you would with any other adapter
