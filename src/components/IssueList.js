import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import issueIcon from '../images/issue.svg'

export default class BranchList extends Component {
  static propTypes = {
    issues: PropTypes.shape({
      totalCount: PropTypes.number,
      nodes: PropTypes.arrayOf(PropTypes.object),
    }),
    nameWithOwner: PropTypes.string,
    seeMore: PropTypes.bool,
  }

  static defaultProps = {
    seeMore: true,
  }

  render() {
    const { issues, seeMore, nameWithOwner } = this.props
    return (
      <Fragment>
        {
          issues.nodes.map(issue => (
            <div key={issue.title} className="w-100 flex">
              <a
                className="w-100 truncate link heavy-blue f6 pa3 dim flex items-center"
                href={issue.url}
                target="_blank"
              >
                <img className="mr4" src={issueIcon} width="16" />
                {issue.title}
              </a>
            </div>
          ))
        }
        {
          seeMore && issues.totalCount > issues.nodes.length && (
            <div className="w-100 flex justify-between">
              <a
                className="link heavy-blue f6 pa3 dim"
                href={`http://github.com${nameWithOwner}/issues`}
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
