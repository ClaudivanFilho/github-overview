import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RepositoryContext from '../contexts/RepositoryContext'

class Search extends Component {
  static propTypes = {
    originalRepositories: PropTypes.arrayOf(PropTypes.object),
    updateRepositories: PropTypes.func,
  }

  doSearch = (text) => {
    this.props.updateRepositories(this.props.originalRepositories.filter(rep => (
      rep.nameWithOwner.toLowerCase().includes(text.toLowerCase())
    )))
  }

  render() {
    return (
      <div className="flex items-center">
        <label htmlFor="search" className="f6 b db mr2">Search: </label>
        <input
          id="search"
          placeholder="Search..."
          className="input-reset ba b--black-20 db w-100 pl2 bg-white br2"
          type="text"
          onChange={evt => this.doSearch(evt.target.value)}
        />
      </div>
    )
  }
}

export default function ComponentWithContext(props) {
  return (
    <RepositoryContext.Consumer>
      {({ originalRepositories, updateRepositories }) => (
        <Search
          {...props}
          originalRepositories={originalRepositories}
          updateRepositories={updateRepositories}
        />
      )}
    </RepositoryContext.Consumer>
  )
}
