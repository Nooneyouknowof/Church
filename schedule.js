let events_element;
let edit_element;
let isEditing = false;
let selectionHasChanged = false;

let selected;
let result = {};
let text_pattern = /[^\s]+/g;
let time_pattern = /^(0*\d|1[0-2]):[0-5]\d\s*[aApP][mM]$/g;
let date_pattern = /^\d+-(0*\d|1[0-2])-(0*\d|[0-3]\d)$/g;
let title;
let duetime;
let duedate;
let description;
let id;

function RegexChecking() {
    title = document.getElementById("create-event-name");
    title.addEventListener("input", () => {
        let text = title.value.match(text_pattern)?.join(" ");
        if (text != null) {
            if (title.value.includes("  ")) {title.value = text}
            title.classList.remove('is-invalid');
            title.classList.add('is-valid');
        } else {
            title.classList.remove('is-valid');
            title.classList.add('is-invalid');
        }
    });
    duetime = document.getElementById("create-time-input");
    duetime.addEventListener("input", () => {
        if (duetime.value.match(time_pattern) != null) {
            duetime.classList.remove('is-invalid');
            duetime.classList.add('is-valid');
        } else {
            duetime.classList.remove('is-valid');
            duetime.classList.add('is-invalid');
        }
    });
    duedate = document.getElementById("create-date-input");
    let duedate_focus_is_once = true;
    duedate.addEventListener("focus", () => {
        if (duedate_focus_is_once) {
            setInterval(()=>{
                if (duedate.value.match(date_pattern) != null) {
                    duedate.classList.remove('is-invalid');
                    duedate.classList.add('is-valid');
                } else {
                    duedate.classList.remove('is-valid');
                    duedate.classList.add('is-invalid');
                }
            },100);
            duedate_focus_is_once = false;
        }
    });
    description = document.getElementById("create-event-description");
    description.addEventListener("input", () => {
        let text = description.value.match(text_pattern)?.join(" ");
        if (text != null) {
            if (description.value.includes("  ")) {description.value = text}
            description.classList.remove('is-invalid');
            description.classList.add('is-valid');
        } else {
            description.classList.remove('is-valid');
            description.classList.add('is-invalid');
        }
    });
}

function addEvent() {
    isEditing = false;
    edit_element.classList.replace("d-none", "d-flex")
    edit_element.innerHTML = `
    <div class="jumbotron shadow">
        <h2 class="display-4">Create Event</h2>
        <hr class="my-4">
        <form class="form-group p-5">
            <label for="create-event-name">Title:</label>
            <input type="text" placeholder="Event Name" class="form-control" id="create-event-name" value="">
            <label for="create-date-input">Date and Time:</label>
            <div class="d-flex justify-content-center" id="create-date">
                <input type="date" class="form-control" id="create-date-input" value="">
                <input type="text" placeholder="##:## (AM|PM)" class="form-control" id="create-time-input" value="">
            </div>
            <label for="create-event-description">Description: </label>
            <input type="text" placeholder="Description" class="form-control" id="create-event-description" value="">
        </form>
        <hr class="my-4">
        <div class="col row justify-content-center">
            <button class="btn btn-success btn-lg" href="#" type="submit" onclick="Event('create');">Submit</button>
        </div>
    </div>
    `
    RegexChecking()
}

function Event(action) {
    let title = document.getElementById("create-event-name");
    let duedate = document.getElementById("create-date-input");
    let duetime = document.getElementById("create-time-input");
    let description = document.getElementById("create-event-description");
    if (action == 'remove') {
        title = {'value': null};
        description = {'value': null};
        duedate = {'value': null};
        duetime = {'value': null}; 
    }
    if (title.value != null && title.value != "" || action == 'remove') {
        if (duedate.value != null && duedate.value != "" || action == 'remove') {
            if (duetime.value?.match(time_pattern) != null && duetime.value != "" || action == 'remove') {
                if (description.value != null && description.value != "" || action == 'remove') {
                    let unixtime;
                    if (action != 'remove') {
                        let militarytime = duetime.value.toUpperCase().split(" ")?.join("");
                        let time = militarytime;
                        militarytime = militarytime.replace("AM", "").replace("PM", "")
                        if (time.includes('PM')) {
                            militarytime = militarytime.split(":");
                            militarytime[0] = parseInt(militarytime[0])+12;
                            militarytime[0] = parseInt(militarytime[0])%24;
                            militarytime = militarytime.join(":");
                        }
                        unixtime = new Date(`${duedate.value} ${militarytime}:00`);
                    }
                    if (selected != null) {id = selected["id"]}
                    fetch(`${api}/schedule/${action}`, {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({"auth": localStorage.getItem("auth"), "date": unixtime, "title": title.value, "description": description.value, 
                        "duedate": duedate.value, "duetime": duetime.value, "selected": selected, "id": id}),
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.Error == false) {
                            edit_element.classList.replace("d-none", "d-flex")
                            edit_element.innerHTML = "";
                            selected = null;
                        }
                    })
                    .catch(error => {
                        alert(error);
                    })
                } else {
                    description.classList.add('is-invalid');
                }
            } else {
                duetime.classList.add('is-invalid');
            }
        } else {
            duedate.classList.add('is-invalid');
        }
    } else {
        title.classList.add('is-invalid');
    }
}

