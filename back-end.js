console.log("back-end.js is running...")

import express from 'express';
import { DAL } from './dal/dal.js'

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded())

app.post("/createuser", async (req, res) => {
    console.log("CREATE: ", req.body);
    await DAL.createUser(req.body);
    let results = {};
    res.json(results);
});

app.listen(port, (err) => {
    if (err) console.log(err);

    console.log(`back-end.js is running on https://localhost:${port}`)
});