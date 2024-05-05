# LokkerRoom - Back-end

The back-end for LokkerRoom is implemented in Node.js and serves as the central hub for managing users, lobbies, and messages.

## Installation

To set up the LokkerRoom back-end locally, follow these steps:

1. Clone the repository from [GitHub](https://github.com/Dev-Ndz/lokkeroom).
2. Navigate to the project directory.
3. Run `npm install` to install the required dependencies.
5. Configure the environment variables for database connection and other settings.

## Usage

To start the LokkerRoom server, run `npm run start`. This will launch the server and make it available for front-end communication.

## Features

- User authentication using JWT tokens
- Lobby management (create, join, leave)
- Message routing between users in the same lobby
- RESTful APIs for front-end communication

## Authentication

LokkerRoom utilizes JWT tokens for user authentication. Upon successful login, a token is generated and sent to the client for subsequent requests.

## Database

LokkerRoom uses a PostgreSQL database.

## Contributing

We welcome contributions from the community to enhance LokkerRoom's functionality and performance. If you'd like to contribute, please follow the guidelines outlined in the CONTRIBUTING.md file.

## Future Development

In future releases, we plan to add the following features:

- Real-time updates using sockets
- Private message might need update.

## API Endpoint

| Endpoint                           | Method | Bearer token? | Admin only | Request                                      | Response                                                                                                              |
| ---------------------------------- | ------ | ------------- | ---------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| /api/register                      | POST   |               |           | {email, nickname, password}| A message stating the user has been created (or the appropriate error, if any) |
| /api/login                         | POST   |               |           | {email, password}          | A JSON Web Token/session ID (or the appropriate error, if any)
| /api/lobby/:lobby-id/getUserList   | GET    | Yes           |           |                            | An array containing all the users from the lobby                |
| /api/lobby/:lobby-id              | GET    | Yes           |            |                            | An array containing all the messages from the lobby
| /api/lobby/:lobby-id              | POST   | Yes           |            | {content:"message"}        | A message stating the message has been posted (or the appropriate error, if any)
| /api/lobby/:lobby-id/add-user     | POST   | Yes           | Yes        | {addedUserId:"id"}        | Add a user to a lobby      |                                                                                          |
| /api/lobby/:lobby-id/remove-user  | POST   | Yes           | Yes        | {removedUsesrId:"id"}            | Removes a user from the lobby |
| /api/lobby/                       | POST   | Yes           |            | {name: "name of the lobby"}            | Create a new lobby |
| /api/messages/:message-id         | GET    | Yes           |            | -                | A single message object from the lobby          |
| /api/messages/:message-id         | PATCH  | Yes           | Yes\*      | {content:"new message"} | Edit a message. Users can only edit their own messages, unless they are admins. |
| /api/messages/:message-id         | DELETE | Yes           | Yes\*      | -                | Delete a message. Users can only edit their own messages, unless they are admins. |
| /api/messages/:user-id             | POST   | Yes           |            | {content:"new private message"} | Sends a private message to the user specified in the url   |
| /api/users/lobbies                | GET    | Yes           |           | -                            | an array with the list of all the lobbies where the user is member |
| /api/users/admin/:lobby_id            | GET    | Yes           |            | -                        | return true if the user is admin of the lobby specified in the url |

\*Admin can see all users from the same lobby, non-admin can see only themselves.  
\*\*Admin can edit/delete any message, non-admin can only edit/delete their own messages.




