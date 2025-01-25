const select = document.querySelector("#visualMode")
const logoImg = document.querySelector("footer img")
const body = document.body;
select.addEventListener("change", e => {
    const mode = e.target.value
    if(mode == 'dark')
        darkMode();
    else
        lightMode();

    function darkMode(){
        body.classList.add('dark')
        logoImg.src="./byui-logo_white.png"
    }

    function lightMode(){
        body.classList.remove('dark')
        logoImg.src="./byui-logo_blue.webp"
    }
})
