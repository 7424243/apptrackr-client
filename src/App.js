import React, {Component} from 'react'
import { Route, Switch } from 'react-router-dom'
import ApptrackrContext from './ApptrackrContext'
import AppDetails from './Components/AppDetails/AppDetails'
import AppForm from './Components/AppForm/AppForm'
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary'
import Header from './Components/Header/Header'
import LandingPage from './Components/LandingPage/LandingPage'
import LoginForm from './Components/LoginForm/LoginForm'
import MainPage from './Components/MainPage/MainPage'
import NewResourceForm from './Components/NewResourceForm/NewResourceForm'
import ResourcesList from './Components/ResourcesList/ResourcesList'
import SignUpForm from './Components/SignUpForm/SignUpForm'
import './App.css'

class App extends Component {

  state = {
    applications: [],
    resources: [],
    user_id: -1,
    loginStatus: false
  }

  getUserApplications = (applications) => {
    this.setState({applications})
  }

  getUserResources = (resources) => {
    this.setState({resources})
  }

  handleUserId = (user_id) => {
    this.setState({user_id})
  }

  handleAddApplication = (application) => {
    this.setState({
      applications: [...this.state.applications, application]
    })
  }

  handleAddResource = (resource) => {
    this.setState({
      resources: [...this.state.resources, resource]
    })
  }

  handleDeleteApplication = (applicationId) => {
    this.setState({
      applications: this.state.applications.filter(application => application.id !== applicationId)
    })
  }

  handleDeleteResource = (resourceId) => {
    const resourceIndex = this.state.resources.findIndex(resource => 
      (resource.id === resourceId))
    let clonedResources = [...this.state.resources]
    if(resourceIndex !== -1) {
      clonedResources.splice(resourceIndex, 1)
      this.setState({resources: clonedResources})
    }
  }

  handleUpdateApplication = (updatedApplication) => {
    const applicationIndex = this.state.applications.findIndex(application => 
      (application.id === updatedApplication.id))
      const clonedApplications = [...this.state.applications]
      clonedApplications[applicationIndex] = updatedApplication
      this.setState({applications: clonedApplications})
  }

  onLoginSuccess = () => {
    this.setState({onLoginSuccess: true})
  }

  render() {
    const contextValue = {
      applications: this.state.applications,
      resources: this.state.resources,
      user_id: this.state.user_id,
      addApplication: this.handleAddApplication,
      addResource: this.handleAddResource,
      addUserId: this.handleUserId,
      deleteApplication: this.handleAddApplication,
      deleteResource: this.handleDeleteResource,
      getUserApplications: this.getUserApplications,
      getUserResources: this.getUserResources,onLoginSuccess: this.onLoginSuccess,
      updateApplication: this.handleUpdateApplication,
    }
    return (
      <div className='App'>
        <ErrorBoundary>
          <Header/>
        </ErrorBoundary>
        <ApptrackrContext.Provider value={contextValue}>
          <ErrorBoundary>
            <Switch>
              <Route 
                exact
                path={'/'}
                component={LandingPage}
              />
              <Route 
                path={'/login'}
                component={LoginForm}
              />
              <Route
                path={'/signup'}
                component={SignUpForm}
              />
              <Route
                path={'/jobapps'}
                component={MainPage}
              />
              <Route
                path={'/newapp'}
                component={AppForm}
              />
              <Route
                path={'/jobapp/:id'}
                component={AppDetails}
              />
              <Route
                path={'/edit/:id'}
                component={AppForm}
              />
              <Route
                path={'/resources'}
                component={ResourcesList}
              />
              <Route
                path={'/newresource'}
                component={NewResourceForm}
              />
            </Switch>
          </ErrorBoundary>
        </ApptrackrContext.Provider>
        {/* <footer>©2021 by Samantha Sheets</footer> */}
      </div>
    )
  }
}

export default App
