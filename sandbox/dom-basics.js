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
const title = "DOM Basics";
const subtitle = "Creating elements and appendint them to the DOM";
const content = "new Content";
newSection.innerHTML = `
<h2>${title}</h2>
<h3>${subtitle}</h3>
<p>${content}</p>
`;

const newp = document.createElement("p");
newp.innerText = "This was added through Javascript";
newSection.appendChild(newp);

document.body.appendChild(newSection);
// document.body.append(newSection); //it works to!

const ingredientData = ["Pinto Beans", "Corn", "Spices", "Tortillas"];
const portionData = ["1 15oz can", "1 15oz can", "1 Tbsp", "8"];

let ingredientString = `<h2>Ingredient</h2><ul>`;
// for(i = 0; i<ingredientData.length;i++){
//     ingredientString += `<li>${ingredientData[i]}<ul><li>${portionData[i]}</li></ul></li>`
// };
ingredientData.forEach((element, i) => {
    ingredientString += `<li>${element}<ul><li>${portionData[i]}</li></ul></li>`
})

ingredientString+= `</ul>`;


document.body.innerHTML += ingredientString;