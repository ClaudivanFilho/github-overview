import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RepositoryContext from '../contexts/RepositoryContext'

const options = [{
  name: 'Name ASC',
  value: 'NAME_ASC',
  sort: (a, b) => a.nameWithOwner > b.nameWithOwner,
}, {
  name: 'Name DESC',
  value: 'NAME_DESC',
  sort: (a, b) => a.nameWithOwner < b.nameWithOwner,
}, {
  name: 'Issues ASC',
  value: 'ISSUES_ASC',
  sort: (a, b) => a.issues.totalCount > b.issues.totalCount,
}, {
  name: 'Issues DESC',
  value: 'ISSUES_DESC',
  sort: (a, b) => a.issues.totalCount < b.issues.totalCount,
}, {
  name: "PR's ASC",
  value: 'PRS_ASC',
  sort: (a, b) => a.pullRequests.totalCount > b.pullRequests.totalCount,
}, {
  name: "PR's DESC",
  value: 'PRS_DESC',
  sort: (a, b) => a.pullRequests.totalCount < b.pullRequests.totalCount,
}]

class OrderBy extends Component {
  static propTypes = {
    repositories: PropTypes.arrayOf(PropTypes.object),
    originalRepositories: PropTypes.arrayOf(PropTypes.object),
    updateRepositories: PropTypes.func,
  }

  doOrdenation = (opt) => {
    const repositories = [...this.props.repositories]
    const originalRepositories = [...this.props.originalRepositories]
    const selectedOption = options.find(option => option.value === opt)
    repositories.sort(selectedOption.sort)
    originalRepositories.sort(selectedOption.sort)
    this.props.updateRepositories(repositories, originalRepositories)
  }

  render() {
    return (
      <div className="flex items-center justify-end w-100 w-auto-m ma2 ma0-m">
        <select
          className="w-100 w4-m input-reset pl2 bg-white mid-gray b--silver ba br2 pointer f5"
          onChange={(opt) => {
            this.doOrdenation(opt.target.value)
          }}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.name}
            </option>
          ))}
        </select>
      </div>
    )
  }
}

export default function ComponentWithContext(props) {
  return (
    <RepositoryContext.Consumer>
      {({ repositories, originalRepositories, updateRepositories }) => (
        <OrderBy
          {...props}
          repositories={repositories}
          updateRepositories={updateRepositories}
          originalRepositories={originalRepositories}
        />
      )}
    </RepositoryContext.Consumer>
  )
}

