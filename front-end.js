console.log("front-end is running");

import express from 'express';

const port = 8080;
const app = express();
const siteVisits = 500;
const formVisits = 100;
const formSubmissions = 50;

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render('home');
});

app.get("/info", (req, res) => {
    res.render('info')
});

app.get("/form", (req, res) => {
    console.log("Scam form has been requested");
    let model = {
        fname: '',
        lname: '',
        addr: '',
        phone: '',
//        email: '',
        dob: '',
        schemail: '',
//        ccn: '',
//        bank: '',
//        ssn: '',
//        empass: '',
//        schpass: ''
    };
    res.render("form", model)
})

app.get("/admin", async (req, res) => {
    try {
        let urlStudents = "http://localhost:3000/students"
        let urlDailies = "http://localhost:3000/dailies"

        let [studentsResponse, dailiesResponse] = await Promise.all([
            fetch(urlStudents),
            fetch(urlDailies)
        ]);

        let studentsData = await studentsResponse.json();
        let dailiesData = await dailiesResponse.json();

        let model = {
            students: studentsData.results || [],
            dailies: dailiesData.results || [],
            siteVisits: siteVisits,
            formVisits: formVisits,
            formSubmissions: formSubmissions
        };

        res.render("admin", model);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error")
    }
});

app.post("/form", async (req, res) => {
    console.log("Form submitted")
    //console.log("Form Data: ", req.body)

    let dataIsValid = false;
    let userData = req.body;

    let namePattern = /\S{2,}/;
    let fnameIsValid = namePattern.test(userData.firstname);
    let lnameIsValid = namePattern.test(userData.lastname);

    let phonePattern = /[0-9 ()-]{10,20}/;
    let phoneIsValid = phonePattern.test(userData.phonenumber);

    let addressPattern = /\S{1,} \S{1,}/;
    let addressIsValid = addressPattern.test(userData.address);

    let dobPattern = /\S{2,}/;
    let dobIsValid = dobPattern.test(userData.dob);

    let schemailPattern = /\S{1,}@\S{2,}.\S{2,}/;
    let schemailIsValid = schemailPattern.test(userData.schemail);

    dataIsValid = fnameIsValid && lnameIsValid && phoneIsValid && addressIsValid && dobIsValid && schemailIsValid

    if (dataIsValid) {
        let formData = {
            firstname: userData.firstname,
            lastname: userData.lastname,
            phonenumber: userData.phonenumber,
            address: userData.address,
            dob: userData.dob,
            schemail: userData.schemail
        };

        let username = `${userData.firstname}${userData.lastname}`;

        let url = "http://localhost:3000/createuser";

        let options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(formData)
        }

        let p1 = await fetch(url, options);

        res.redirect("/info");
    }else{
        let model = req.body;
        res.render("form", model)
    }
});

app.listen(port, '10.0.103.20', () => {
    console.log(`Server running at http://10.0.103.20:${port}/`)
})