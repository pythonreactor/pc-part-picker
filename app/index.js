const path = require('path');
const express = require('express');
const app = express();
const PORT = 3500;
const FILES = path.join(__dirname, 'src/public/');

// ******** ROUTES **********

app.get("/", (request, response) => {
    response.sendFile(FILES + "index.html");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

