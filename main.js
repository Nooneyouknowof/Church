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
}
platform_elements.children[0].classList.add('platform-item-active');
