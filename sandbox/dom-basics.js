const newParagraph = document.createElement("p");
newParagraph.innerText = "Added with Javascript!";
document.body.appendChild(newParagraph);

const newImage = document.createElement("img");
newImage.setAttribute("src", "https://picsum.photos/200");
newImage.setAttribute("alt", "Photo 1");
document.body.appendChild(newImage);

const newDiv = document.createElement("div");
const name1 = "yucheol";
newDiv.innerHTML = `<ul><li>${name1}</li><li>Two</li><li>Three</li></ul>`;
document.body.appendChild(newDiv);

const newSection = document.createElement("section");

const newH2 = document.createElement("h2");
newH2.innerText = "DOM Basics";
newSection.appendChild(newH2);

const newp = document.createElement("p");
newp.innerText = "This was added through Javascript";
newSection.appendChild(newp);

document.body.appendChild(newSection);
// document.body.append(newSection); //it works to!