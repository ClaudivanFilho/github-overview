import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Repository from './Repository'
import OrderBy from './OrderBy'
import Search from './Search'

export default class RepositoriesPage extends Component {
  state = {
    repositories: null,
  }

  static propTypes = {
    repositories: PropTypes.arrayOf(PropTypes.object),
  }

  setRepositories = (repositories) => {
    this.setState({ repositories })
  }

  render() {
    const reps = this.state.repositories || this.props.repositories
    return (
      <div className="flex flex-column w-100 pa3 sans-serif">
        <div className="w-100 pb2">
          <div className="fl">
            <Search
              setRepositories={this.setRepositories}
              repositories={this.props.repositories}
            />
          </div>
          <div className="fr">
            <OrderBy
              setRepositories={this.setRepositories}
              repositories={reps}
            />
          </div>
        </div>
        <div className="w-100">
          {reps.map(rep => (
            <Repository key={rep.id} repository={rep} />
          ))}
        </div>
      </div>
    )
  }
}
