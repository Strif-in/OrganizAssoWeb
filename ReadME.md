# OrganizAssoWeb

OrganizAssoWeb is a full-stack web application developed to manage user communications in an association setting. It features a React front-end and an Express/MongoDB back-end. The project supports user management and message forums with role-based permissions.

## 🏗 Project Structure

```
OrganizAssoWeb/
│
├── client/                # React frontend
│   ├──.env
│   ├── package.json
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── App.js
│       ├── index.js
│       └── ...
|
├── common/                  # React frontend
│   ├── mongodb_schema.png
│   ├── Rendu Projet Finale.pdf
│   └── GitHub-Commits.txt
|
├── server/                  # Node.js backend
│   ├── controllers/
│   │   ├── messageController.js
│   │   └── userController.js
│   ├── routes/
│   │   ├── messageRoutes.js
│   │   └── userRoutes.js
│   ├── db.js
│   ├── api.js
│   ├──.env
│   ├── package.json
│   └── index.js
|
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Strif-in/OrganizAssoWeb.git
   cd OrganizAssoWeb
   ```

2. Install dependencies:
   - Backend:
     ```bash
     cd server
     npm install
     ```
   - Frontend:
     ```bash
     cd ../client
     npm install
     ```

3. Set environment variables in `server/.env`:
   ```
   DB_URI=mongodb://localhost:27017
   DB_NAME=db
   PORT=3000
   ```

4. Run the application:
   - Backend:
     ```bash
     npm run dev
     ```
   - Frontend:
     ```bash
     npm run start
     ```

## 🔧 Features

### User Management
- Create, read, delete users
- Login with admin/member distinction
- Approve/promotion/demotion of users

### Message Handling
- Post and delete messages
- Retrieve individual/all messages
- Retrieve messages by user

### Security
- Passwords stored in plaintext (note: improve with hashing)
- Basic user validation
- SHA-256 used to hash message identifiers

## 📦 API Endpoints

### User Routes

- `POST /api/users/create`
- `POST /api/users/login`
- `PATCH /api/users/approve`
- `PATCH /api/users/promote`
- `PATCH /api/users/demote`
- `GET /api/users/getAll`
- `POST /api/users/getUser`
- `DELETE /api/users/delete`

### Message Routes

- `POST /api/messages/create`
- `POST /api/messages/getOne`
- `POST /api/messages/getByUser`
- `GET /api/messages/getAll`
- `DELETE /api/messages/delete`

## 🧪 Testing

Use Postman to import the provided collection and test the endpoints.

## 🧠 Project Overview

### Contributors
- Name1: Stefano Defina 21110014
- Name2: Melissa Setbel 21210442

## 🗃 Database

MongoDB collections:
- `users`
- `messages`

Refer to the provided schema image for logical modeling.

## 📄 License

This project is licensed under the ISC License.
