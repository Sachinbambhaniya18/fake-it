# Fake-It

A lightweight **Spring Boot** application for creating and serving **mock APIs** dynamically.  
Instead of hardcoding or spinning up temporary servers, you can define endpoints at runtime and store them in a database.  
This makes it easier for **frontend developers and testers** to work independently of backend services.



## ✨ Features
- Define mock APIs without code changes.
- Supports all HTTP methods (`GET`, `POST`, `PUT`, `DELETE`, etc.).
- Store mock definitions in a relational database (MySQL/Postgres).
- Enable or disable mocks on demand.
- Simple and extensible architecture.



## 🚀 How It Works
1. Define a mock API using the `/mocks` management endpoints.  
2. The mock is saved in the database (`mock_requests` table).  
3. Any request matching the path + method is served with the stored response.  
4. If no mock is found → a `404 Not Mocked` response is returned.  



## ⚙️ Tech Stack
- **Spring Boot** – REST API framework  
- **Spring Data JPA** – database access  
- **MySQL/PostgreSQL or any relational database** – persistence layer  



## 🧑‍💻 Getting Started  

### 1. Clone the repository
```bash
git clone https://github.com/your-username/fake-it.git
cd fake-it
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

