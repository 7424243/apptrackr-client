import React, {Component} from 'react'
import ApptrackrContext from './ApptrackrContext'
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
        <ApptrackrContext.Provider value={contextValue}>
          <p>Hello!</p>
        </ApptrackrContext.Provider>
      </div>
    )
  }
}

export default App
