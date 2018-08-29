import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Repository from './Repository'
import OrderBy from './OrderBy'
import Search from './Search'
import AddRepository from './AddRepository'
import RepositoryContext from '../contexts/RepositoryContext'

class RepositoriesPage extends Component {
  static propTypes = {
    repositories: PropTypes.arrayOf(PropTypes.object),
    openToast: PropTypes.func,
  }

  render() {
    return (
      <div className="flex flex-column w-100 pa3 sans-serif">
        <div className="w-100 flex pb2">
          <div className="w-33 flex">
            <AddRepository />
          </div>
          <div className="w-33 flex justify-center">
            <Search />
          </div>
          <div className="w-33 flex justify-end">
            <OrderBy />
          </div>
        </div>
        <div className="w-100">
          {this.props.repositories.map(rep => (
            <Repository key={rep.nameWithOwner} repository={rep} />
          ))}
        </div>
      </div>
    )
  }
}

export default function RepositoriesPageWithContext(props) {
  return (
    <RepositoryContext.Consumer>
      {({ repositories }) => <RepositoriesPage repositories={repositories} {...props} />}
    </RepositoryContext.Consumer>
  )
}
