# MiniIMS Frontend

## 📝 Overview

This is the frontend application for the MiniIMS system. It is built with **React**, powered by **Vite**, and uses **Context API** for state management. It communicates with a Spring Boot backend via RESTful APIs.

---

## 🚀 Features

- React + Vite setup  
- State management with React Context API  
- Environment-based API configuration  
- Authenticated API communication with JWT  
- Connects to the MiniIMS backend  

---

## 🛠️ Tech Stack

- React  
- JavaScript  
- Vite  
- Context API  
- Axios  
- Bootstrap  

---

## ⚙️ Setup Instructions

### 1. Prerequisites

- [Node.js](https://nodejs.org/) installed  
- Backend API running (see the backend README for setup)

---

### 2. Clone the Repository

Clone the frontend project to your local machine and navigate into the project folder:

```bash
git clone <repository-url>
cd miniims-frontend
```

---

### 3. Install Dependencies

```bash
npm install
```

---

### 4. Configure Environment

An `.env` file is already provided in the project root.  
You only need to **edit** the following line:

```env
VITE_API_BASE_URL=http://localhost:8081/api/
```

> 🔧 **Important:** If you change the backend port (default is `8081`) or run it on a different host, make sure to update this URL accordingly.

---

### 5. Start the Development Server

```bash
npm run dev
```

The app will be available at: [http://localhost:5173](http://localhost:5173)

---

## 📦 Usage

- Communicates with the backend at the URL set in `VITE_API_BASE_URL`.  
- For backend API reference, see: [Swagger UI](http://localhost:8081/swagger-ui/index.html)  
- Ensure the backend is running and CORS is configured properly before using the app.
