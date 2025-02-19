<<<<<<< HEAD
const USERNAME = "Yucheol-Son-BYUI"; // 🔥 조회할 GitHub 사용자 이름 입력

// const query = `
//   query(${USERNAME}) {
//     user(login: "${USERNAME}") {
//       contributionsCollection {
//         contributionCalendar {
//           totalContributions
//           weeks {
//             contributionDays {
//               contributionCount
//               date
//             }
//           }
//         }
//       }
//     }
//   }
// `;

// fetch("https://api.github.com/graphql", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     "Authorization": `Bearer ${GITHUB_TOKEN}`
//   },
//   body: JSON.stringify({ query })
// })
//   .then(response => response.json())
//   .then(data => {
//     if (data.errors) {
//       console.error("GraphQL Errors:", data.errors);
//     } else {
//       console.log("All data: ", data.data)
//       console.log("Contribution Data:", data.data.user.contributionsCollection.contributionCalendar);
//     }
//   })
//   .catch(error => console.error("Fetch Error:", error));

// const GITHUB_TOKEN = 'your_personal_access_token'; // GitHub 토큰을 입력하세요.

async function fetchRepositories(username) {
  const url = `https://api.github.com/users/${username}/repos?per_page=100`;

  const response = await fetch(url, {
    headers: { Authorization: `token ${GITHUB_TOKEN}` },
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
      Authorization: `bearer ${GITHUB_TOKEN}`,
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

async function main() {
  // const username = 'your_github_username'; // 대상 GitHub 사용자명 입력

  try {
    const [repos, contributionCalendar] = await Promise.all([
      fetchRepositories(USERNAME),
      fetchContributionCalendar(USERNAME),
    ]);

    console.log("Repositories:", repos);
    console.log("Contribution Calendar:", contributionCalendar);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
=======
REPOS.then(data => console.log(data))
CONTRIBUTION.then(data => console.log(data))
>>>>>>> c56b596 (feat: fetch github data async)
