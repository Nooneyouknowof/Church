let events_element = document.getElementById("events-array");
let edit_element = document.getElementById("edit-item");

let selected;
let result = {};

function addEvent() {
    edit_element.classList.replace("d-none", "d-flex")
    edit_element.innerHTML = `
    <div class="jumbotron">
        <h2 class="display-4">Create Event</h2>
        <hr class="my-4">
        <from class="form-group p-5">
            
            <input type="date" class="form-control">
        </from>
        <hr class="my-4">
        <p class="lead">
            <a class="btn btn-primary btn-lg" href="#" role="button">Submit</a>
        </p>
    </div>
    `
}

function setResult(arg) {result = arg}
function getSchedule() {
    console.log(new Date())
    fetch('http://192.168.0.35:5000/schedule')
    .then(response => response.json())
    .then(data => {
        if (JSON.stringify(data) != JSON.stringify(result)) {
            setResult(data);
            events_element.innerHTML = "";
            Object.keys(data).map(key=>{
                let event_div = document.createElement("div");
                event_div.innerHTML = `<h2>${key}</h2>`
                event_div.classList.add("px-5", "py-4", "mr-4", "bg-light", "text-black", "rounded", "shadow", "hover", "col-3")
                let description = document.createElement("div");
                description.textContent = data[key];
                event_div.appendChild(description);
                events_element.appendChild(event_div);
                events_element.addEventListener("click", ()=>{
                    selected = data[key];
                })
            })
        }
    })
    .catch(error => {
        events_element.innerHTML = `<h1 class="text-white">${error}</h1>`;
        console.log(error);
    });
}

setInterval(()=>{getSchedule()},10000);
getSchedule();