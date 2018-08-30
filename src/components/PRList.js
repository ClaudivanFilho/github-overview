import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import prIcon from '../images/pr.svg'
import ApproveIcon from '../images/OK.png'
import RejectedIcon from '../images/reject.png'

export default class PRList extends Component {
  static propTypes = {
    pullRequests: PropTypes.shape({
      totalCount: PropTypes.number,
      nodes: PropTypes.arrayOf(PropTypes.object),
    }),
    nameWithOwner: PropTypes.string,
    seeMore: PropTypes.bool,
  }

  static defaultProps = {
    seeMore: true,
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

  render() {
    const { pullRequests, seeMore, nameWithOwner } = this.props
    return (
      <Fragment>
        {
          pullRequests.nodes.map(pr => (
            <div key={pr.title} className="w-100 flex justify-between">
              <a
                className="w-60 truncate link heavy-blue f6 pa3 dim flex items-center"
                href={pr.url}
                target="_blank"
              >
                <img className="mr4" src={prIcon} width="16" />
                {pr.title}
              </a>
              {this.renderReviews(pr.reviews.nodes)}
            </div>
          ))
        }
        {
          seeMore && pullRequests.totalCount > pullRequests.nodes.length && (
            <div className="w-100 flex justify-between">
              <a
                className="link heavy-blue f6 pa3 dim"
                href={`http://github.com${nameWithOwner}/pullRequests`}
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
