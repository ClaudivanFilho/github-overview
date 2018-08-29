module.exports = `
  query ($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      collaborators(last: 11) {
        totalCount
        nodes {        
          url
          avatarUrl
          name
        }
      }
    }
  }
`