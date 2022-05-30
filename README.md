# Serverless-App

## Content Table

## Set up

This project is divided in two main parts. There is the web application and our router used in our firebase console through a cloud function (as you can see in the firebase documentation clicking [here](https://firebase.google.com/docs/hosting/functions#use_a_web_framework)).

### Web App

You can launch this project using any navigator (we advice you to avoid Safari, all tests have been done on Chrome). You need to launch the application from the app folder of our repository by using `yarn` to install the dependencies of the project. Then `yarn start` to launch Expo then click on `Run on web browser` or run `expo start --web`.

NOTE: please use the `5.4.3` version of `expo-cli` and `node v14.17.5`.

### Router

We have a router made with **Express** but you don't have anything to do to launch it because it is use with a cloud function on Firebase.

## Data Models

- Group
```json
"group": {
  "_id": "string",
  "name": "string",
  "description": "string",
  "createdAt": "Date",
  "updatedAt": "Date",
  "roles": "string[]",
  "members": "string[]",
}
```

- Role
```json
"role": {
  "_id": "string",
  "name": "string",
  "description": "string",
  "createdAt": "Date",
  "updatedAt": "Date",
}
```

- User
```json
"user": {
  "_id": "string",
  "name": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "photo": "string",
  "createdAt": "Date",
  "updatedAt": "Date",
}
```

- Team
```json
"team": {
  "_id": "string",
  "name": "string",
  "createdAt": "Date",
  "updatedAt": "Date",
  "members": "string[]",
  "channels": "string[]",
}
```

- Friend
```json
"friend": {
  "_id": "string",
  "createdAt": "Date",
  "updatedAt": "Date",
  "users": "[string, string]",
  "messages": "string[]",
}
```

- Channel
```json
"channel": {
  "_id": "string",
  "name": "string",
  "createdAt": "Date",
  "updatedAt": "Date",
  "messages": "string[]",
}
```

- Message
```json
"message": {
  "_id": "string",
  "content": "string",
  "createdAt": "Date",
  "updatedAt": "Date",
  "user": "string",
}
```

- Channel Message
```json
"channelMessage": {
  "_id": "string",
  "content": "string",
  "createdAt": "Date",
  "updatedAt": "Date",
  "user": "string",
}
```
## Firestore Documentation

- Authentication methods (AuthProvider and useAuth):
  - signin -> log to the app
  - register -> log to the app after creating a user

- User methods (UserProvider and useUser):
  - fetchUsers -> GET
  - fetchUser -> GET
  - updateUser -> PUT
  - deleteUser -> DELETE

- Team methods (TeamProvider and useTeam):
  - fetchTeam -> GET
  - fetchTeams -> GET
  - createTeam -> POST
  - updateTeam -> PUT
  - deleteTeam -> DELETE

- Friend methods (FriendProvider and useFriend):
  - fetchFriends -> GET
  - addFriend -> POST
  - deleteFriend -> DELETE

- Channel methods (ChannelProvider and  useChannel):
  - fetchChannel -> GET
  - fetchChannels -> GET
  - createChannel -> POST
  - updateChannel -> PUT
  - deleteChannel -> DELETE

- Message methods (FriendProvider and useFriend):
  - fetchFriendMessages -> GET
  - sendFriendMessages -> POST
  - updateFriendMessages -> PUT
  - deleteFriendMessages -> DELETE

- Channel Message methods (MessageProvider and useMessage):
  - fetchChannelMessages -> GET
  - sendChannelMessages -> POST
  - updateChannelMessages -> PUT
  - deleteChannelMessages -> DELETE
