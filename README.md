Hospital Management System

A full-stack Hospital Management System built using React (Vite) for the frontend and Node.js with Express for the backend, integrated with a MySQL database and email notifications using Resend API.

This system allows users to register, log in, book doctor appointments, and receive confirmation emails after booking.

⸻

Overview

The project follows a modern full-stack architecture:
	•	Frontend manages the user interface and routing.
	•	Backend provides REST APIs for authentication and appointments.
	•	MySQL stores users and appointment records.
	•	Resend Email API sends appointment confirmation emails.

The structure is modular and supports future scalability such as admin dashboards and advanced hospital workflows.

⸻

Technology Stack

Frontend
	•	React (Vite)
	•	React Router
	•	Material UI
	•	CSS

Backend
	•	Node.js
	•	Express.js
	•	MySQL
	•	JWT Authentication
	•	bcrypt (password hashing)

External Services
	•	Resend Email API (appointment confirmation emails)

⸻

Features

Authentication
	•	User registration
	•	Secure password hashing with bcrypt
	•	Login authentication
	•	JWT token generation

Appointment Booking
	•	Book doctor appointments
	•	Select date and time
	•	Store appointment data in MySQL
	•	Email confirmation after booking

Email Notification

After booking an appointment the system automatically sends an email containing:
	•	Patient name
	•	Doctor name
	•	Appointment date
	•	Appointment time
	•	Hospital contact details

Hospital Information
	•	Doctor listings
	•	Department listings
	•	Appointment booking interface

⸻

Project Structure

HospitalManagement
│
├── backend
│   ├── server.js
│   ├── db.js
│   ├── .env
│   └── database
│       └── hms_db.sql
│
├── frontend
│   ├── src
│   ├── public
│   └── vite.config.js
│
└── README.md

⸻

Installation and Setup

1. Clone the Repository

git clone https://github.com/dev000322/HospitalManagement.git
cd HospitalManagement

⸻

Backend Setup

cd backend
npm install
node server.js

Backend server runs on:
http://localhost:3000

⸻

Frontend Setup

Open another terminal:

cd frontend
npm install
npm run dev

Frontend runs on:
http://localhost:5173

⸻

Database Setup
	1.	Create a MySQL database

CREATE DATABASE hms_db;
	2.	Import the database file located at:

backend/database/hms_db.sql
	3.	Update database credentials inside:

backend/db.js

⸻

Environment Variables

Create a .env file inside the backend folder.

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hms_db

JWT_SECRET=your_secret_key

RESEND_API_KEY=your_resend_api_key

⸻

API Endpoints

Authentication

POST /register
POST /login

Appointments

POST /book-appointment

⸻

Future Improvements
	•	Admin dashboard
	•	Appointment management panel
	•	Doctor availability scheduling
	•	Prevent duplicate booking
	•	Role-based access control
	•	Deployment configuration

⸻

Author

Ayush Dev
GitHub: https://github.com/dev000322

⸻

License

This project is developed for educational purposes.
:::