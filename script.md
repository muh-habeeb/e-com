"prepare": "node prepareUploadsFolder.js",

    "dev": "npm run prepare && concurrently \"npm run backend\" \"npm run frontend\"",