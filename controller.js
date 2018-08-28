const GithubGraphQLApi = require('node-github-graphql');

const github = new GithubGraphQLApi({
  token: process.env.GITHUB_API_KEY,
});
const repositoryQuery = require('./queries/RepositoryQuery');
const collaboratorsQuery = require('./queries/CollaboratorsQuery');

const fetchRepository = (owner, name) => github.query(repositoryQuery, { owner, name });

const fetchCollaborators = (owner, name) => github.query(collaboratorsQuery, { owner, name });

module.exports = {
  fetchRepositories: async (repositories) => {
    const results = await Promise.all(repositories.map(rep => fetchRepository(rep.owner, rep.name)
      .then(res => res.data.repository)
      .catch(error => ({ error: error[0].message }))));
    const collaborators = await Promise.all(
      repositories.map(rep => fetchCollaborators(rep.owner, rep.name).then(
        res => res.data.repository.collaborators,
      ).catch(error => ({ error: error[0].message }))),
    );
    return results.map((rep, index) => {
      const newRep = { ...rep };
      if (!rep.error) newRep.collaborators = collaborators[index];
      return newRep;
    });
  },
};
