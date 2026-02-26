Project Overview

Taskly is a web-based task manager built with a Node.js/Express backend and a React/Vite frontend. It features user authentication, database integration with MongoDB, and a cron job system to maintain service health.
Tech Stack
Backend

    Environment: Node.js

    Framework: Express.js

    Database: MongoDB (via Mongoose)

    Authentication: JSON Web Tokens (JWT) and BcryptJS for password hashing

    Automation: Node-cron for scheduled tasks

    Validation: Express-validator

Frontend

    Framework: React 19

    Build Tool: Vite

    Styling: Tailwind CSS 4

    Routing: React Router DOM 7

    Notifications: React Hot Toast

Project Structure
Backend (/taskmanager/backend)

    server.js: The entry point that initializes the database connection, starts the Express server, and schedules cron jobs.

    app.js: Configures middleware and API routes.

    routes/: Defines API endpoints, including authentication (/api/auth) and task management (/api/tasks).

    models/: Contains Mongoose schemas for User and Task data.

    controllers/: Houses the logic for processing requests and returning responses.

    middleware/: Includes authentication checks and error handling logic.

Frontend (/taskmanager/frontend-temp)

    src/pages/: Contains main views like Dashboard, Login, and Register.

    src/components/: Reusable UI elements such as Modals, Inputs, and Task Cards.

    src/services/: API integration logic using Axios.

    src/context/: State management for user authentication and UI themes.

Key Features

    Task Management: Create, read, update, and delete tasks with status tracking.

    User Authentication: Secure registration and login functionality.

    Health Monitoring: A built-in cron job in server.js performs a health check every 14 minutes by pinging the /api/health endpoint.

    Modern UI: A responsive interface built with Tailwind CSS and React 19.

Getting Started
1. Backend Setup

    Navigate to the backend directory.

    Install dependencies: npm install.

    Configure your .env file with PORT, MONGO_URI, JWT_SECRET, and BASE_URL.

    Run in development mode: npm run dev.

2. Frontend Setup

    Navigate to the frontend-temp directory.

    Install dependencies: npm install.

    Start the development server: npm run dev
