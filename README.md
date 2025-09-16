# Fake-It

A lightweight **mock API platform** with a **React frontend** and a **Spring Boot backend**.  
It allows developers and testers to **define, manage, and serve mock APIs dynamically**.  
This makes it easier for **frontend developers and testers** to work independently of backend services.



## ✨ Features
- Define mock APIs without code changes.
- Supports all HTTP methods (`GET`, `POST`, `PUT`, `DELETE`, etc.).
- Store mock definitions in a relational database (MySQL/Postgres).
- Enable or disable mocks on demand.
- Simple and extensible architecture.
- Web dashboard to manage mocks visually.



## 🚀 How It Works
1. Define a mock API using the `/mocks` management endpoints.  
2. The mock is saved in the database (`mock_requests` table).  
3. Any request matching the path + method is served with the stored response.  
4. If no mock is found → a `404 Not Mocked` response is returned.  



## ⚙️ Tech Stack
- **Backend**: Spring Boot, Spring Data JPA, PostgreSQL/MySQL  
- **Frontend**: React, TailwindCSS  
- **Database**: Any relational DB (Postgres/MySQL recommended)



## 🧑‍💻 Getting Started  

### A. Backend

### 1. Clone the repository
```bash
git clone https://github.com/Sachinbambhaniya18/fake-it.git
cd fake-it-backend
```

### 2. Configure your database
In `src/main/resources/application.properties`, add your database connection details:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/fake_it   # or mysql url
spring.datasource.username=your_db_user
spring.datasource.password=your_db_password

# First run: create tables automatically
spring.jpa.hibernate.ddl-auto=create

# After the first successful run: switch to "update" and re-run the application
# spring.jpa.hibernate.ddl-auto=update
```

### 3. Run the app with:  
   ```bash
   mvn spring-boot:run
  ```

## 📌 Mock Examples

### 1. Create a Mock
**Request**  
```http
POST /fake-it/v1/mocks
Content-Type: application/json
```
```json
{
  "name": "Get all users",
  "path": "/api/users",
  "method": "GET",
  "statusCode": 200,
  "responseBody": {
    "users": [
      { "id": 1, "name": "Raja Hindustani" },
      { "id": 2, "name": "Munna Bhai" }
    ]
  },
  "enabled": true
}
```

**Mock Request**
```http
GET /api/users
Content-Type: application/json
```
**Response**
```json
{
    "users": [
      { "id": 1, "name": "Raja Hindustani" },
      { "id": 2, "name": "Munna Bhai" }
    ]
}
```

### B. Frontend

### Run the app with:  

 ```bash
   npm install
   npm run dev
  ```

Frontend will be available at:
👉 http://localhost:5173 (or the port shown in your terminal)
