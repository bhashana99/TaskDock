# TaskDock Web Application

This is a full-stack **To-Do application** built with **Angular (frontend)**, **Spring Boot (backend)**, and **MySQL (database)**, all running in Docker containers.

---

## Tech Stack

   - Frontend: Angular (SPA)

   - Backend: Spring Boot (Java, REST API)

   - Database: MySQL

   - Containerization: Docker & Docker Compose

## Features

   - Create a to-do task with title and description.

   - List only the 5 most recent tasks.

   - Mark tasks as completed; completed tasks disappear from the UI.

   - Fully containerized for easy setup and deployment.

## System Architecture

The application consists of three components:

   - Database: MySQL container storing tasks in the task table.

   - Backend API: Spring Boot REST API exposing endpoints for task operations.

   - Frontend UI: Angular SPA interacting with the backend via REST APIs.

All components are orchestrated using Docker Compose.

---
# Getting Started
## Prerequisites

- Docker  
- Docker Compose  
- Linux, macOS, or Windows (with WSL2 recommended)  

---

## Project Structure
<img width="560" height="143" alt="image" src="https://github.com/user-attachments/assets/81cd7495-e801-4c82-8a27-33ead07345b6" />


---

## How to Build and Run

1. **Clone the repository**

```bash
git clone https://github.com/bhashana99/spring-angular-todo.git
cd Todo-web

```
2. **Build and run using Docker Compose**

```bash
docker-compose up --build  
```

   This will:

    - Build and start MySQL (port 3307)

    - Build and start Spring Boot backend (port 8080)

    - Build and start Angular frontend served via Nginx (port 4200)

3. **Access the application**
      - Frontend: http://localhost:4200
      - Backend API: http://localhost:8080/tasks

## Build Notes

   - The backend is built automatically inside its Docker container.

   - The frontend is also built and served via Docker container.

   - Database container initializes automatically with the required schema.

## API Endpoints

   - GET /tasks – List the 5 most recent tasks (excluding completed)

   - POST /tasks/createTask – Create a new task

   - PUT /tasks/{id}/complete – Mark a task as completed

## Testing

   - Backend: Unit and integration tests available. Run using:
        ```bash
        ./mvnw test
        ```
   - Frontend: Unit tests
      ```bash
        ng test
        ```
    

