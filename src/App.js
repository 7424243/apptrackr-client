import React, {Component} from 'react'
import DATA from './DATA'

class App extends Component {
  state = {
    apps: []
  }
  componentDidMount() {
    this.setState({apps: DATA.apps})
    
  }
  render() {
    return (
      <main className='App'>
      </main>
    )
  }
}

export default App
