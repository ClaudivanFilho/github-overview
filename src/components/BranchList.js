import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

import repoIcon from '../images/repo.svg'
import branchIcon from '../images/branch.svg'

export default class BranchList extends Component {
  static propTypes = {
    branches: PropTypes.shape({
      totalCount: PropTypes.number,
      nodes: PropTypes.arrayOf(PropTypes.object),
    }),
    seeMore: PropTypes.bool,
    orderBy: PropTypes.func,
    filterBy: PropTypes.func,
    dateColor: PropTypes.string,
    showRepository: PropTypes.bool,
  }

  static defaultProps = {
    seeMore: true,
    dateColor: '',
  }

  getBranchUrl(repositoryName, name) {
    return `http://github.com/${repositoryName}/tree/${name}`
  }

  getDateFromNow(dateString) {
    return <Moment fromNow>{dateString}</Moment>
  }

  render() {
    const {
      branches: { totalCount, nodes },
      seeMore,
      orderBy,
      filterBy,
      dateColor,
      showRepository,
    } = this.props

    let branches = nodes
    if (orderBy) {
      branches = branches.sort(orderBy)
    }
    if (filterBy) {
      branches = branches.filter(filterBy)
    }
    return (
      <Fragment>
        {
          branches.map((branch, index) => (
            <Fragment key={`${branch.name}-${index}`}>
              {index !== 0 && <div className="w-100 center br mb2 o-05 ba b--mid-gray"></div>}
              <div className="w-100 flex justify-between">
                <a
                  className="w-80-m link heavy-blue pa3 dim truncate flex items-center"
                  href={this.getBranchUrl(branch.repository.nameWithOwner, branch.name)}
                  target="_blank"
                >
                  {
                    showRepository && (
                      <div className="dn flex-m items-center mr5 w-50-m">
                        <img className="mr4" src={repoIcon} width="16" />
                        <span className="w-80-m truncate">
                          {branch.repository.nameWithOwner}
                        </span>
                      </div>
                    )
                  }
                  <div className={`${showRepository ? 'w-40-m' : ''} flex items-center justify-start`}>
                    <img className="mr4" src={branchIcon} width="16" />
                    <span className={`${showRepository ? 'w-80-m' : ''} truncate`}>
                      {branch.name}
                    </span>
                  </div>
                </a>
                <div className={`mid-gray pa3 mr4 truncate flex items-center ${dateColor}`}>
                  {this.getDateFromNow(branch.target.history.edges[0].node.committedDate)}
                </div>
              </div>
            </Fragment>
          ))
        }
        {
          seeMore && totalCount > branches.length && (
            <div className="w-100 flex justify-between">
              <a
                className="link heavy-blue pa3 dim"
                href={`http://github.com/${branches[0].repository.nameWithOwner}/branches`}
                target="_blank"
              >
                See More
              </a>
            </div>
          )
        }
      </Fragment>
    )
  }
}
