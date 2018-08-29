import React, { Component, Fragment } from 'react'
import { Collapse } from 'react-collapse'
import PropTypes from 'prop-types'

import RemoveRepository from './RemoveRepository'
import ToastContext from '../contexts/ToastContext'
import repoIcon from '../images/repo.svg'

class Repository extends Component {
  static propTypes = {
    repository: PropTypes.shape({
      description: PropTypes.string,
      nameWithOwner: PropTypes.string,
      collaborators: PropTypes.shape({
        nodes: PropTypes.arrayOf(PropTypes.object),
      }),
    }),
    openToast: PropTypes.func,
  }

  state = {
    open: false,
  }

  handleCollapseClick = () => {
    this.setState({
      open: !this.state.open,
    })
  }

  render() {
    const { repository, repository: { collaborators } } = this.props
    return (
      <div className="near-black ba bw1 b--black-20 br2 mb1">
        <div className="bg-near-white pointer pa2 fw6 flex justify-between items-center" onClick={this.handleCollapseClick}>
          <div className="flex w-30 items-center">
            <img className="ml2 mr4" src={repoIcon} alt="repo-icon" width="25" />
            <a onClick={evt => evt.stopPropagation()} href={repository.url} target="_blank">
              {repository.nameWithOwner}
            </a>
          </div>
          {repository.error ? (
            <div className="mr-auto">
                Repository Not Found
            </div>
          ) : (
            !this.state.open && (
              <Fragment>
                <label className="w-20 f6 b db mr2">
                  Issues ({repository.issues.totalCount})
                </label>
                <label className="w-20 f6 b db mr2">
                  Pull Requests ({repository.pullRequests.totalCount})
                </label>
                <label className="w-20 f6 b db mr2">
                  Active Branches ({repository.refs.totalCount})
                </label>
              </Fragment>
            )
          )}
          <RemoveRepository repository={repository} />
        </div>

        <Collapse isOpened={this.state.open} springConfig={{ stiffness: 100, damping: 20 }}>
          {
            !repository.error && (
              <div className="flex">
                <div className="w-20 pa2">
                  <h5 className="mv2">
                    Owner
                  </h5>
                  <div className="flex flex-column">
                    <h5 className="mv2">Collaborators</h5>
                    <div>
                      {collaborators.nodes.map(collab => (
                        <img key={collab.avatarUrl} className="fl br4 ma2"
                          width="30"
                          src={collab.avatarUrl}
                          alt={collab.name}
                          title={collab.name}
                        />
                      ))}
                      {collaborators.nodes.length < collaborators.totalCount && (
                        <div className="fl br4 ma2">
                        + {collaborators.totalCount - collaborators.nodes.length}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-80 flex flex-column">
                  <div className="w-100 f7 flex pv2">
                    {repository.description}
                  </div>
                  <div className="w-100 flex">
                    <div className="w-30 flex flex-column">
                      <h5 className="mv2">Active Branches ({repository.refs.totalCount})</h5>
                    </div>
                    <div className="w-70 flex flex-column">
                      <h5 className="mv2">PRS ({repository.pullRequests.totalCount})</h5>
                    </div>
                  </div>
                  <div className="flex flex-column">
                    <h5 className="mv2">Issues ({repository.issues.totalCount})</h5>
                  </div>
                </div>
              </div>
            )
          }
        </Collapse>
      </div>
    )
  }
}

export default function RepositoryWithContext(props) {
  return (
    <ToastContext.Consumer>
      {({ openToast }) => <Repository {...props} openToast={openToast} />}
    </ToastContext.Consumer>
  )
}
