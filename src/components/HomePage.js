import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RepositoryContext from '../contexts/RepositoryContext'

import BranchList from './BranchList'
import PRList from './PRList'

const LIMIT_DAYS = 30

class HomePage extends Component {
  static propTypes = {
    repositories: PropTypes.arrayOf(PropTypes.object),
  }

  getBranches() {
    let branches = []
    this.props.repositories.map(rep => {
      branches = [...branches, ...rep.refs.nodes]
    })
    return branches
  }

  getPRs() {
    let prs = []
    this.props.repositories.map(rep => {
      prs = [...prs, ...rep.pullRequests.nodes]
    })
    return prs
  }

  getApproves(reviews) {
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
    return revsFinal.reduce((acc, val) => (
      acc += val.state === 'APPROVED' ? 1 : 0
    ), 0)
  }

  calcDiffDays = (date1, date2) => {
    var oneDay = 24 * 60 * 60 * 1000
    return Math.round(Math.abs((date1.getTime() - date2.getTime()) / (oneDay)))
  }

  branchesFilterBy = (value) => (
    this.calcDiffDays(
      new Date(value.target.history.edges[0].node.committedDate),
      new Date()
    ) > LIMIT_DAYS
  )

  prsFilterBy = (value) => (
    value.mergeable === 'MERGEABLE' && this.getApproves(value.reviews.nodes) > 0
  )

  branchesOrderBy = (val1, val2) => (
    new Date(val1.target.history.edges[0].node.committedDate) >
    new Date(val2.target.history.edges[0].node.committedDate)
  )

  render() {
    return (
      <div className="w-100 flex flex-column flex-row-m pa2 pb4">
        <div className="w-100 w-50-m pa2 pa4-m ma5-m shadow-1">
          <h2 className="mid-gray mv2">Inactive Branches</h2>
          <div className="w-100 br mb2 o-10 ba b--mid-gray"></div>
          <div className="overflow-y-auto f6" style={{ maxHeight: 'calc(100vh - 15rem)' }}>
            <BranchList
              branches={{ nodes: this.getBranches() }}
              seeMore={false}
              filterBy={this.branchesFilterBy}
              orderBy={this.branchesOrderBy}
              showRepository
              dateColor="red"
            />
          </div>
        </div>
        <div className="w-100 w-40-m w-50-l pa2 pa4-m ma5-m mt4 mt0-m shadow-1">
          <h2 className="mid-gray mv2 f4-m mb3-m f3-l mb2-l">Pull Requests (Mergeable)</h2>
          <div className="w-100 br mb2 o-10 ba b--mid-gray"></div>
          <div className="overflow-y-auto f6" style={{ maxHeight: 'calc(100vh - 15rem)' }}>
            <PRList
              pullRequests={{ nodes: this.getPRs() }}
              seeMore={false}
              filterBy={this.prsFilterBy}
              showRepository
            />
          </div>
        </div>
      </div>
    )
  }
}

export default function HomePageWithContext(props) {
  return (
    <RepositoryContext.Consumer>
      {({ repositories }) => <HomePage repositories={repositories} {...props} />}
    </RepositoryContext.Consumer>
  )
}
