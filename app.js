console.log("app.js is running...")

// packages used: express, mongodb, ejs, nodemon, mysql2

import express from 'express';
import { MongoClient } from 'mongodb';
import mysql from 'mysql2';

const port = 8080;
const app = express();

const mongouri = 'mongodb+srv://dev:N3um0nT@cluster0.acrlzvt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
// const dbConfig = {
//     host: '10.0.103.30',
//     user: 'root',
//     password: 'N3um0nT2025!',
//     database: 'kvaldo-scamdata'
// }

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.listen(port, '10.0.103.20', () => {
    console.log(`Server running at http://10.0.103.20:${port}/`)
});

//MySQL test Connectivity success
// var con = mysql.createConnection({
//     host: "10.0.103.30",
//     user: "web",
//     password: "N3um0nT2025!",
//     database: 'kvaldo-scamdata'
// });

// var fname = "test"
// var lname = "test"
// var maddress = 0
// var stcode = 0
// var phonenum = 5555555555
// var eaddress = "example@sample.com"
// var dob = 0
// var schoolem = "example@student.neumont.edu"
// var ccn = 0
// var bank = 0
// var ssn = 0
// var epass = 0
// var spass = 0

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!")

//     const sql = `INSERT INTO user_information (first_name, last_name, mail_address, state_code, phone_number, email_address, date_of_birth, school_email, credit_card_number, bank_account, social_security_number, email_password, school_email_password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//     const values = [
//         fname, lname, maddress, stcode, phonenum, eaddress, dob, schoolem, ccn, bank, ssn, epass, spass
//     ];

//     con.query(sql, values, function (err, result) {
//         if (err) throw err;
//         console.log("1 record inserted");
//     });
// });

//MongoDB test Connectivity success
// console.log('creating test mongo document')

// const client = new MongoClient(mongouri);

// try {
//     await client.connect();
//     const database = client.db("Capstone");
//     const userCollection = database.collection("users");
//     var doc = { name: "test" };
//     console.log(doc)
//     const result = await userCollection.insertOne(doc);
//     console.log(`document was inserted with the _id: ${result.insertedId}`);
// } finally {
//     await client.close();
// }

