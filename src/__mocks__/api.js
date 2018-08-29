import repositories from './repositoriesMock'

export default {
  fetchRepositories: () => {
    return new Promise((resolve) => {
      resolve(repositories)
    })
  },
  addRepository: () => {
    return new Promise((resolve) => {
      resolve({ message: 'repository saved successfully.' })
    })
  },
  removeRepository: () => {
    return new Promise((resolve) => {
      resolve({ message: 'repository removed successfully.' })
    })
  },
}
