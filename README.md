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
- **MySQL/PostgreSQL** – persistence layer  



## 🧑‍💻 Getting Started
1. Clone the repository.  
2. Configure your database in `application.properties`.  
3. Run the app with:  
   ```bash
   mvn spring-boot:run
