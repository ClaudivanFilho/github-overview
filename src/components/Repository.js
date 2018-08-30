import React, { Component, Fragment } from 'react'
import { Collapse } from 'react-collapse'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

import RemoveRepository from './RemoveRepository'
import ToastContext from '../contexts/ToastContext'
import repoIcon from '../images/repo.svg'
import ApproveIcon from '../images/OK.png'
import RejectedIcon from '../images/reject.png'

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

  getBranchUrl(repository, name) {
    return `http://github.com/${repository.nameWithOwner}/tree/${name}`
  }

  getReviews(reviews) {
    const revsLogins = []
    const revsFinal = []
    const revsReversed = reviews.slice().reverse()
    // eslint-disable-next-line
    revsReversed.map(rev => {
      if (!revsLogins.includes(rev.author.login)) {
        revsLogins.push(rev.author.login)
        revsFinal.push(rev)
      }
    })
    return revsFinal
  }

  renderReviews(reviews) {
    const reviewsNormalized = this.getReviews(reviews)
    return (
      <div className="w-40 flex justify-start items-center">
        {reviewsNormalized.map(rev => (
          <img
            key={rev.author.login}
            alt={rev.author.login}
            className="mh3"
            src={rev.state === 'APPROVED' ? ApproveIcon : RejectedIcon}
            width="20"
            height="20"
          />
        ))}
      </div>
    )
  }

  getDateFromNow(dateString) {
    return <Moment fromNow>{dateString}</Moment>
  }

  render() {
    const { repository, repository: { collaborators } } = this.props
    console.log(repository)
    return (
      <div className="near-black ba bw1 b--black-20 br2 mb1">
        <div className="bg-near-white pointer pa2 fw6 flex justify-between items-center" onClick={this.handleCollapseClick}>
          <div className="flex w-90 w-30-m items-center">
            <img className="ml2 mr4" src={repoIcon} alt="repo-icon" width="25" />
            <a
              className="truncate"
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
                  </div>
                </div>
                <div className="w-100w-80-m flex flex-column pb3">
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
                      <div className="overflow-y-auto" style={{ maxHeight: '8rem' }}>
                        {
                          repository.refs.nodes.map(branch => (
                            <div key={branch.name} className="w-100 flex justify-between">
                              <a
                                className="link heavy-blue f6 pa3 dim truncate"
                                href={this.getBranchUrl(repository, branch.name)}
                                target="_blank"
                              >
                                {branch.name}
                              </a>
                              <div className="mid-gray f6 pa3 mr4 truncate">
                                {this.getDateFromNow(branch.target.history.edges[0].node.committedDate)}
                              </div>
                            </div>
                          ))
                        }
                        {
                          repository.refs.totalCount > repository.refs.nodes.length && (
                            <a
                              className="link heavy-blue f6 pa3 dim"
                              href={`http://github.com${repository.nameWithOwner}/branches`}
                              target="_blank"
                            >
                              See More
                            </a>
                          )
                        }
                      </div>
                    </div>
                    <div className="h-90 br mh2 o-10 ba b--mid-gray"></div>
                    <div className="w-100 w-60-m flex flex-column">
                      <h5 className="w-100 mv2">PRS ({repository.pullRequests.totalCount})</h5>
                      <div className="overflow-y-auto" style={{ maxHeight: '8rem' }}>
                        {
                          repository.pullRequests.nodes.map(pr => (
                            <div key={pr.title} className="w-100 flex justify-between">
                              <a
                                className="w-60 truncate link heavy-blue f6 pa3 dim"
                                href={pr.url}
                                target="_blank"
                              >
                                {pr.title}
                              </a>
                              {this.renderReviews(pr.reviews.nodes)}
                            </div>
                          ))
                        }
                        {
                          repository.pullRequests.totalCount > repository.pullRequests.nodes.length && (
                            <a
                              className="link heavy-blue f6 pa3 dim"
                              href={`http://github.com${repository.nameWithOwner}/pullRequests`}
                              target="_blank"
                            >
                              See More
                            </a>
                          )
                        }
                      </div>
                    </div>
                  </div>
                  <div className="w-100 br mv2 o-10 ba b--mid-gray"></div>
                  <div className="flex flex-column">
                    <h5 className="w-100 mv2">Issues ({repository.issues.totalCount})</h5>
                    <div className="overflow-y-auto" style={{ maxHeight: '8rem' }}>
                      {
                        repository.issues.nodes.map(issue => (
                          <div key={issue.title} className="w-100 flex">
                            <a
                              className="w-100 truncate link heavy-blue f6 pa3 dim"
                              href={issue.url}
                              target="_blank"
                            >
                              {issue.title}
                            </a>
                          </div>
                        ))
                      }
                      {
                        repository.issues.totalCount > repository.issues.nodes.length && (
                          <a
                            className="link heavy-blue f6 pa3 dim"
                            href={`http://github.com${repository.nameWithOwner}/issues`}
                            target="_blank"
                          >
                            See More
                          </a>
                        )
                      }
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
