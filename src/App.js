import React, {Component} from 'react'
import { Route, Switch } from 'react-router-dom'
import ApptrackrContext from './ApptrackrContext'
import Header from './Components/Header/Header'
import LandingPage from './Components/LandingPage/LandingPage'
import LoginForm from './Components/LoginForm/LoginForm'
import SignUpForm from './Components/SignUpForm/SignUpForm'
import DATA from './DATA'

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
        <Header/>
        <ApptrackrContext.Provider value={contextValue}>
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
          </Switch>
        </ApptrackrContext.Provider>
        <footer>© Samantha Sheets, 2021</footer>
      </div>
    )
  }
}

export default App
