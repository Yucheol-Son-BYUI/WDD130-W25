
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
    const dayText = document.createElement('span'); // 동그라미를 위한 새로운 span 요소 생성
    if(tempDay < now){
      cur.classList.add("disabled")
    }else if(tempDay.valueOf() == now.valueOf()){
      // 텍스트에 빨간 동그라미 스타일 적용
      cur.style.display = 'inline-block'; // li를 inline-block으로 설정하여 동그라미 크기 조절 가능
      cur.style.position = 'relative'; // 자식 요소를 position 절대 위치로 설정하기 위해 필요
  
      dayText.style.position = 'absolute'; // 동그라미를 li 요소의 텍스트 주위에 절대 위치로 배치
      // dayText.style.top = '50%'; // 세로 가운데 정렬
      // dayText.style.left = '50%'; // 가로 가운데 정렬
      // dayText.style.transform = 'translate(-50%, -50%)'; // 정확히 중앙에 위치하도록 조정
      dayText.style.width = `1em`; // li의 width를 동그라미의 크기로 설정
      dayText.style.height = `1em`; // li의 height를 동그라미의 크기로 설정
      dayText.style.borderRadius = '50%'; // 원 모양으로 만들기 위해 border-radius를 50%로 설정
      dayText.style.border = '2px solid red'; // 빨간색 테두리 설정
    }
    let availableTimeText = "Available Time:\n" + availableTimes[tempDay.getDay()].map(time => time + "\n").join("");

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

main()