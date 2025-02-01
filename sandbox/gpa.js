function getGrades(){
    const grades_IN = document.querySelector("#grades");
    let grades = grades_IN.value.split(",");
    return grades;
}

function letterToNumeric(letter){
    switch (letter) {
        case 'A':
            return 4.0
            break;
        case 'B':
            return 3.0
            break;
        case 'C':
            return 2.0
            break;
        case 'D':
            return 1.0
            break
        default:
            return 0.0
            break;
    }
}

function calculateGPA(grades){
    let result = grades.map(letterToNumeric).reduce((acc, cur) => acc + cur)/grades.length;
    result = result.toFixed(2)
    return result;
}

function displayGPA(gpa){
    const output_P = document.querySelector("#output")
    output_P.innerHTML = gpa;
}

document.querySelector("#submitButton").addEventListener("click", () => {
    let grades = getGrades();
    let gpa = calculateGPA(grades);
    displayGPA(gpa);
})