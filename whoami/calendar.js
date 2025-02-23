
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
    const dayText = document.createElement('span');
    if(tempDay < now){
      cur.classList.add("disabled")
    }else if(tempDay.valueOf() == now.valueOf()){
      // red circle for today
      cur.style.display = 'inline-block';
      cur.style.position = 'relative';
  
      dayText.style.position = 'absolute';
      dayText.style.width = `1em`;
      dayText.style.height = `1em`;
      dayText.style.borderRadius = '50%';
      dayText.style.border = '2px solid red';
    }
    let availableTimeText = "Available Time:\n" + availableTimes[tempDay.getDay()].join("\n");

    cur.setAttribute("data-available-time",availableTimeText);
    dayText.innerText = tempDay.getDate();
    cur.insertAdjacentElement("afterbegin",dayText)

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
  
  console.log(availableTimeArray)

  const result = availableTimeArray.map(availTimeTemplate).join("");
  timeList.innerHTML= result;


  function availTimeTemplate(time){
    return `<li>${time}</li>`
  }
}

main()

document.querySelector(".calendar tbody").addEventListener('click', renderTimeList);