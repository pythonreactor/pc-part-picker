const cors = require("cors");
const mongo = require("mongodb");
const express = require("express");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3501;
const MONGO_URL = "mongodb://localhost:27017/";
const MongoClient = require('mongodb').MongoClient;

//********** Routes **********

app.get('/', (request, response) => {
    response.json({"status": "ok"});
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

