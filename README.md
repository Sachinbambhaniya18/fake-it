# Fake-It

In many development workflows, frontend development and testing depend on backend APIs that may be incomplete, unstable, or unavailable. Fake-It addresses this by allowing teams to define mock APIs at runtime without modifying application code.

Mock definitions are persisted in a relational database and can be enabled or disabled as needed.

---

## Key Features

- Define mock APIs dynamically without code changes
- Support for all HTTP methods (GET, POST, PUT, DELETE, etc.)
- Store mock definitions in a relational database
- Enable or disable individual mocks
- Serve responses based on request path and HTTP method
- Web-based interface for managing mock APIs

---

## How It Works

1. A mock API is created using the management endpoint.
2. The mock definition is stored in the database.
3. Incoming HTTP requests are intercepted by the backend.
4. If a request matches a stored path and method, the predefined response is returned.
5. If no matching mock exists, a `404 Not Mocked` response is returned.

---

## Getting Started  

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

## Mock Examples

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

Frontend will be available at: `http://localhost:5173`
