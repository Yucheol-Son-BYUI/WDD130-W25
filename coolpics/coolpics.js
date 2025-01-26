const menu_BTN = document.querySelector("#mobileMenu");
const menu_UL = document.querySelector("header nav ul");
menu_BTN.addEventListener("click", toggleMenu);
function toggleMenu(){
    menu_UL.classList.contains("hide") ? menu_UL.classList.remove("hide") : menu_UL.classList.add("hide");
}

function handleResize(){
    if(window.innerWidth > 1000)
        menu_UL.classList.contains("hide") ? null : menu_UL.classList.add("hide");
}
window.addEventListener("resize", handleResize);


const viewer_DIV = document.querySelector("div.viewer");
const modalClose_BTN = document.querySelector("div.viewer button");
function modalClose(e){
    const modal = e.target.closest("div");
    modal.classList.add("hide");
}
modalClose_BTN.addEventListener("click", modalClose);

function viewerOpen(e){
    console.log(e.target);
}
const gallery_SECTION = document.querySelector("main>section");
function openImgViewer(e){
    // even propagation
    // console.log(e.target.closest("figure"));
    if(e.target.tagName == 'IMG' && e.target.closest("section") == gallery_SECTION){
        viewer_DIV.querySelector("img").setAttribute("src",(e.target.getAttribute("src")))
        viewer_DIV.classList.remove("hide");
    }
}
gallery_SECTION.addEventListener("click", openImgViewer);