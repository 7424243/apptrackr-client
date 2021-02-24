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
import DATA from './DATA'
import './App.css'

class App extends Component {
  state = {
    apps: []
  }
  componentDidMount() {
    this.setState({apps: DATA.apps})
  }
  render() {
    const contextValue = {
      apps: this.state.apps
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
        <footer>©2021 by Samantha Sheets</footer>
      </div>
    )
  }
}

export default App
