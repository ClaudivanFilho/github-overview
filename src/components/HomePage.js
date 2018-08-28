import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class HomePage extends Component {
  static propTypes = {
    repositories: PropTypes.arrayOf(PropTypes.object),
  }

  render() {
    return (
      <div className="w-100 flex flex-column">
        <div className="w-100">
          <h3 className="mv2">Your Pendencies</h3>
        </div>
      </div>
    )
  }
}
