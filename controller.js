var GithubGraphQLApi = require('node-github-graphql')
var github = new GithubGraphQLApi({
  token: process.env.GITHUB_API_KEY
})
var repositoryQuery = require('./queries/RepositoryQuery')
var collaboratorsQuery = require('./queries/CollaboratorsQuery')

const fetchRepository = (owner, name) => {
  return github.query(repositoryQuery, { owner, name })
}

const fetchCollaborators = (owner, name) => {
  return github.query(collaboratorsQuery, { owner, name })
}

module.exports = {
  fetchRepositories: async (repositories) => {
    const results = await Promise.all(repositories.map(rep => {
      return fetchRepository(rep.owner, rep.name)
        .then(res => res.data.repository)
        .catch(error => ({ error: error[0].message }))
    }))
    const collaborators = await Promise.all(repositories.map(rep => {
      return fetchCollaborators(rep.owner, rep.name)
        .then(res => res.data.repository.collaborators)
        .catch(error => ({ error: error[0].message }))
    }))
    return results.map((rep, index) => {
      if (!rep.error) rep.collaborators = collaborators[index]
      return rep
    })
  }
}
