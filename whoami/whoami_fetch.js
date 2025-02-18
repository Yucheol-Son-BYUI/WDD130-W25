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
