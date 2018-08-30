import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import RepositoriesPage from './RepositoriesPage'
import HomePage from './HomePage'
import RepositoryContext from '../contexts/RepositoryContext'
import ToastContext from '../contexts/ToastContext'
import Api from '../api'

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
          <header className="bg-near-white fixed w-100 ph5 pv3-ns ph4-m ph5-l shadow-3 z-2">
            <nav className="flex justify-center justify-start-m items-center f7 fw6 tracked sans-serif">
              <span className="pv4 f5 link purple dib mr5" href="#" title="Home">GitHub Overview</span>
              <div className="dn dib-m h1 br mr5 o-20 b--mid-gray"></div>
              <Link className="dn dib-m pa4 ttu link dim mid-gray f6" to="/">
                Home
              </Link>
              <Link className="dn dib-m flex-m pa4 ttu link dim mid-gray f6" to="/repositories">
                Repositories
              </Link>
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
