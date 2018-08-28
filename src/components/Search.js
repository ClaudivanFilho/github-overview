import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Search extends Component {
  static propTypes = {
    repositories: PropTypes.arrayOf(PropTypes.object),
    setRepositories: PropTypes.func,
  }

  doSearch = (text) => {
    this.props.setRepositories(this.props.repositories.filter(rep => (
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
