# Todo Web Application

This is a full-stack **To-Do application** built with **Angular (frontend)**, **Spring Boot (backend)**, and **MySQL (database)**, all running in Docker containers.

---

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

## Environment Variables
  - Backend (todo-backend):
    ```bash
      SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/todo_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
      SPRING_DATASOURCE_USERNAME=root
      SPRING_DATASOURCE_PASSWORD=123123
    ```
  - Frontend (todo-frontend):
    ```bash
        API_URL=http://backend:8080/tasks
    ```

