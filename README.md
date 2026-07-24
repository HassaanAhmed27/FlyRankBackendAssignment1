# Task API

A RESTful Task Management API built with Express.js. This project is developed in stages to demonstrate the progression from an in-memory API to SQLite and finally PostgreSQL using Docker.

---

# Assignment 1 - Simple CRUD Task API

## Overview

A basic RESTful API for managing tasks using an in-memory data structure.

### Features

- Create Task
- Read Tasks
- Update Task
- Delete Task
- RESTful API using Express.js

### Run

```bash
npm install
npm start
```

---

# Assignment 2 - SQLite Database Integration

## Overview

Replaced the in-memory data store with SQLite for persistent data storage.

### Features

- SQLite database
- Automatic database creation
- Seed data on first run
- CRUD operations
- Persistent storage

### Run

```bash
npm install
npm start
```

---

# Assignment 3 - PostgreSQL with Docker

## Overview

Configured a PostgreSQL database server using Docker.

### Prerequisites

- Docker Desktop
- WSL 2 (Windows)

### Start PostgreSQL

```bash
docker run --name taskdb -e POSTGRES_PASSWORD=dev -e POSTGRES_DB=tasks -p 5432:5432 -v taskdata:/var/lib/postgresql/data -d postgres:17
```

### Verify the Container

```bash
docker ps
```

### Connect to PostgreSQL

```bash
docker exec -it taskdb psql -U postgres -d tasks
```

### Verify Database

```sql
\dt
```

Exit PostgreSQL:

```sql
\q
```

---

## .gitignore

```gitignore
node_modules/
.env
```

---

## Author

Hassan Ahmed