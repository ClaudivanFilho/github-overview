export default {
  fetchRepositories: () => {
    return fetch('/api/repository')
      .then(res => res.json())
  },
  addRepository: (owner, name) => {
    return fetch('/api/repository', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ owner, name }),
    })
      .then(res => res.json())
  },
  removeRepository: (owner, name) => {
    return fetch('/api/repository', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ owner, name }),
    })
  },
}
