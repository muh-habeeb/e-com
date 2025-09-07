 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "backend": "nodemon backend/index.js",
    "frontend": "npm run dev --prefix frontend",
    "prepare": "node prepareUploadsFolder.js",
    "dev": "npm run prepare && concurrently \"npm run backend\" \"npm run frontend\""
  },