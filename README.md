# Super Duper Octo Rotary Challenge

This project is a chat server built with Node.js, Express, MongoDB, and Socket.IO. Each tab serves as a chat room where users can provide a username and start chatting with other connected users.

## Prerequisites

- Node.js (v20.13.1 or later)
- npm (v10.5.2 or later)
- MongoDB (running locally or accessible via URI)

## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/fercastroud/super-duper-octo-rotary-challenge.git
    cd super-duper-octo-rotary-challenge/server
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root of the `server` directory with the following content:

    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/your-database-name
    ```

   Replace `mongodb://localhost:27017/your-database-name` with your actual MongoDB connection URI.

4. Ensure MongoDB is running. If you're running MongoDB locally, you can start it with:

    ```bash
    mongod
    ```

## Running the Server

1. Start the server:

    ```bash
    npm start
    ```

2. You should see output indicating that the server is running and connected to the database:

    ```bash
    Server running on port 3000
    MongoDB connected successfully
    ```

3. The server is now running on `http://localhost:3000`.

## API Endpoints

### Get All Messages

- **URL:** `/api/chat/messages`
- **Method:** `GET`
- **Response:**
    ```json
    [
      {
        "username": "alice",
        "message": "Hello, everyone!",
        "_id": "60d0fe4f5311236168a109ca",
        "createdAt": "2024-05-23T23:47:24.024Z"
      }
    ]
    ```

### Create a Message

- **URL:** `/api/chat/messages`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
      "username": "alice",
      "message": "Hello, everyone!"
    }
    ```
- **Response:**
    ```json
    {
      "username": "alice",
      "message": "Hello, everyone!",
      "_id": "60d0fe4f5311236168a109ca",
      "createdAt": "2024-05-23T23:47:24.024Z"
    }
    ```

## WebSocket

The server uses Socket.IO for real-time communication. To connect to the WebSocket server:

1. Connect to the WebSocket server at `ws://localhost:3000`.
2. Emit a `sendMessage` event with the following payload:
    ```json
    {
      "username": "alice",
      "message": "Hello, everyone!"
    }
    ```
3. Listen for `newMessage` events to receive messages in real time.

## Development

### Nodemon

During development, you can use Nodemon to automatically restart the server when files change:

```bash
npm install -g nodemon
nodemon server.js
