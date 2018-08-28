import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ToastContext from '../contexts/ToastContext'
import RepositoryContext from '../contexts/RepositoryContext'
import AddIcon from '../images/add.svg'

class AddRepository extends Component {
  static propTypes = {
    openToast: PropTypes.func,
    refetchRepositories: PropTypes.func,
  }

  state = {
    repInput: '',
  }

  handleSubmit = () => {
    const [owner, name] = this.state.repInput.split('/')
    fetch('/api/repository', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ owner, name }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          this.props.openToast(res.error, true)
        } else {
          this.props.openToast(res.message)
          this.props.refetchRepositories()
        }
      })
      .catch(res => this.props.openToast(res.error, true))
  }

  render() {
    return (
      <form className="flex items-center">
        <label htmlFor="repository-name" className="f6 b mr2">Add Repository: </label>
        <input
          id="repository-name"
          className="input-reset ba b--black-20 db w-auto pl2 bg-white br2"
          placeholder="Owner/Name"

          title="owner/name"
          value={this.state.repInput}
          onChange={evt => this.setState({ repInput: evt.target.value })}
        />
        <img
          className="flex items-center br7 ml2 pointer dim"
          src={AddIcon} alt="add-icon"
          width="30"
          onClick={this.handleSubmit}
        />
      </form>
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
