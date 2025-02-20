const GITHUB_READONLY_TOKEN = "gh" + "p_4boFYPrxAUM59JRt" + "AmLqnyAfIwqQtx2QiqN9";
const USERNAME = "Yucheol-Son-BYUI";

async function fetchRepositories(username) {
  const url = `https://api.github.com/users/${username}/repos?per_page=100`;

  const response = await fetch(url, {
    headers: { Authorization: `token ${GITHUB_READONLY_TOKEN}` },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch repositories: ${response.status}`);
  }

  return await response.json();
}

async function fetchContributionCalendar(username) {
  const query = `
    {
      user(login: "${username}") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
      }
      
    }`;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${GITHUB_READONLY_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch contribution calendar: ${response.status}`
    );
  }

  const data = await response.json();
  return data.data.user.contributionsCollection.contributionCalendar;
}
var REPOS;
var CONTRIBUTION;
function main() {

    REPOS = fetchRepositories(USERNAME);
    CONTRIBUTION = fetchContributionCalendar(USERNAME);
}

main();

var temp;
function renderContributionCalendar(data){
  const calendarTable = document.querySelector("#calendar-table tbody");
  console.log(data)
  temp = data; 
  let trHTML = Array(7).fill("")
  for(day=0; day < 7; day++){
    for(week=0;week < data.weeks.length;week++){
      if(week == data.weeks.length - 1 && day >= data.weeks[week].contributionDays.length) continue;

      const cur = data.weeks[week].contributionDays[day];
      trHTML[day] += `<td class="contributionDay" style="background-color:${cur.color}" data-date="${cur.date}" data-contribution-count="${cur.contributionCount}"></td>`
    }
  }
  let result = "";
  trHTML.forEach(tr => result += `<tr>` + tr + `</tr>`)
  calendarTable.insertAdjacentHTML("afterbegin", result)
  
}

REPOS.then(data => console.log(data))
CONTRIBUTION.then(renderContributionCalendar)