
// npm packages need for the databases
import { MongoClient } from 'mongodb';
import mysql from 'mysql2';

// Database configuratations needed to connect to the MongoDB cloud and the MySQL server
const mongouri = 'mongodb+srv://dev:N3um0nT@cluster0.acrlzvt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const sqlDbConfig = {
    host: '10.0.103.30',
    user: 'web',
    password: 'N3um0nT2025!',
    database: 'kvaldo-scamdata'
};

export const DAL = {
    getStudents: async function() {
        const mongoClient = new MongoClient(mongouri);
        const database = mongoClient.db("Capstone");
        const userCollection = database.collection("users");

        let studentList = userCollection.find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result)
            mongoClient.close()
        })

        return studentList;
    },
    getDailies: async function() {
        const mongoClient = new MongoClient(mongouri);
        const database = mongoClient.db("Capstone");
        const userCollection = database.collection("daily");

        let dayList = userCollection.find({}).limit(7).toArray(function(err, result) {
            if (err) throw err;
            console.log(result)
            mongoClient.close()
        })

        return dayList;
    },
    createUser: async function(user) {
        console.log("Creating user...")
        
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
            console.log("Closing mongodb connection")
            await mongoClient.close()
        };

        // MySQL adding a user
        sqlClient.connect(function(err) {
            if (err) {
                console.error("Database connection failed: ", err.message)
                return
            };

            const sql = `INSERT INTO user_information (first_name, last_name, mail_address, phone_number, date_of_birth, school_email) VALUES (?, ?, ?, ?, ?, ?)`;

            const values = [user.firstname, user.lastname, user.address, user.phonenumber, user.dob, user.schemail];
            sqlClient.query(sql, values, function (err, result) {
                if (err) {
                    console.error("Error inserting data: ", err.message);
                    return
                };

                console.log("record inserted into MySQL, Id: ", result.insertId);

            });

            sqlClient.end(function (err) {
                if (err) {
                console.error("error closing connection: ", err.message)
                } else {
                    console.log("mysql connection closed")
                }
            })
        });
    }
};

