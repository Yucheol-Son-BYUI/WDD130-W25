//  arrays.js
console.log("Activity 1")
const steps = ["one", "two", "three"];
const listTemplate = (step) => {
    console.log(step)
  return `<li>${step}</li>`//the html string made from step
}
const stepsHtml = steps.map(step => `<li>${step}</li>`) // use map to convert the list from strings to HTML
// document.querySelector("#myList").innerHTML = steps.map(step => `<li>${step}</li>`).join("")// set the innerHTM
document.querySelector("#myList").innerHTML = stepsHtml.join("")// set the innerHTM

console.log("Activity 2")
const grades = ['A', 'B', 'B']
function letterToNumeric(letter){
    let numeric = 0
    letter = letter.toUpperCase()
    if(letter == 'A')
        numeric = 4
    else if(letter == 'B')
        numeric = 3
    else if(letter == 'C')
        numeric = 2
    else if(letter == 'D')
        numeric = 1
    
    return numeric 
}
console.log(grades.map(letterToNumeric))

console.log("Activity 3")
console.log("accumalted gpaPoint: ", grades.map(letterToNumeric).reduce((acc, curV, curI, arr) => acc+curV))

console.log("Activity 4")
const fruits = ['watermelon', 'peach', 'apple', 'tomato', 'grape']
console.log(fruits.filter(fruit => fruit.length < 6))

console.log("Activity 4")
const indexArr = [12, 34, 21, 54, 283]
const luckyNumber = 283
console.log(indexArr.indexOf(luckyNumber))
