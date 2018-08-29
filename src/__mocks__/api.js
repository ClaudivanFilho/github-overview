export default {
  fetchRepositories: () => {
    return new Promise((resolve) => {
      resolve([
        {
          id: '1',
          description: 'description',
          url: 'http://github.com/vtex-apps/render-runtime',
          nameWithOwner: 'vtex-apps/render-runtime',
          issues: {
            totalCount: 0,
            nodes: [],
          },
          refs: {
            totalCount: 0,
            nodes: [],
          },
          pullRequests: {
            totalCount: 0,
            nodes: [],
          },
          collaborators: {
            totalCount: 0,
            nodes: [],
          },
        },
      ])
    })
  },
  addRepository: (owner, name) => {

  },
  removeRepository: (owner, name) => {

  },
}