setInterval(()=>{
    if (selectionHasChanged) {
        selectionHasChanged = !selectionHasChanged;
        if (selected == null) {
            edit_element.innerHTML = `
            <div class="jumbotron shadow">
                <h2 class="display-4">${isEditing? "Edit":"Remove"} Event</h2>
                <hr class="my-4">
                <h2 class="p-5 text-secondary">Select Event</h2>
                <hr class="my-4">
            </div>
            `
        } else {
            if (isEditing) {
                key = Object.keys(selected).join("");
                edit_element.innerHTML = `
                <div class="jumbotron shadow">
                    <h2 class="display-4">Edit Event</h2>
                    <hr class="my-4">
                    <form class="form-group p-5">
                        <label for="create-event-name">Title:</label>
                        <input type="text" placeholder="Event Name" class="form-control" id="create-event-name" value="${selected[key].title}">
                        <label for="create-date-input">Date and Time:</label>
                        <div class="d-flex justify-content-center" id="create-date">
                            <input type="date" class="form-control" id="create-date-input" value="${selected[key].duedate}">
                            <input type="text" placeholder="##:## (AM|PM)" class="form-control" id="create-time-input" value="${selected[key].duetime}">
                        </div>
                        <label for="create-event-description">Description: </label>
                        <input type="text" placeholder="Description" class="form-control" id="create-event-description" value="${selected[key].description}">
                    </form>
                    <hr class="my-4">
                    <div class="col row justify-content-center">
                        <button class="btn btn-primary btn-lg" href="#" type="submit" onclick="Event('edit');">Update</button>
                    </div>
                </div>
                `
                RegexChecking()
            } else {
                edit_element.innerHTML = `
                <div class="jumbotron shadow">
                    <h2 class="display-4">Remove Event</h2>
                    <hr class="my-4">
                    <div class="col row justify-content-center">
                        <button class="btn btn-danger btn-lg" href="#" type="submit" onclick="Event('remove');">DELETE ITEM</button>
                    </div>
                </div>
                `
            }
        }
    }
},500);

function editEvent() {
    isEditing = true;
    selectionHasChanged = true;
    edit_element.classList.replace("d-none", "d-flex")
}

function removeEvent() {
    isEditing = false;
    selectionHasChanged = true;
    edit_element.classList.replace("d-none", "d-flex")
}

function setResult(arg) {result = arg}
function getSchedule() {
    events_element = document.getElementById("events-array");
    edit_element = document.getElementById("edit-item");
    fetch(`${api}/schedule`)
    .then(response => response.json())
    .then(data => {
        if (JSON.stringify(data) != JSON.stringify(result)) {
            setResult(data);
            events_element.innerHTML = "";
            data = data.sort();
            let schedule_items_array = [];
            if (data.length == 0) {
                events_element.innerHTML = `
                <div class="px-5 py-4 mr-4 bg-danger text-light rounded shadow hover col-3 selected">
                    <div class="d-flex justify-content-between">
                        <h2>No Schedule</h2>
                    </div>
                    <div class="text-dark">Try Pressing the <button class="btn btn-outline-success btn-sm mx-1" type="button" cursorshover="true" onclick="addEvent()">Add Event</button> Button</div>
                </div>
                `;
            }
            data.map(item => {
                let OGitem = item;
                let time = Object.keys(item).join("");
                item = item[time];
                let event_div = document.createElement("div");
                event_div.innerHTML = `<p>${new Date(time).toDateString()}</p><div class="d-flex justify-content-between"><h2>${item["title"]}</h2>
                <h4>${item["duetime"].toUpperCase().replaceAll(" ", "")}</h4></div>`
                event_div.classList.add("px-5", "py-4", "mr-4", "bg-light", "text-black", "rounded", "shadow", "hover", "col-3")
                let description = document.createElement("div");
                description.innerHTML = item["description"];
                event_div.appendChild(description);
                events_element.appendChild(event_div);
                schedule_items_array.push(event_div);
                event_div.addEventListener("click", () => {
                    schedule_items_array.map(element => {
                        element.classList.remove('selected');
                        element.classList.replace("bg-dark", "bg-light");
                        element.classList.replace("text-white", "text-black");
                    });
                    event_div.classList.add('selected');
                    event_div.classList.replace("bg-light", "bg-dark");
                    event_div.classList.replace("text-black", "text-white");
                    selected = OGitem;
                    selectionHasChanged = true;
                })
            })
        }
    })
    .catch(error => {
        events_element.innerHTML = `<h1 class="text-white">${error}</h1>`;
        console.log(error);
    });
}
