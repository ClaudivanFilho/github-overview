import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import RepositoriesPage from './RepositoriesPage'
import HomePage from './HomePage'
import RepositoryContext from '../contexts/RepositoryContext'
import ToastContext from '../contexts/ToastContext'
import Api from '../api'

import githubIcon from '../images/github.svg'
import repoIcon from '../images/repo.svg'
import homeIcon from '../images/home.svg'

export default class App extends Component {
  state = {
    repositories: [],
    originalRepositories: [],
  }

  componentDidMount() {
    this.refetchRepositories()
  }

  updateRepositories = (reps, originalReps) => {
    this.setState({
      repositories: reps,
      originalRepositories: originalReps || this.state.originalRepositories,
    })
  }

  refetchRepositories = () => {
    Api.fetchRepositories()
      .then(res => this.setState({ originalRepositories: res, repositories: res }))
  }

  openToast = (message, isError) => {
    const toastConfig = {
      position: toast.POSITION.TOP_CENTER,
      autoClose: isError ? 4000 : 2000,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: false,
    }
    if (isError) {
      toast.error(message, toastConfig)
    } else {
      toast.success(message, toastConfig)
    }
  }

  isHomePage() {
    return window.location.pathname === '/'
  }

  render() {
    const repProviderValues = {
      repositories: this.state.repositories,
      originalRepositories: this.state.originalRepositories,
      updateRepositories: this.updateRepositories,
      refetchRepositories: this.refetchRepositories,
    }
    const toastProviderValues = { openToast: this.openToast }
    return (
      <RepositoryContext.Provider value={repProviderValues}>
        <ToastContext.Provider value={toastProviderValues}>
          <header className="bg-near-white fixed w-100 shadow-3 z-2">
            <nav className="flex justify-between justify-start-m items-center f7 fw6 tracked sans-serif">
              <div className="flex items-center pv3 pv4-m ml5 ml5-m f5 link dark-gray mr5">
                <img className="flex dn-m pa0-m mr3-m" src={githubIcon} width="30" alt="github-icon" />
                <span className="dn dib-m" href="#" title="Home">
                  GitHub Overview
                </span>
                <div className="dn flex-m h1 br mh5 o-20 b--mid-gray"></div>
              </div>
              <div className="flex">
                <Link
                  className={`dib pa5 ph6 ttu link dim mid-gray f6 ${this.isHomePage() ? 'bg-light-gray' : ''}`}
                  to="/"
                >
                  <img className="flex dn-m pa0-m mr3-m" src={homeIcon} width="25" alt="home-icon" />
                  <span className="dn flex-m items-center">Home</span>
                </Link>
                <Link
                  className={`dib pa5 ph6 ttu link dim mid-gray f6 ${!this.isHomePage() ? 'bg-light-gray' : ''}`}
                  to="/repositories">
                  <img className="flex dn-m pa0-m mr3-m" src={repoIcon} width="20" alt="rep-icon" />
                  <span className="dn flex-m items-center">Repositories</span>
                </Link>
              </div>
            </nav>
          </header>
          <div className="pt9">
            <ToastContainer />
            <Route exact path="/" component={HomePage} />
            <Route path="/repositories" component={RepositoriesPage} />
          </div>
        </ToastContext.Provider>
      </RepositoryContext.Provider>
    )
  }
}
