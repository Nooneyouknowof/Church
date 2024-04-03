let api = 'http://192.168.0.35:5000';
let username = document.getElementById('username');
let password = document.getElementById('password');
let login_element = document.getElementById('login');
let display = document.getElementById('result');
let error_element = document.getElementById('return');
function login() {
    if (username != "" && password != "") {
        username.classList.remove('is-invalid');
        password.classList.remove('is-invalid');
        fetch(`${api}/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"username": username.value, "password": password.value}),
        })
        .then(response => response.json())
        .then(data => {
            if (data.Error == false) {
                localStorage.setItem("auth", data.auth);
                username.classList.add('is-valid');
                password.classList.add('is-valid');
                display.innerHTML = data.body
                document.getElementById('card-inner').classList.add("flip");
                display.classList.add("d-none");
                setTimeout(()=>{
                    display.classList.remove("d-none");
                    login_element.classList.replace('d-flex', 'd-none');
                },1000);
                setTimeout(()=>{
                    display.classList.remove("card-back");
                },2000);
                setInterval(()=>{getSchedule()},10000);
                getSchedule();
            } else if (data.Error == "invalid user") {
                username.value = "";
                password.value = "";
                username.classList.add('is-invalid');
            } else {
                password.value = "";
                username.classList.add('is-valid');
                password.classList.add('is-invalid');
                error_element.innerHTML = data.Error;
            }
        })
    }
}

fetch(`${api}/auth`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({"auth": localStorage.getItem("auth")}),
})
.then(response => response.json())
.then(data => {
    if (data.Error == false) {
        username.classList.add('is-valid');
        password.classList.add('is-valid');
        display.innerHTML = data.body;
        document.getElementById('card-inner').classList.add("flip");
        display.classList.add("d-none");
        setTimeout(()=>{
            display.classList.remove("d-none");
            login_element.classList.replace('d-flex', 'd-none');
        },1000);
        setTimeout(()=>{
            display.classList.remove("card-back");
        },2000);
        setInterval(()=>{
            try {getSchedule()} catch {};
        },10000);
        getSchedule();
    } else {
        localStorage.removeItem("auth");
    }
})