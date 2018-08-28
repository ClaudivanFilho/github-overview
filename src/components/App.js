import React, { Component, Fragment } from 'react'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import RepositoriesPage from './RepositoriesPage'
import HomePage from './HomePage'

export default class App extends Component {
  state = {
    repositories: [],
  }

  componentDidMount() {
    fetch('/api/repository')
      .then(res => res.json())
      .then(res => this.setState({ repositories: res }))
  }

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <header className="bg-near-white fixed w-100 ph3 pv3 pv3-ns ph4-m ph5-l shadow-3">
            <nav className="flex items-center f7 fw6 tracked sans-serif">
              <span className="f5 link purple dib mr3" href="#" title="Home">GitHub Overview</span>
              <div className="dib h1 br mr3 o-20 b--mid-gray"></div>
              <Link className="ttu link dim mid-gray dib mr3" to="/">
                Home
              </Link>
              <Link className="ttu link dim mid-gray dib mr3" to="/repositories">
                Repositories
              </Link>
            </nav>
          </header>
          <div className="pt5">
            <Route exact path="/" render={routeProps => (
              <HomePage {...routeProps} repositories={this.state.repositories} />
            )} />
            <Route path="/repositories" render={routeProps => (
              <RepositoriesPage {...routeProps} repositories={this.state.repositories} />
            )} />
          </div>
        </Fragment>
      </BrowserRouter>
    )
  }
}
