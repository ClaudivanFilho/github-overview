module.exports = `
  query ($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      id
      description
      createdAt
      url
      nameWithOwner
      refs(refPrefix:"refs/heads/", last: 20) {
        totalCount
        nodes {
          name
          target {
            ... on Commit {
              history(first: 1) {
                edges {
                  node {
                    committedDate
                    author {
                      name
                      avatarUrl
                    }
                  }
                }
              }
            }
          }  
        }
      }
      stargazers {
        totalCount
      }
      issues(last: 10, states:OPEN) {
        totalCount
        nodes {
          author {
            login
            avatarUrl
          }
          title
          url
        }
      }
      pullRequests(last: 10, states: OPEN) {
        totalCount
        nodes {
          title
          url
          assignees(last: 1) {
            nodes {
              avatarUrl
              name
            }
          }
          reviews(last: 10, states: [APPROVED, CHANGES_REQUESTED]) {
            nodes {
              author {
                login
                avatarUrl
              }
              state
            }
          }
        }
      }
    }
  }
`;
