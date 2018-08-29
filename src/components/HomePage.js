import React, { Component } from 'react'
import RepositoryContext from '../contexts/RepositoryContext'

class HomePage extends Component {
  render() {
    return (
      <div className="w-100 flex flex-column">
        <div className="w-100">
          <h3 className="mv2">Your Pendencies</h3>
        </div>
      </div>
    )
  }
}

export default function RepositoriesPageWithContext(props) {
  return (
    <RepositoryContext.Consumer>
      {({ repositories }) => <HomePage repositories={repositories} {...props} />}
    </RepositoryContext.Consumer>
  )
}
