let verse = document.getElementById('quote');
fetch('https://labs.bible.org/api/?passage=random&type=json')
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}).then(data => {
    data = data[0]
    verse.innerHTML = `${data.text}<br><br>${data.bookname} ${data.chapter}:${data.verse}`
})

let platform_elements = document.getElementById('platforms-array');
for(let i = 0; i < platform_elements.children.length; i++) {
    platform_elements.children[i].addEventListener("mouseover", () => {
        for(let a = 0; a < platform_elements.children.length; a++) {
            platform_elements.children[a].classList.remove('platform-item-active');
            platform_elements.children[a].children[0].classList.remove('hide');
            platform_elements.children[a].children[1].classList.add('hide');
            setTimeout(()=>{
                platform_elements.children[a].children[1].classList.replace('hide','d-none');
            },500);
        }
        platform_elements.children[i].classList.add('platform-item-active');
        platform_elements.children[i].children[0].classList.add('hide');
        platform_elements.children[i].children[1].classList.remove('hide');
        platform_elements.children[i].children[1].classList.remove('d-none');
    });
    platform_elements.children[i].addEventListener("click", () => {
        window.open(platform_elements.children[i].children[2].textContent, "_blank");
    });
}
platform_elements.children[0].classList.add('platform-item-active');
platform_elements.children[1].classList.add('platform-item-active');
platform_elements.children[2].classList.add('platform-item-active');

function login_btn() {
    window.location.href = "admin.html";
}

function donate_btn() {
    window.location.href = "assets/images/uridam.png";
}

let api = 'http://192.168.0.35:5000';
let schedule = document.querySelector("#events > div")
fetch(`${api}/schedule`)
.then(response => response.json())
.then(data => {
    if (data.length == 0) {
        schedule.innerHTML = `
        <div class="px-5 py-4 mr-4 bg-danger text-light rounded shadow hover col-3 selected">
            <div class="d-flex justify-content-between">
                <h2>No Schedule</h2>
            </div>
            <div class="text-dark">Try again later, if issue persists please contact us</div>
        </div>
        `
    }
    data.map(item => {
        time = Object.keys(item).join("");
        item = item[time];
        let event_div = document.createElement("div");
        event_div.innerHTML = `<p>${new Date(time).toDateString()}</p><div class="d-flex justify-content-between"><h2>${item["title"]}</h2>
        <h4>${item["duetime"].toUpperCase().replaceAll(" ", "")}</h4></div>`
        event_div.classList.add("px-5", "py-4", "mr-4", "bg-light", "text-black", "rounded", "shadow", "hover", "col-3")
        let description = document.createElement("div");
        description.innerHTML = item["description"];
        event_div.appendChild(description);
        schedule.appendChild(event_div);
    })
})
