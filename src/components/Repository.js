import React, { Component, Fragment } from 'react'
import { Collapse } from 'react-collapse'
import PropTypes from 'prop-types'

import RemoveRepository from './RemoveRepository'
import ToastContext from '../contexts/ToastContext'
import BranchList from './BranchList'
import PRList from './PRList'
import IssueList from './IssueList'

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
          <div className="flex w-90 w-30-m items-center">
            <img className="ml2 mr4" src={repoIcon} alt="repo-icon" width="25" />
            <a
              className="link truncate"
              onClick={evt => evt.stopPropagation()}
              href={repository.url}
              target="_blank"
            >
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
                <label className="w-20 f6 b dn db-m mr2">
                  Issues ({repository.issues.totalCount})
                </label>
                <label className="w-20 f6 b dn db-m mr2">
                  Pull Requests ({repository.pullRequests.totalCount})
                </label>
                <label className="w-20 f6 b dn db-m mr2">
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
              <div className="flex flex-column flex-row-m">
                <div className="w-100 w-20-m pa2">
                  <div className="flex flex-column">
                    <h5 className="mv2">Collaborators</h5>
                    {
                      !collaborators.error && (
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
                            <div className="fl br8 ma2 h2 w2 br-pill ba b--silver mid-gray flex items-center f7 fw6 justify-center">
                            + {collaborators.totalCount - collaborators.nodes.length}
                            </div>
                          )}
                        </div>
                      )
                    }
                  </div>
                </div>
                <div className="w-100 w-80-m flex flex-column pb3">
                  <div className="w-100 flex flex-column pv2">
                    <h5 className="w-100 mv2">Description:</h5>
                    <p className="f7">
                      {repository.description}
                    </p>
                  </div>
                  <div className="w-100 br mb2 o-10 ba b--mid-gray"></div>
                  <div className="w-100 flex flex-column flex-row-m">
                    <div className="w-100 w-40-m flex flex-column">
                      <h5 className="w-100 mv2">Active Branches ({repository.refs.totalCount})</h5>
                      <div className="overflow-y-auto f6" style={{ maxHeight: '9rem' }}>
                        <BranchList branches={repository.refs} />
                      </div>
                    </div>
                    <div className="h-90 br mh2 o-10 ba b--mid-gray"></div>
                    <div className="w-100 w-60-m flex flex-column">
                      <h5 className="w-100 mv2">PRS ({repository.pullRequests.totalCount})</h5>
                      <div className="overflow-y-auto f6" style={{ maxHeight: '9rem' }}>
                        <PRList pullRequests={repository.pullRequests} nameWithOwner={repository.nameWithOwner} />
                      </div>
                    </div>
                  </div>
                  <div className="w-100 br mv2 o-10 ba b--mid-gray"></div>
                  <div className="flex flex-column">
                    <h5 className="w-100 mv2">Issues ({repository.issues.totalCount})</h5>
                    <div className="overflow-y-auto" style={{ maxHeight: '8rem' }}>
                      <IssueList issues={repository.issues} nameWithOwner={repository.nameWithOwner} />
                    </div>
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
