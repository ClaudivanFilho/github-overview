import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

import branchIcon from '../images/branch.svg'

export default class BranchList extends Component {
  static propTypes = {
    branches: PropTypes.shape({
      totalCount: PropTypes.number,
      nodes: PropTypes.arrayOf(PropTypes.object),
    }),
    seeMore: PropTypes.bool,
  }

  static defaultProps = {
    seeMore: true,
  }

  getBranchUrl(repositoryName, name) {
    return `http://github.com/${repositoryName}/tree/${name}`
  }

  getDateFromNow(dateString) {
    return <Moment fromNow>{dateString}</Moment>
  }

  render() {
    const { branches, seeMore } = this.props
    return (
      <Fragment>
        {
          branches.nodes.map(branch => (
            <div key={branch.name} className="w-100 flex justify-between">
              <a
                className="link heavy-blue f6 pa3 dim truncate flex items-center"
                href={this.getBranchUrl(branch.repository.nameWithOwner, branch.name)}
                target="_blank"
              >
                <img className="mr4" src={branchIcon} width="16" />
                {branch.name}
              </a>
              <div className="mid-gray f6 pa3 mr4 truncate flex items-center">
                {this.getDateFromNow(branch.target.history.edges[0].node.committedDate)}
              </div>
            </div>
          ))
        }
        {
          seeMore && branches.totalCount > branches.nodes.length && (
            <div className="w-100 flex justify-between">
              <a
                className="link heavy-blue f6 pa3 dim"
                href={`http://github.com/${branches.nodes[0].repository.nameWithOwner}/branches`}
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
