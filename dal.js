console.log("back-end.js is running...");

// npm packages need for the databases
import { MongoClient } from 'mongodb';
import mysql from 'mysql2';

// Database configuratations needed to connect to the MongoDB cloud and the MySQL server
const mongouri = 'mongodb+srv://dev:N3um0nT@cluster0.acrlzvt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const sqlDbConfig = {
    host: '10.0.103.30',
    user: 'root',
    password: 'N3um0nT2025!',
    database: 'kvaldo-scamdata'
};

exports.DAL = {
    createUser: async function(user) {
        console.log("creating user...")
        
        const mongoClient = new MongoClient(mongouri);
        const sqlClient = mysql.createConnection(sqlDbConfig);

        // MongoDB adding a user
        try {
            console.log("Creating user in Mongo...")
            await mongoClient.connect();
            const database = mongoClient.db("Capstone");
            const userCollection = database.collection("users");
            var doc = user;
            console.log(doc)
            const result = await userCollection.insertOne(doc);
            console.log(`document was inserted to MongoDB with the _id: ${result.insertedId}`);
        } finally {
            await mongoClient.close()
        };

        // MySQL addina a user
        sqlClient.connect(function(err) {
            if (err) throw err;
            const sql = `INSERT INTO user_information (first_name, last_name, mail_address, state_code, phone_number, email_address, date_of_birth, school_email, credit_card_number, bank_account, social_security_number, email_password, school_email_password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            const values = [];
            sqlClient.query(sql, values, function (err, result) {
                if (err) throw err;
                console.log("record inserted into MySQL")
            });
        });
    }
};