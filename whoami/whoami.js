const GITHUB_TOKEN = "YOUR_GITHUB_PERSONAL_ACCESS_TOKEN"; // 🔥 본인의 GitHub 토큰 입력
const USERNAME = "your-github-username"; // 🔥 조회할 GitHub 사용자 이름 입력

const query = `
  query {
    user(login: "${USERNAME}") {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

fetch("https://api.github.com/graphql", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${GITHUB_TOKEN}`
  },
  body: JSON.stringify({ query })
})
  .then(response => response.json())
  .then(data => {
    if (data.errors) {
      console.error("GraphQL Errors:", data.errors);
    } else {
      console.log("Contribution Data:", data.data.user.contributionsCollection.contributionCalendar);
    }
  })
  .catch(error => console.error("Fetch Error:", error));
