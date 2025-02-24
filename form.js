console.log("form.js is running...");

const main = document.getElementById('scamform');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const phonenumber = document.getElementById('phonenumber');
const address = document.getElementById('address');
const dob = document.getElementById('dob');
const schemail = document.getElementById('schemail');

const fnameError = document.getElementById('fnameError');
const lnameError = document.getElementById('lnameError');
const phoneError = document.getElementById('phoneError');
const addrError = document.getElementById('addrError');
const dobError = document.getElementById('dobError');
const schemailError = document.getElementById('schemailError')

//console.log(main, firstname, lastname, dob)

main.addEventListener("submit", (evt) => {
    console.log('checking validity')

    let isValid = false;

    let namePattern = /\S{2,}/;
    let fnameIsValid = namePattern.test(firstname.value);
    let lnameIsValid = namePattern.test(lastname.value);

    let phonePattern = /[0-9 ()-]{10,20}/;
    let phoneIsValid = phonePattern.test(phonenumber.value);

    let addressPattern = /\S{1,} \S{1,}/;
    let addressIsValid = addressPattern.test(address.value);

    let dobPattern = /\S{2,}/;
    let dobIsValid = dobPattern.test(dob.value);

    let schemailPattern = /\S{1,}@\S{2,}.\S{2,}/;
    let schemailIsValid = schemailPattern.test(schemail.value)

    isValid = fnameIsValid && lnameIsValid && phoneIsValid && addressIsValid && dobIsValid && schemailIsValid

    if (isValid) {

    } else {
        firstname.classList.remove("invalid");
        lastname.classList.remove("invalid");
        address.classList.remove("invalid");
        phonenumber.classList.remove("invalid");
        dob.classList.remove("invalid");
        schemail.classList.remove("invalid");
        fnameError.innerText = "";
        lnameError.innerText = "";
        addrError.innerText = "";
        phoneError.inner = "";
        dobError.innerText = "";
        schemailError.innerText = "";

        if (!fnameIsValid){
            firstname.classList.add("invalid");
            fnameError.innerText = "Required at least 2 characters"
        }
        if (!lnameIsValid){
            lastname.classList.add("invalid");
            lnameError.innerText = "Required at least 2 characters"
        }
        if (!phoneIsValid){
            phonenumber.classList.add("invalid");
            phoneError.innerText = "Enter Valid Phone Number (ex: (XXX)XXX-XXXX)"
        }
        if (!addressIsValid){
            address.classList.add("invalid");
            addrError.innerText = 'Enter Valid Address line';
        }
        if (!dobIsValid){
            dob.classList.add("invalid");
            dobError.innerText = "Enter Valid Date";
        }
        if (!schemailIsValid){
            schemail.classList.add("invalid");
            schemailError.innerText = "Enter Valid Student Email";
        }

        evt.preventDefault()
    };
});