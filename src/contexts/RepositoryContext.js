import React from 'react'

export default React.createContext({
  repositories: [],
  originalRepositories: [],
  updateRepositories: () => {},
  refetchRepositories: () => {},
})
