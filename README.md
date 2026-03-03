Hospital Management System
==========================

A full-stack Hospital Management System built using React (Vite) for the frontend and Node.js with Express for the backend, integrated with a MySQL database.

This system is designed to manage hospital operations including patients, doctors, appointments, and authentication workflows through a structured frontend–backend architecture.


Overview
--------

The application follows a clear separation of concerns:

- The frontend handles user interface and routing.
- The backend exposes RESTful APIs.
- MySQL manages persistent data storage.

The structure supports modular development and future scalability.


Technology Stack
----------------

Frontend:
- React (Vite)
- React Router
- Material UI
- CSS

Backend:
- Node.js
- Express.js
- MySQL


Project Structure
-----------------

```
HospitalManagement
│
├── backend
│   ├── server.js
│   ├── db.js
│   └── database/
│       └── hms_db.sql
│
├── frontend
│   ├── src/
│   ├── public/
│   └── vite.config.js
│
└── README.md
```


Features
--------

- Patient management
- Doctor management
- Appointment booking
- Department listings
- User authentication (login and signup)
- RESTful API integration


Installation and Setup
----------------------

1. Clone the repository

```
git clone https://github.com/dev000322/HospitalManagement.git
cd HospitalManagement
```

2. Backend setup

```
cd backend
npm install
node server.js
```

The backend server runs on:
http://localhost:5000


3. Frontend setup

Open a new terminal:

```
cd frontend
npm install
npm run dev
```

The frontend runs on:
http://localhost:5173


4. Database setup

- Create a MySQL database.
- Import the SQL file located at:

```
backend/database/hms_db.sql
```

- Update database credentials in:

```
backend/db.js
```


Environment Configuration
-------------------------

If using environment variables, create a `.env` file inside the backend directory:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hospital_db
PORT=5000
```


Future Improvements
-------------------

- Role-based access control
- JWT-based authentication
- Input validation and middleware improvements
- Admin dashboard analytics
- Deployment configuration


Author
------

Ayush Dev  
GitHub: https://github.com/dev000322


License
-------

This project is intended for educational purposes.