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
    filterBy: PropTypes.func,
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
      <div className="w-40 ml3 flex justify-start items-center">
        {reviewsNormalized.map(rev => (
          <img
            key={rev.author.login}
            alt={rev.author.login}
            className="mh1 mh3-m"
            src={rev.state === 'APPROVED' ? ApproveIcon : RejectedIcon}
            width="20"
            height="20"
          />
        ))}
      </div>
    )
  }

  render() {
    const {
      pullRequests: { nodes, totalCount },
      seeMore,
      nameWithOwner,
      filterBy,
    } = this.props

    let prs = nodes
    if (filterBy) {
      prs = prs.filter(filterBy)
    }
    return (
      <Fragment>
        {
          prs.map((pr, index) => (
            <Fragment key={pr.title}>
              {index !== 0 && <div className="w-100 center br mb2 o-05 ba b--mid-gray"></div>}
              <div className="w-100 flex justify-between">
                <a
                  className="w-60 truncate link heavy-blue pa3 dim flex items-center"
                  href={pr.url}
                  target="_blank"
                >
                  <img className="mr4" src={prIcon} width="16" />
                  <span className="w-80 w-90-m truncate">{pr.title}</span>
                </a>
                {this.renderReviews(pr.reviews.nodes)}
              </div>
            </Fragment>
          ))
        }
        {
          seeMore && totalCount > prs.length && (
            <div className="w-100 flex justify-between">
              <a
                className="link heavy-blue pa3 dim"
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
