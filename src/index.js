import config from "./config/dev.js";
import express from "express";
import { connectDb } from "./utils/db.js";
import { signup, login, validateRequest } from "./auth/index.js";
import { json } from 'body-parser'
import contactRouter from "./resources/contact/contact.controller.js"




const app = express();
app.use(json());


app.post('/signup', signup);
app.post('/login', login);
app.use('/api', validateRequest);

app.post('/api/v1/contact', contactRouter);

const start = async () => {
    try {
        await connectDb();
    } catch (error) {
        console.log(error);
    }

    app.listen(config.port, () => {
        console.log(`server started on port ${config.port}`);
    })
}
start();

console.log(config);


