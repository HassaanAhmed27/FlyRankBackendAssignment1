# Task API

A simple RESTful Todo Task API built with **Node.js**, **Express.js**, and **JavaScript**. The API demonstrates CRUD (Create, Read, Update, Delete) operations using an in-memory array and includes interactive API documentation using **Swagger UI**.

---

## Features

- Get API information
- Health check endpoint
- Create a task
- Retrieve all tasks
- Retrieve a task by ID
- Update an existing task
- Delete a task
- Interactive API documentation with Swagger UI

---

## Technologies Used

- Node.js
- Express.js
- JavaScript
- Swagger UI Express
- OpenAPI 3.0

---

## Installation

Clone the repository:

```bash
git clone https://github.com/HassaanAhmed27/FlyRankBackendAssignment1.git
```

Move into the project directory:

```bash
cd Assignment1
```

Install dependencies:

```bash
npm install
```

Run the server:

```bash
npm start
```

The server starts at:

```
http://localhost:3000
```

Swagger UI is available at:

```
http://localhost:3000/docs
```

---

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | API information |
| GET | `/health` | Health check |
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/:id` | Get a task by ID |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update an existing task |
| DELETE | `/tasks/:id` | Delete a task |

---

## Example cURL Output

Request:

```bash
curl -i http://localhost:3000/tasks
```

Output:

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

[
  {
    "id": "1",
    "title": "Stage 2 task",
    "done": true
  },
  {
    "id": "2",
    "title": "Stage 2 task1",
    "done": false
  },
  {
    "id": "3",
    "title": "Stage 2 task2",
    "done": true
  }
]
```

---

## Swagger UI

The API is documented using Swagger UI.

### Screenshot

![Swagger UI](images/swagger_ui.png)

![Swagger UI](images/swagger_ui1.png)

![Swagger UI](images/swagger_ui2.png)

![Swagger UI](images/swagger_ui3.png)

![Swagger UI](images/swagger_ui4.png)

![Swagger UI](images/swagger_ui5.png)

![Swagger UI](images/swagger_ui6.png)

---

## Author

**Hassan Ahmed**

Software Engineering Student

Sir Syed University of Engineering & Technology