import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ToastContext from '../contexts/ToastContext'
import RepositoryContext from '../contexts/RepositoryContext'
import RemoveIcon from '../images/remove.svg'
import Api from '../api'

class RemoveRepository extends Component {
  static propTypes = {
    repository: PropTypes.object,
    openToast: PropTypes.func,
    refetchRepositories: PropTypes.func,
  }

  handleRemove = (evt) => {
    evt.stopPropagation()
    const [owner, name] = this.props.repository.nameWithOwner.split('/')
    Api.removeRepository(owner, name)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          this.props.openToast(res.error, true)
        } else {
          this.props.refetchRepositories()
          this.props.openToast(res.message)
        }
      })
      .catch(res => this.props.openToast(res.error, true))
  }

  render() {
    return (
      <img
        className="flex items-center br7 mr3 pointer dim"
        src={RemoveIcon} alt="remove"
        width="20"
        title="remove"
        onClick={this.handleRemove}
      />
    )
  }
}

export default function ComponentWithContext(props) {
  return (
    <ToastContext.Consumer>
      {({ openToast }) => (
        <RepositoryContext.Consumer>
          {({ refetchRepositories }) => (
            <RemoveRepository
              {...props}
              openToast={openToast}
              refetchRepositories={refetchRepositories} />
          )}
        </RepositoryContext.Consumer>
      )}
    </ToastContext.Consumer>
  )
}
