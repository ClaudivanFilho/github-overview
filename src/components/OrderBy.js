import React, { Component } from 'react'
import PropTypes from 'prop-types'

const options = [{
  name: 'Name ASC',
  value: 'NAME_ASC',
}, {
  name: 'Name DESC',
  value: 'NAME_DESC',
}, {
  name: 'Issues ASC',
  value: 'ISSUES_ASC',
}, {
  name: 'Issues DESC',
  value: 'ISSUES_DESC',
}, {
  name: "PR's ASC",
  value: 'PRS_ASC',
}, {
  name: "PR's DESC",
  value: 'PRS_DESC',
}]

export default class OrderBy extends Component {
  static propTypes = {
    repositories: PropTypes.arrayOf(PropTypes.object),
    setRepositories: PropTypes.func,
  }

  doOrdenation = (opt) => {
    const repositories = [...this.props.repositories]
    switch (opt) {
      case 'NAME_ASC':
        repositories.sort((a, b) => a.nameWithOwner > b.nameWithOwner)
        break
      case 'NAME_DESC':
        repositories.sort((a, b) => a.nameWithOwner < b.nameWithOwner)
        break
      case 'ISSUES_ASC':
        repositories.sort((a, b) => a.issues.totalCount > b.issues.totalCount)
        break
      case 'ISSUES_DESC':
        repositories.sort((a, b) => a.issues.totalCount < b.issues.totalCount)
        break
      case 'PRS_ASC':
        repositories.sort((a, b) => a.pullRequests.totalCount > b.pullRequests.totalCount)
        break
      case 'PRS_DESC':
        repositories.sort((a, b) => a.pullRequests.totalCount < b.pullRequests.totalCount)
        break
      default:
        break
    }
    this.props.setRepositories(repositories)
  }

  render() {
    return (
      <div className="flex items-center">
        <label htmlFor="orderBy" className="f6 b db mr2">OrderBy: </label>
        <select id="orderBy" className="pl2 bg-white br2 pointer" onChange={(opt) => {
          this.doOrdenation(opt.target.value)
        }}>
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
