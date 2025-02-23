const GITHUB_READONLY_TOKEN =
  "gh" + "p_4boFYPrxAUM59JRt" + "AmLqnyAfIwqQtx2QiqN9";
const USERNAME = "Yucheol-Son-BYUI";
var REPOS;
var CONTRIBUTION;
// async function fetchRepositories(username) {
//   const url = `https://api.github.com/users/${username}/repos?per_page=100`;

//   const response = await fetch(url, {
//     headers: { Authorization: `token ${GITHUB_READONLY_TOKEN}` },
//   });

//   if (!response.ok) {
//     throw new Error(`Failed to fetch repositories: ${response.status}`);
//   }

//   return await response.json();
// }

async function fetchRepositories() {
  const query = `
    {
      user(login: "${USERNAME}") {
        avatarUrl
        repositories(first: 100){
          nodes{
            name
            url
            description
            createdAt
            updatedAt
            primaryLanguage{
              name
            }
              languages(first: 10) {
          edges {
            node {
              name
            }
            size
          }
        }
            stargazerCount
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
  return data.data;
}
// 함수 호출 (원하는 페이지 번호 입력)
REPOS = fetchRepositories(USERNAME);

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

function main() {
  REPOS = fetchRepositories(USERNAME);
  CONTRIBUTION = fetchContributionCalendar(USERNAME);
}

main();

var temp;
function renderContributionCalendar(data) {
  const calendarTable = document.querySelector("#calendar-table tbody");
  temp = data;
  let trHTML = Array(7).fill("");
  trHTML[0] = `<td>Sun</td>`;
  trHTML[1] = `<td>Mon</td>`;
  trHTML[2] = `<td>Tue</td>`;
  trHTML[3] = `<td>Wed</td>`;
  trHTML[4] = `<td>Thu</td>`;
  trHTML[5] = `<td>Fri</td>`;
  trHTML[6] = `<td>Sat</td>`;
  for (day = 0; day < 7; day++) {
    for (week = 0; week < data.weeks.length; week++) {
      if (
        week == data.weeks.length - 1 &&
        day >= data.weeks[week].contributionDays.length
      )
        continue;

      const cur = data.weeks[week].contributionDays[day];
      trHTML[
        day
      ] += `<td class="contributionDay" style="background-color:${cur.color}" data-date="${cur.date}" data-contribution-count="${cur.contributionCount}"></td>`;
    }
  }
  let result = trHTML.reduce((acc, tr) => (acc += `<tr>` + tr + `</tr>`));
  calendarTable.insertAdjacentHTML("afterbegin", result);
}

function renderRepositories(data) {
  const projectList = document.querySelector("#projectList");
  const repoListMoreButton = document.querySelector(
    "#projectList .moreProject"
  );
  const avatarUrl = data.user.avatarUrl;
  const repositories = data.user.repositories.nodes;

  const result = repositories.reduce(
    (acc, repo) => acc + repoTemplate(repo),
    ""
  );
  repoListMoreButton.insertAdjacentHTML("beforebegin", result);

  // render maximum 4 projects at first time
  const projects = document.querySelectorAll("#projectList .project");
  for (i = 4; i < projects.length; i++) {
    projects[i].classList.add("hide");
  }

  if (projects.length <= 4) {
    repoListMoreButton.innerText = "no more projects";
    repoListMoreButton.classList.add("disabled");
  } else {
    repoListMoreButton.innerText =
      Math.min(projects.length - 4, 4) + " more project";
  }

  function repoTemplate(repo) {
    return `
    <li class="project"><figure class="projectLogo"><img src="${avatarUrl}" width="30px" height="30px"></figure><h3><a href="${
      repo.url
    }" target="blank">${repo.name}</a> <span class="language">${
      repo.primaryLanguage.name
    }</span></h3> <span class="star">⭐${repo.stargazerCount}</span><p>${
      repo.description == null ? "no description" : repo.description
    }</p></li>`;
  }
}

REPOS.then(renderRepositories);
CONTRIBUTION.then(renderContributionCalendar);
