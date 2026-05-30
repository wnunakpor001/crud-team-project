# Team Management API

A full-stack **Node.js + Express + MongoDB** application for managing teams.
The project includes a REST API backend and a static frontend, and is deployed on **Render**.

---

## 🌐 Live Demo

* **Frontend:** http://127.0.0.1:5500/frontend/
* **API Base URL:** https://simple-crud-teamapp.onrender.com

---

## 🚀 Features

* Create, read, update, and delete teams (CRUD)
* RESTful API built with Express
* MongoDB database integration (Mongoose)
* MVC architecture (Models, Controllers, Routes)
* Static frontend served from backend
* CORS enabled for cross-origin requests
* Production deployment on Render

---

## 🛠️ Technology Stacks

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* dotenv
* CORS
* Render (deployment)

---

## 📁 Project Structure

```text id="proj1"
project-root/
│
├── frontend/                  # Static frontend files
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── controllers/              # Business logic
│   └── team.controller.js
│
├── routes/                   # API routes
│   └── team.route.js
│
├── models/                   # Database schema
│   └── team.model.js
│
├── .env
├── server.js
├── package.json
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env id="env2"
PORT = 5000
MONGO_URI=your_mongodb_atlas_connection_string
```

---

## 📦 Installation (Local Setup)

### 1. Clone the repository

```bash id="c11"
git clone https://github.com/your-username/team-api.git
```

### 2. Move into the project folder

```bash id="c12"
cd team-api
```

### 3. Install dependencies

```bash id="c13"
npm install
```

---

## ▶️ Running the Project

### Development mode:

```bash id="c14"
npm run dev
```

### Production mode:

```bash id="c15"
npm start
```

The server runs on:

```text id="c16"
http://localhost:5000
```

---

## 📡 API Endpoints

### Get All Teams

```http id="a1"
GET /api/teams
```

---

### Create Team

```http id="a2"
POST /api/teams
Content-Type: application/json
```

**Body:**

```json id="a3"
{
  "name": "Engineering Team",
  "members": 5
}
```

---

### Update Team

```http id="a4"
PUT /api/teams/:id
```

---

### Delete Team

```http id="a5"
DELETE /api/teams/:id
```

---

## 🧠 Architecture

This project follows the **MVC pattern**:

* **Model:** MongoDB schema (data structure)
* **View:** Static frontend
* **Controller:** Business logic
* **Routes:** API endpoints

Flow:

```text id="arch1"
Frontend → Express Routes → Controllers → MongoDB Atlas
```

---

## 🌍 Deployment (Render)

This project is deployed using **Render**.

### Deployment Steps:

1. Connect GitHub repository to Render
2. Add environment variables:

   * `PORT`
   * `MONGO_URI`
3. Build command:

   ```bash
   npm install
   ```
4. Start command:

   ```bash
   npm start
   ```

---

## ⚠️ Important Notes

* Database is hosted on **MongoDB Atlas**
* Server may take a few seconds to start (Render free tier)
* Ensure `.env` is properly configured in production
* CORS is enabled for API access

---

## 📊 System Flow

```text id="flow1"
Frontend → API → Controller → Database → Response → Frontend
```

---

## 🚀 Future Improvements

* Add authentication (JWT)
* Add input validation (Zod/Joi)
* Add pagination & filtering
* Improve error handling
* Add unit testing
* Dockerize the application
* CI/CD pipeline (GitHub Actions)

---

## 👨‍💻 Author

**Wisdom Nunakpor**
BSc. Mathematical Science Student
University of Ghana, Legon
Backend Developer (Node.js, Express, MongoDB)
Aspiring Data Analyst & DevOps Engineer

---

## 📄 License

This project is open-source and available under the MIT License.
