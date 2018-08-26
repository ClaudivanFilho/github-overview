const APP_STORAGE_KEY = 'GITHUB_OVERVIEW'
const REPS_KEY = 'REPOSITORIES'

const getKey = () => `${APP_STORAGE_KEY}__${REPS_KEY}` 

const getRepositories = () => JSON.parse(localStorage.getItem(getKey())) || []

const addRepository = (repName) => {
  const repositories = getRepositories() || []
  repositories.push(repName)
  saveRepositories(repositories)
}

const removeRepository = (repName) => {
  const reps = getRepositories().filter(rep => rep !== repName)
  saveRepositories(reps)
}

const saveRepositories = (repositories) => localStorage.setItem(getKey(), JSON.stringify(repositories))

export default {
  getRepositories,
  addRepository,
  saveRepositories,
  removeRepository,
}