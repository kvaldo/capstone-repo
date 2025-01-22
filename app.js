console.log("app.js is running...")

import express from 'express';
import { MongoClient } from 'mongodb';
const port = 8080;
const app = express();

const mongouri = 'mongodb+srv://dev:N3um0nT@cluster0.acrlzvt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.listen(port, '10.0.103.20', () => {
    console.log(`Server running at http://10.0.103.20:${port}/`)
});

//MongoDB test Connectivity success
console.log('creating test mongo document')

const client = new MongoClient(mongouri);

try {
    await client.connect();
    const database = client.db("Capstone");
    const userCollection = database.collection("users");
    var doc = { name: "test" };
    console.log(doc)
    const result = await userCollection.insertOne(doc);
    console.log(`document was inserted with the _id: ${result.insertedId}`);
} finally {
    await client.close();
}