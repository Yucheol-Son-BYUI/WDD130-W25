
const now = new Date();
const availableTimes = [
  ["11:30~21:00"] //Sunday
  ,["08:00~12:30", "15:15~18:00"]
  ,["09:00~10:00", "11:30~12:30", "15:15~21:00"]
  ,["08:00~12:30", "15:15~21:00"]
  ,["09:00~10:00", "11:30~12:30", "15:15~21:00"]
  ,["08:00~12:30", "14:00~21:00"]
  ,["12:00~21:00"]
]
function main(){
  const tbody = document.querySelector(".calendar tbody");
  const yearMonth = document.querySelector(".calendar thead td");
  const tds = tbody.querySelectorAll("td")
  const firstSunday = getFirstSunday();

  const monthYear = now.toLocaleString('default', { month: 'short' }) + " " + now.getFullYear(); // Feb 2025
  yearMonth.innerText = monthYear
  

  let tempDay = new Date(firstSunday);
  console.log(tempDay, firstSunday)
  tds.forEach((cur) => {
    const daySpan = document.createElement('span');

    if(tempDay < now){
      cur.classList.add("disabled")
    }else if(tempDay.valueOf() == now.valueOf()){
      cur.classList.add('today')
    }
    let availableTimeText = "Available Time:\n" + availableTimes[tempDay.getDay()].join("\n");

    cur.setAttribute("data-available-time",availableTimeText);
    cur.setAttribute("data-date",tempDay);
    daySpan.innerText = tempDay.getDate();
    cur.insertAdjacentElement("afterbegin",daySpan)

    tempDay.setDate(tempDay.getDate() + 1);
  } );

}

function getFirstSunday(){
  const firstSunday = new Date();
  firstSunday.setDate(firstSunday.getDate() - now.getDay());
  return firstSunday
}

function renderTimeList(e){
  if (e.target.tagName != 'TD' || e.target.classList.contains('disabled')) {
    return;
  }
  const timeList = document.querySelector("#timeList");
  let availableTimeArray = e.target.dataset.availableTime.split("\n");
  availableTimeArray = availableTimeArray.splice(1,availableTimeArray.length-1);
  const date = new Date(e.target.dataset.date)
  const result = `<li>${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}</li>` + availableTimeArray.map(availTimeTemplate).join("");
  timeList.innerHTML= result;

  const mailTo = document.querySelector(".calendar a");
  formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  mailTo.setAttribute("href","mailto:son20001@byui.edu?subject=Meeting Request for " + formattedDate + "&body=Dear Yucheol Arthur Son,%0A%0AI hope this email finds you well. I would like to request a meeting with you at [the time you want to meet] on " + formattedDate +", to discuss [the purpose of the meeting].%0A%0APlease let me know if this date works for you or if another time would be more convenient.%0A%0AThank you for your time and consideration.%0A%0ABest regards, %0A [Your Name]")

  function availTimeTemplate(time){
    return `<li>${time}</li>`
  }
}

main()

document.querySelector(".calendar tbody").addEventListener('click', renderTimeList);