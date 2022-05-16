const path = require('path');
const express = require('express');
const app = express();
const PORT = 3500;
const FILES = path.join(__dirname, 'src/public/');

app.use(express.static(FILES + '/static/js'));
app.use(express.static(__dirname + 'node_modules'));

// ******** ROUTES **********

// Homepage
app.get("/", (request, response) => {
    response.sendFile(FILES + "index.html");
});

// Components
app.get("/components", (request, response) => {
    response.sendFile(FILES + "components.html");
});

// Builds
app.get("/builds", (request, response) => {
    response.sendFile(FILES + "builds.html");
});

// ******** APP LISTENER **********

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
