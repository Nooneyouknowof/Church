// Made by:
//   ____        __                _              __  ___        _  __                      __   __            
//  / __ \ ____ / /_ ___ _ _  __  (_) ___        /  |/  / ____  / |/ / ___ _ __ __  ___ _  / /  / /_ ___   ___ 
// / /_/ // __// __// _ `/| |/ / / / / _ \      / /|_/ / / __/ /    / / _ `// // / / _ `/ / _ \/ __// _ \ / _ \
// \____/ \__/ \__/ \_,_/ |___/ /_/  \___/     /_/  /_/  \__/ /_/|_/  \_,_/ \_,_/  \_, / /_//_/\__/ \___//_//_/
//                                                                               /___/                        

let verse = document.getElementById('quote');
fetch('https://labs.bible.org/api/?passage=random&type=json')
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}).then(data => {
    data = data[0]
    console.log(data)
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
