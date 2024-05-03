# LokkerRoom - Back-end

The back-end for LokkerRoom is implemented in Node.js and serves as the central hub for managing users, lobbies, and messages.

## Installation

To set up the LokkerRoom back-end locally, follow these steps:

1. Clone the repository from [GitHub](https://github.com/your/repository).
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

LokkerRoom uses a relational database (e.g., MySQL, PostgreSQL) for persistent data storage. Refer to the `database/README.md` file for instructions on setting up the database schema.

## Contributing

We welcome contributions from the community to enhance LokkerRoom's functionality and performance. If you'd like to contribute, please follow the guidelines outlined in the CONTRIBUTING.md file.

## Future Development

In future releases, we plan to add the following features:
- Real-time updates using sockets
- User presence detection
- Advanced message features (attachments, reactions)


