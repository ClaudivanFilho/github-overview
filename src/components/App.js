import React, { Component } from 'react'

export default class App extends Component {
  state = {
    repositories: []
  }

  constructor(props) {
    super(props)
    fetch('/api/repository').then(res => res.json()).then(res => console.log(res))
  }

  render() {
    return <div>My App</div>
  }
}
