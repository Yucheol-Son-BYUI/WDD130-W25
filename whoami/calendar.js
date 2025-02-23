
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
  tds.forEach((cur) => {
    const daySpan = document.createElement('span');

    if(tempDay < now){
      cur.classList.add("disabled")
    }else if(tempDay.getMonth() == now.getMonth() && tempDay.getDate() == now.getDate()){
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
function submitHandler(e){
  e.preventDefault();
  const value = this.timeToMeet.value;
  // if(!value.includes(":"))
  //   return false;
  
  // when only meetingTime(30min) is entered
  const timeText = value.split(":")
  const hour = parseInt(timeText[0])
  const minute = parseInt(timeText[1])
  const meetingTime = parseInt(this.meetingTime.value)
  if(!value && meetingTime > 0){
    console.log("meeting Time only case")
    const tds = Array.from(document.querySelectorAll(".calendar tbody td"));
    const availableDays = tds.filter(filterAvailableDayWithMeetingTime);
    tds.forEach(day => day.style.backgroundColor='white')
    availableDays.forEach(day => day.style.backgroundColor='#f9ff5e');

    return;
  }
  console.log("normal case")
  // if(isNaN(hour) || isNaN(minute) || isNaN(meetingTime))
  //   return false;
  
  const tds = Array.from(document.querySelectorAll(".calendar tbody td"));
  const availableDays = tds.filter(filterAvailableDay);
  tds.forEach(day => day.style.backgroundColor='white')
  availableDays.forEach(day => day.style.backgroundColor='#f9ff5e')

  function filterAvailableDay(td){
    console.log("d")
    const today = new Date(td.dataset.date);
    let availableTimeArray = td.dataset.availableTime.split("\n");
    availableTimeArray = availableTimeArray.splice(1,availableTimeArray.length-1);
    availableTimeArray = availableTimeArray.map(timeRangeToDateArray) // [[18:00, 21:00], [21:00, 22:00]]
    
    const searchDate = new Date(today)
    searchDate.setHours(hour)
    searchDate.setMinutes(minute);

    for(i = 0; i < availableTimeArray.length; i++){
      const startTime = availableTimeArray[i][0];
      const endTime = availableTimeArray[i][1];
      endTime.setMinutes(endTime.getMinutes() - meetingTime);
      if(searchDate >= startTime && searchDate <= endTime)
        return true;
    }
    return false;
    // availableTimeArray.
    
    function timeRangeToDateArray(timeRange){
      const timeRangeArr = timeRange.split("~");
      const firstTimeArr = timeRangeArr[0].split(":")
      const secondTimeArr = timeRangeArr[1].split(":")
      
      const firstDate = new Date(today);
      firstDate.setHours(parseInt(firstTimeArr[0]))
      firstDate.setMinutes(parseInt(firstTimeArr[1]))
      const secondDate = new Date(today);
      secondDate.setHours(parseInt(secondTimeArr[0]))
      secondDate.setMinutes(parseInt(secondTimeArr[1]))

      return [firstDate,secondDate]
    }
  }
  function filterAvailableDayWithMeetingTime(td){
    const today = new Date(td.dataset.date);
    let availableTimeArray = td.dataset.availableTime.split("\n");
    availableTimeArray = availableTimeArray.splice(1,availableTimeArray.length-1);
    availableTimeArray = availableTimeArray.map(timeRangeToDateArray) // [[18:00, 21:00], [21:00, 22:00]]
    

    for(i = 0; i < availableTimeArray.length; i++){
      const startTime = availableTimeArray[i][0];
      const endTime = availableTimeArray[i][1];
      const diffInMs = endTime.getTime() - startTime.getTime();
      const diffInMinutes = diffInMs / (1000 * 60);

      if(diffInMinutes >= meetingTime)
        return true;
    }
    return false;
    // availableTimeArray.
    
    function timeRangeToDateArray(timeRange){
      const timeRangeArr = timeRange.split("~");
      const firstTimeArr = timeRangeArr[0].split(":")
      const secondTimeArr = timeRangeArr[1].split(":")
      
      const firstDate = new Date(today);
      firstDate.setHours(parseInt(firstTimeArr[0]))
      firstDate.setMinutes(parseInt(firstTimeArr[1]))
      const secondDate = new Date(today);
      secondDate.setHours(parseInt(secondTimeArr[0]))
      secondDate.setMinutes(parseInt(secondTimeArr[1]))

      return [firstDate,secondDate]
    }
  }
}
main()

document.querySelector(".calendar tbody").addEventListener('click', renderTimeList);
document.querySelector("#search").addEventListener('submit', submitHandler);