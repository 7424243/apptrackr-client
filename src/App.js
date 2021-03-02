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
    loginStatus: false
  }

  getUserApplications = (applications) => {
    this.setState({applications})
  }

  onLoginSuccess = () => {
    this.setState({onLoginSuccess: true})
  }

  handleAddApplication = (application) => {
    this.setState({
      applications: [...this.state.applications, application]
    })
  }

  render() {
    const contextValue = {
      applications: this.state.applications,
      getUserApplications: this.getUserApplications,
      onLoginSuccess: this.onLoginSuccess,
      addApplication: this.handleAddApplication
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
