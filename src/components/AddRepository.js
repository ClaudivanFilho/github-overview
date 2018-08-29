import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ToastContext from '../contexts/ToastContext'
import RepositoryContext from '../contexts/RepositoryContext'
import AddIcon from '../images/add.svg'
import Api from '../api'

class AddRepository extends Component {
  static propTypes = {
    openToast: PropTypes.func,
    refetchRepositories: PropTypes.func,
  }

  state = {
    repInput: '',
  }

  handleSubmit = () => {
    if (!this.state.repInput.match(/.*\/.*/)) {
      this.props.openToast('Repository name must match with the pattern "owner/name"', true)
      return
    }
    const [owner, name] = this.state.repInput.split('/')
    Api.addRepository(owner, name)
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
      <div className="flex items-center">
        <input
          id="repository-name"
          className="input-reset ba b--black-20 db w-auto pa0 pl2 bg-white br2"
          placeholder="Owner/Name"

          title="Add Repository"
          value={this.state.repInput}
          onChange={evt => this.setState({ repInput: evt.target.value })}
        />
        <img
          className="flex items-center br7 ml2 pointer dim"
          src={AddIcon} alt="add-icon"
          width="25"
          onClick={this.handleSubmit}
        />
      </div>
    )
  }
}

export default function ComponentWithContext(props) {
  return (
    <ToastContext.Consumer>
      {({ openToast }) => (
        <RepositoryContext.Consumer>
          {({ refetchRepositories }) => (
            <AddRepository
              {...props}
              openToast={openToast}
              refetchRepositories={refetchRepositories} />
          )}
        </RepositoryContext.Consumer>
      )}
    </ToastContext.Consumer>
  )
}
