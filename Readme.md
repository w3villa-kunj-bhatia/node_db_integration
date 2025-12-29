# **Node.js MongoDB Profile Manager**

A Node.js application that allows authenticated users to create, view, update, and delete personal profile data stored in MongoDB. It includes user authentication, protected routes, and proper status code handling.

---

## **Features**

* User registration and login with JWT authentication
* Protected routes using authorization middleware
* MongoDB database integration with Mongoose
* CRUD operations for user profiles
* Error handling and consistent JSON responses

---

## **Tech Stack**

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT (jsonwebtoken)

---

## **Setup & Installation**

```sh
git clone <repository-url>
cd <project-folder>
npm install
```

Create a `.env` file in the project root:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the application:

```sh
npm start
```

---

## **API Endpoints**

### **Authentication**

| Method | Route          | Description                |
| ------ | -------------- | -------------------------- |
| POST   | `/auth/signup` | Register new user          |
| POST   | `/auth/login`  | Login and return JWT token |

### **Profile**

| Method | Route         | Description                  |
| ------ | ------------- | ---------------------------- |
| POST   | `/profile`    | Create profile (protected)   |
| GET    | `/profile/me` | Get logged-in user's profile |
| PUT    | `/profile`    | Update profile               |
| DELETE | `/profile`    | Delete profile               |

To access protected routes, include:

```
Authorization: Bearer <token>
```

---

## **Status Codes Used**

* **200** – Success
* **201** – Profile created
* **400** – Bad request / validation error
* **401** – Missing token
* **403** – Invalid token
* **404** – Resource not found
* **500** – Server error

---

## **Project Structure**

```
📁 config
📁 controllers
📁 routes
📁 middleware
📁 models
📁 public (includes frontend)
📁 utils
server.js
.env
```

---