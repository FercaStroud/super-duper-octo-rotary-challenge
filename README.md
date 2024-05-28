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
    cd super-duper-octo-rotary-challenge
    ```

2. Install the dependencies (server and client folders):

    ```bash
    cd super-duper-octo-rotary-challenge/server
    npm install
    ```
    ```bash 
    cd super-duper-octo-rotary-challenge/client
    npm install
    ```

3. Create a `.env` file in the root of the `server` directory with the following content:

    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/chatApp
    ```
   
4. Create a `.env` file in the root of the `client` directory with the following content:

    ```env
    VITE_API_URL=http://localhost:3000
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

## Running the Client

1. Start the client:

    ```bash
    npm run dev
    ```

2. The server is now running on `http://localhost:5173/`.


# API calls
### 1. Create User

#### Request

- **Method:** POST
- **URL:** `/api/users`
- **Headers:**
    - `Content-Type: application/json`
- **Body:**

```json
{
  "name": "Ferca"
}
```


### 2. Create Message

#### Request

- **Method:** POST
- **URL:** `/api/chat/messages`
- **Headers:**
  - `Content-Type: application/json`
- **Body:**

```json
{
  "userId": "6654d8471ab6b918d36492c7",
  "message": "Hello, this is a test message!"
}
```
### 3. Get Messages

#### Request

- **Method:** GET
- **URL:** `/api/chat/messages`
- **Headers:**
  - `Content-Type: application/json`
- **Response:**

```json
[
  {
    "id": "string",
    "userId": "string",
    "message": "string",
    "timestamp": "string"
  }
]

```

