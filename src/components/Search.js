import React, { Component } from 'react'
import PropTypes from 'prop-types'

import RepositoryContext from '../contexts/RepositoryContext'
import SearchIcon from '../images/glass.svg'

class Search extends Component {
  static propTypes = {
    originalRepositories: PropTypes.arrayOf(PropTypes.object),
    updateRepositories: PropTypes.func,
  }

  state = {
    inputText: '',
  }

  handleTextChange = (evt) => {
    this.setState({
      inputText: evt.target.value,
    })
    this.handleSearch(evt.target.value)
  }

  handleSearch = (text) => {
    const searchText = text || this.state.inputText
    this.props.updateRepositories(this.props.originalRepositories.filter(rep => (
      rep.nameWithOwner.toLowerCase().includes(searchText.toLowerCase())
    )))
  }

  render() {
    return (
      <div className="flex items-center">
        <input
          id="search"
          placeholder="Search..."
          className="go-search-input input-reset ba b--black-20 db w-100 bg-white br2"
          type="text"
          value={this.state.inputText}
          onChange={this.handleTextChange}
        />
        <img className="pl2 absolute" src={SearchIcon} alt="s-icon" width="20" />
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
