
# Student Assignment Tracker

A simple MERN stack web application that helps students organize and track their assignments.

## Features

- Add assignments with a title, subject, due date, and priority.
- View all assignments.
- Mark assignments as completed or pending.
- Delete assignments.
- View total, pending, and completed assignment counts.
- Store assignments in MongoDB Atlas.

## Technologies Used

- MongoDB Atlas
- Express.js
- React
- Node.js
- Axios
- Vite

## Project Structure

- `client/` - React frontend
- `server/` - Express backend and MongoDB connection

## Prerequisites

- Node.js and npm
- A MongoDB Atlas account and database

## Setup Instructions

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd student-assignment-tracker
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### 3. Start the backend

From the `server/` folder, run:

```bash
node server.js
```

### 4. Set up the frontend

Open a second terminal:

```bash
cd client
npm install
npm install axios
npm run dev
```

Open the local URL displayed by Vite in your browser.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/assignments` | View assignments |
| POST | `/api/assignments` | Add an assignment |
| PUT | `/api/assignments/:id` | Update an assignment |
| DELETE | `/api/assignments/:id` | Delete an assignment |

## Environment Variables

See `server/.env.example` for the required environment variable names. Never commit your real `.env` file or database credentials.

## Project Status

The application has been run locally, and adding an assignment has been tested. Further testing and deployment may be required.
