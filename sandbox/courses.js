// courses.js
const aCourse = {
  courseCode: "CSE121b",
  name: "Javascript Language",
  credits: 3,
  sections: [
    {
      sectionNum: 1,
      roomNum: "STC 353",
      enrolled: 26,
      days: "TTh",
      instructor: "Bro T",
    },
    {
      sectionNum: 2,
      roomNum: "STC 347",
      enrolled: 28,
      days: "TTh",
      instructor: "Sis A",
    },
  ],
  enrollStudent: function(sectionId){
    const section = this.sections.find(item => item.sectionNum == sectionId)
    section.enrolled += 1
    renderSection(this.sections);
  },

  dropStudent: function(sectionId){
    const section = this.sections.find(item => item.sectionNum == sectionId)
    section.enrolled -= 1
    renderSection(this.sections);
  },
  updateStudent: function(sectionId, add = true){
    const section = this.sections.find(item => item.sectionNum == sectionId)
    section.enrolled += add ? 1 : -1
    renderSection(this.sections);
  
  } 
};

function renderCourse(course){
  const courseNameH = document.querySelector("#courseName");
  const courseCodeH = document.querySelector("#courseCode");

  courseNameH.innerHTML = course.name;
  courseCodeH.innerHTML = course.courseCode;
}

function renderSection(sections){
  const sectionBody = document.querySelector("#sections");
  sectionBody.innerHTML = '';
  let resultHTML = ``;
  // for(section of sections){
  //   resultHTML += sectionTemplate(section)
  // }
  sections.forEach(section => resultHTML += sectionTemplate(section))
  // sectionBody.innerHTML = resultHTML;
  sectionBody.insertAdjacentHTML("afterbegin", resultHTML)
}

function sectionTemplate(section){
  return `<tr>
          <th>${section.sectionNum}</th>
          <th>${section.roomNum}</th>
          <th>${section.enrolled}</th>
          <th>${section.days}</th>
          <th>${section.instructor}</th>
        </tr>
    `;
}

// console.log(aCourse);

renderCourse(aCourse);
renderSection(aCourse.sections);

document.querySelector("#enrollStudent").addEventListener('click', function(){
  let sectionNum = document.querySelector("#sectionNumber").value
  aCourse.updateStudent(sectionNum, true);
})
document.querySelector("#dropStudent").addEventListener('click', function(){
  let sectionNum = document.querySelector("#sectionNumber").value
  aCourse.updateStudent(sectionNum,false);
})