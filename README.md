Event Hall Management System
🎉 Overview

A full-stack web application for managing event halls, developed as a comprehensive end-to-end project.

The system provides a modern user interface for managing halls and users, combined with a robust backend that handles business logic, security, and integrations.

✨ Key Features

Event hall management

User management system

Secure password recovery flow

Email notifications and reminders

Modern and responsive user interface

End-to-end integration between client, server, and database

💻 Tech Stack

Frontend: React

Backend: Node.js, Express

Database: MySQL

Authentication & Security: Secure password reset flow

Other: REST API, Email integration

🛠 Installation & Setup
Clone the repository

git clone https://github.com/chanirotenberg/event-hall-management-system.git

cd event-hall-management-system

Install dependencies

Backend:
cd server
npm install

Frontend:
cd client
npm install

Environment Variables

Create a .env file inside the server directory:

PORT=5000
DB_HOST=localhost
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=event_hall_db
EMAIL_USER=your_email
EMAIL_PASS=your_email_password

Run the application

Start backend:
cd server
npm start

Start frontend:
cd client
npm start

🧱 Project Structure

/client – React frontend
/server – Node.js backend
/db – Database schema and scripts

🔁 System Flow

Users interact with the React frontend.
The frontend communicates with the backend via REST API.
The backend handles business logic, authentication, and database operations.
Email services are used for notifications and secure password recovery.

🚀 Future Improvements

Role-based permissions (admin / staff)

Enhanced dashboard and analytics

Automated testing

Deployment pipeline

Performance and security improvements

📫 Contact

Email: your@email.com

LinkedIn: https://linkedin.com/in/your-profile
