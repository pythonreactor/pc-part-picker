const PORT = 3501;
import cors from 'cors';
import express from 'express';
import { builds } from "./src/routes/builds.js";
import { components } from "./src/routes/components.js";

const app = express();
app.use(express.json());
app.use(cors());

//********** ROUTES **********

app.use('/api/v1/build', builds);
app.use('/api/v1/component', components);

// ********** APP LISTENER **********

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
