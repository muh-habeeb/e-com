# 🚀 Fullstack App - Development Guide

This project contains both frontend and backend code. You can run both parts together during development using simple npm scripts.

---

## 📁 Project Structure

```
project-root/
├── backend/
│   └── index.js
├── frontend/
│   └── (React/Vite/Next.js app)
├── package.json
```

---

## 📦 Available Scripts

These scripts are defined in the `package.json` file:

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "backend": "nodemon backend/index.js",
    "frontend": "npm run dev --prefix frontend",
    "prepare": "node prepareUploadsFolder.js",
    "dev": "npm run prepare && concurrently \"npm run backend\" \"npm run frontend\""
  },
```

### 📌 Explanation:

#### 1. `npm run backend`

- Runs the backend server using **nodemon**.
- Watches for file changes in the `backend/` directory.
- Entry file: `backend/index.js`

#### 2. `npm run frontend`

- Runs the frontend development server.
- Uses `--prefix frontend` to run commands inside the `frontend` directory.
- Assumes there is a `dev` script inside `frontend/package.json` (e.g., `vite`, `next`, or `react-scripts`).

#### 3. `npm run dev`

- Runs **both frontend and backend** concurrently using the [`concurrently`](https://www.npmjs.com/package/concurrently) package.
- Ideal for local development.

---

## 🏁 Run the App

To run both servers at the same time:

```bash
npm run dev
```

Or run them individually:

```bash
npm run backend   # Runs backend only
npm run frontend  # Runs frontend only
```

Happy coding! 🎉
