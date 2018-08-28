import React, { Component } from 'react'
import { Collapse } from 'react-collapse'
import PropTypes from 'prop-types'

export default class Repository extends Component {
  static propTypes = {
    repository: PropTypes.shape({
      description: PropTypes.string,
      collaborators: PropTypes.shape({
        nodes: PropTypes.arrayOf(PropTypes.object),
      }),
    }),
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
    console.log(repository)
    return (
      <div className="near-black ba bw1 b--black-20 br2 mb1">
        <div className="bg-near-white pointer pa2 fw6" onClick={this.handleCollapseClick}>
          {repository.nameWithOwner}
        </div>
        <Collapse isOpened={this.state.open} springConfig={{ stiffness: 100, damping: 20 }}>
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
                  <h5 className="mv2">Active Branches</h5>
                </div>
                <div className="w-70 flex flex-column">
                  <h5 className="mv2">PRS</h5>
                </div>
              </div>
              <div className="flex flex-column">
                <h5 className="mv2">Issues</h5>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    )
  }
}
